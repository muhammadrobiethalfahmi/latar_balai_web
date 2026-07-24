import { getProducts } from "./productService";
import { getOrders } from "./orderService";

export async function getDashboardStats() {
  const products = await getProducts();
  const orders = await getOrders();

  const totalProduk = products.length;

  const totalPesanan = orders.length;

  const totalPendapatan = orders
    .filter((o) => o.status === "Selesai")
    .reduce((sum, o) => sum + Number(o.total || 0), 0);

  const today = new Date().toLocaleDateString("id-ID");

  const pesananHariIni = orders.filter((o) => {
    if (!o.createdAt) return false;

    return (
      o.createdAt.toDate().toLocaleDateString("id-ID") === today
    );
  }).length;

  const produkHampirHabis = products.filter(
    (p) => Number(p.stock) <= 5
  ).length;

  return {
    totalProduk,
    totalPesanan,
    totalPendapatan,
    pesananHariIni,
    produkHampirHabis,
  };
}

export async function getRevenueLast7Days() {
  const orders = await getOrders();

  const result = [];

  // 7 hari terakhir
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const label = date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
    });

    const revenue = orders
      .filter((order) => {
        if (!order.createdAt) return false;

        const orderDate = order.createdAt.toDate();

        return (
          order.status === "Selesai" &&
          orderDate.toDateString() === date.toDateString()
        );
      })
      .reduce((sum, order) => sum + Number(order.total || 0), 0);

    result.push({
      day: label,
      revenue,
    });
  }

  return result;
}