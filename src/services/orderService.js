import {
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument,
  serverTimestamp,
} from "../firebase/firestore";

import { decreaseProductStock } from "./productService";

const COLLECTION_NAME = "orders";

export async function getOrders() {
  return await getDocuments(COLLECTION_NAME);
}

export async function addOrder(data) {
  return await addDocument(COLLECTION_NAME, data);
}

export async function updateOrder(id, data) {
  return await updateDocument(COLLECTION_NAME, id, data);
}

export async function deleteOrder(id) {
  return await deleteDocument(COLLECTION_NAME, id);
}

export async function updateOrderStatus(id, status) {
  return await updateOrder(id, {
    status,
  });
}
// ===============================
// CREATE ORDER
// ===============================

export async function createOrder(orderData) {
  // Simpan order
  const orderId = await addOrder({
    customerName: orderData.customerName,
    customerAddress: orderData.customerAddress,
    customerPhone: orderData.customerPhone,
    orderType: orderData.orderType,
    items: orderData.items,
    total: orderData.total,
    status: "Menunggu",

    
  });

  // Kurangi stok setiap produk
  for (const item of orderData.items) {
    await decreaseProductStock(item.id, item.quantity);
  }

  return orderId;
}

// ========================================
// Pendapatan 7 Hari Terakhir
// ========================================

export async function getRevenueLast7Days() {
  const orders = await getOrders();
  console.log("SEMUA ORDERS:", orders); // Tambahkan ini
    console.log("ALL ORDERS", orders);
  const result = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    const key = date.toLocaleDateString("id-ID");

    const total = orders
      .filter((order) => {
          console.log(order);
        if (!order.orderedAt) return false;

        const orderDate = order.orderedAt.toDate();

        return (
          order.status === "Selesai" &&
          orderDate.toLocaleDateString("id-ID") === key
        );
         console.log({
    status: order.status,
    firestore: orderDate.toLocaleDateString("id-ID"),
    today: key,
    total: order.total,
  });
      })
      .reduce((sum, order) => sum + Number(order.total || 0), 0);

    result.push({
      day: key,
      revenue: total,
    });
  }

  return result;
}