import {
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  serverTimestamp,
} from "../firebase/firestore";

import {
  doc,
  runTransaction,
} from "firebase/firestore";

import { db } from "../firebase/config";

const COLLECTION_NAME = "orders";

// ========================================
// GET SEMUA ORDER
// ========================================

export async function getOrders() {
  return await getDocuments(COLLECTION_NAME);
}

// ========================================
// TAMBAH ORDER
// ========================================

export async function addOrder(data) {
  return await addDocument(
    COLLECTION_NAME,
    data
  );
}

// ========================================
// UPDATE ORDER
// ========================================

export async function updateOrder(id, data) {
  return await updateDocument(
    COLLECTION_NAME,
    id,
    data
  );
}

// ========================================
// DELETE ORDER
// ========================================

export async function deleteOrder(id) {
  return await deleteDocument(
    COLLECTION_NAME,
    id
  );
}

// ========================================
// UPDATE STATUS ORDER
// ========================================
//
// Jika status menjadi "Selesai",
// stok produk akan dikurangi.
//
// Pengurangan stok dilakukan menggunakan
// Firestore Transaction agar aman dari:
// - double click
// - request ganda
// - dua proses bersamaan
//
// ========================================

export async function updateOrderStatus(
  orderId,
  newStatus
) {
  // ======================================
  // STATUS BIASA
  // ======================================

  if (newStatus !== "Selesai") {
    await updateOrder(orderId, {
      status: newStatus,
    });

    return;
  }

  // ======================================
  // STATUS SELESAI
  // ======================================
  //
  // Order + stok diproses dalam satu
  // Firestore Transaction.
  //
  // ======================================

  await runTransaction(db, async (transaction) => {
    // ------------------------------------
    // 1. Ambil data order
    // ------------------------------------

    const orderRef = doc(
      db,
      COLLECTION_NAME,
      orderId
    );

    const orderSnapshot =
      await transaction.get(orderRef);

    if (!orderSnapshot.exists()) {
      throw new Error(
        "Pesanan tidak ditemukan."
      );
    }

    const orderData =
      orderSnapshot.data();

    // ------------------------------------
    // 2. CEGAH STOK BERKURANG 2X
    // ------------------------------------
    //
    // Jika sudah Selesai, jangan lakukan
    // pengurangan stok lagi.
    //

    if (orderData.status === "Selesai") {
      throw new Error(
        "Pesanan ini sudah selesai dan stok sudah dikurangi."
      );
    }

    // ------------------------------------
    // 3. Pastikan ada item
    // ------------------------------------

    if (
      !Array.isArray(orderData.items) ||
      orderData.items.length === 0
    ) {
      throw new Error(
        "Pesanan tidak memiliki produk."
      );
    }

    // ====================================
    // 4. AMBIL SEMUA PRODUK TERLEBIH DAHULU
    // ====================================
    //
    // Penting:
    // Firestore Transaction harus melakukan
    // semua READ terlebih dahulu sebelum WRITE.
    //
    // ====================================

    const productSnapshots = [];

    for (const item of orderData.items) {
      if (!item.id) {
        throw new Error(
          "ID produk dalam pesanan tidak valid."
        );
      }

      const productRef = doc(
        db,
        "products",
        item.id
      );

      const productSnapshot =
        await transaction.get(productRef);

      if (!productSnapshot.exists()) {
        throw new Error(
          `Produk "${item.title || item.name || item.id}" tidak ditemukan.`
        );
      }

      productSnapshots.push({
        item,
        ref: productRef,
        snapshot: productSnapshot,
      });
    }

    // ====================================
    // 5. CEK SEMUA STOK
    // ====================================

    for (const {
      item,
      snapshot,
    } of productSnapshots) {
      const product =
        snapshot.data();

      const currentStock =
        Number(product.stock || 0);

      const quantity =
        Number(item.quantity || 0);

      if (quantity <= 0) {
        throw new Error(
          `Jumlah produk "${item.title || item.name}" tidak valid.`
        );
      }

      if (currentStock < quantity) {
        throw new Error(
          `Stok "${item.title || item.name}" tidak mencukupi. Stok tersedia: ${currentStock}, dibutuhkan: ${quantity}.`
        );
      }
    }

    // ====================================
    // 6. KURANGI STOK
    // ====================================

    for (const {
      item,
      ref,
      snapshot,
    } of productSnapshots) {
      const product =
        snapshot.data();

      const currentStock =
        Number(product.stock || 0);

      const quantity =
        Number(item.quantity || 0);

      const newStock =
        currentStock - quantity;

      transaction.update(ref, {
        stock: newStock,
      });
    }

    // ====================================
    // 7. UPDATE ORDER MENJADI SELESAI
    // ====================================

    transaction.update(orderRef, {
      status: "Selesai",
      completedAt: serverTimestamp(),
    });
  });
}

// ========================================
// CREATE ORDER
// ========================================
//
// PENTING:
// Saat user checkout:
// - Order dibuat
// - Status Menunggu
// - STOK TIDAK BERUBAH
//
// ========================================

export async function createOrder(
  orderData
) {
  const orderId = await addOrder({
    userId: orderData.userId,

    customerName:
      orderData.customerName,

    customerAddress:
      orderData.customerAddress,

    customerPhone:
      orderData.customerPhone,

    orderType:
      orderData.orderType,

    items:
      orderData.items,

    total:
      orderData.total,

    status: "Menunggu",

    createdAt: serverTimestamp(),
  });

  return orderId;
}

// ========================================
// PENDAPATAN 7 HARI TERAKHIR
// ========================================

export async function getRevenueLast7Days() {
  const orders = await getOrders();

  const result = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();

    date.setHours(0, 0, 0, 0);

    date.setDate(
      date.getDate() - i
    );

    const key =
      date.toLocaleDateString(
        "id-ID"
      );

    const total = orders
      .filter((order) => {
        if (
          order.status !== "Selesai"
        ) {
          return false;
        }

        if (!order.createdAt) {
          return false;
        }

        const orderDate =
          order.createdAt.toDate();

        return (
          orderDate.toLocaleDateString(
            "id-ID"
          ) === key
        );
      })
      .reduce(
        (sum, order) =>
          sum +
          Number(order.total || 0),
        0
      );

    result.push({
      day: key,
      revenue: total,
    });
  }

  return result;
}