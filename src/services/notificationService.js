import { getOrders } from "./orderService";
import { getProducts } from "./productService";

export async function getNotifications() {
  const [orders, products] = await Promise.all([
    getOrders(),
    getProducts(),
  ]);

  // Pesanan baru (status Menunggu)
  const newOrders = orders
  .filter((o) => o.status === "Menunggu")
  .sort((a, b) => {
    const timeA =
      a.updatedAt?.seconds ||
      a.createdAt?.seconds ||
      a.orderedAt?.seconds ||
      0;

    const timeB =
      b.updatedAt?.seconds ||
      b.createdAt?.seconds ||
      b.orderedAt?.seconds ||
      0;

    return timeB - timeA;
  });
  // Produk hampir habis
  const lowStock = products.filter(
    (product) => Number(product.stock) > 0 && Number(product.stock) <= 5
  );

  // Produk habis
  const outStock = products.filter(
    (product) => Number(product.stock) === 0
  );

  return [
    {
        id: "new-orders",
        type: "order",
        icon: "🟢",
        title: "Pesanan Baru",
        count: newOrders.length,
        items: newOrders.slice(0,5)
    },
    {
      id: "low-stock",
      type: "warning",
      title: "Produk Hampir Habis",
      icon: "⚠️",
      count: lowStock.length,
      data: lowStock,
    },
    {
      id: "out-stock",
      type: "danger",
      title: "Produk Habis",
      icon: "🔴",
      count: outStock.length,
      data: outStock,
    },
  ];
}