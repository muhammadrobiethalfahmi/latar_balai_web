import React, { useEffect, useState } from "react";
import DataTable from "../../components/admin/DataTable";
import { getOrders, updateOrderStatus, } from "../../services/orderService";
import toast from "react-hot-toast";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Semua");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);

    try {
    const data = await getOrders();

        const sortedOrders = data.sort((a, b) => {
        const timeA = a.createdAt?.seconds || 0;
        const timeB = b.createdAt?.seconds || 0;

        return timeB - timeA;
        });

        setOrders(sortedOrders);
            } catch (err) {
            console.error(err);
            toast.error("Gagal mengambil data pesanan");
            } finally {
            setLoading(false);
            }
        }

    
  function openDetail(order) {
    setSelectedOrder(order);
    setDetailOpen(true);
  }

  async function changeStatus(status) {
  try {
    await updateOrderStatus(selectedOrder.id, status);

    toast.success("Status berhasil diperbarui");

    setDetailOpen(false);

    fetchOrders();
  } catch (err) {
    console.error(err);
    toast.error("Gagal memperbarui status");
  }
}
  const columns = [
    {
      header: "Nama",
      key: "customerName",
    },
    {
      header: "Alamat",
      key: "customerAddress",
    },
    {
      header: "Jenis",
      key: "orderType",
    },

    {
  header: "Tanggal",
  key: "createdAt",
  render: (row) => {
    if (!row.createdAt) return "-";

    const date = row.createdAt?.toDate();

    return (
      <div>
        <div className="font-medium">
          {date.toLocaleDateString("id-ID")}
        </div>

        <div className="text-xs text-gray-500">
          {date.toLocaleTimeString("id-ID")}
        </div>
      </div>
    );
  },
},
    {
      header: "Total",
      key: "total",
      render: (row) => (
        <span className="font-bold">
          Rp {Number(row.total).toLocaleString("id-ID")}
        </span>
      ),
    },
    {
      header: "Status",
      key: "status",
      render: (row) => {
        let color = "bg-yellow-100 text-yellow-700";

        if (row.status === "Diproses")
          color = "bg-blue-100 text-blue-700";

        if (row.status === "Selesai")
          color = "bg-green-100 text-green-700";

        if (row.status === "Dibatalkan")
          color = "bg-red-100 text-red-700";

        return (
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
            {row.status}
          </span>
        );
      },
    },
    {
        header: "Aksi",
        render: (row) => (
            <button
            onClick={() => openDetail(row)}
            className="bg-[#00450D] text-white px-3 py-1 rounded-lg text-sm"
            >
            Detail
            </button>
    ),
    },
  ];
        const statusList = [
        "Semua",
        "Menunggu",
        "Diproses",
        "Siap Diambil",
        "Dikirim",
        "Selesai",
        "Dibatalkan",
        ];

        const filteredOrders =
        statusFilter === "Semua"
            ? orders
            : orders.filter((order) => order.status === statusFilter);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold text-[#D4AF37] uppercase">
          Manajemen Transaksi
        </p>

        <h2 className="text-2xl font-bold text-[#00450D]">
          Daftar Pesanan
        </h2>
    <div className="flex flex-wrap gap-2 mt-5">
  {statusList.map((status) => (
    <button
      key={status}
      onClick={() => setStatusFilter(status)}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
        statusFilter === status
          ? "bg-[#00450D] text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
    >
      {status}
    </button>
  ))}
</div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          Loading...
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={filteredOrders}
          searchPlaceholder="Cari nama pelanggan..."
          searchKey="customerName"
        />
      )}

    {detailOpen && selectedOrder && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-[600px] p-6">

      <h2 className="text-2xl font-bold mb-5">
        Detail Pesanan
      </h2>

      <div className="space-y-2">
        <p><b>Nama:</b> {selectedOrder.customerName}</p>
        <p><b>Alamat:</b> {selectedOrder.customerAddress}</p>
        <p><b>Jenis:</b> {selectedOrder.orderType}</p>
        <p>
            <b>Waktu Pesan:</b>{" "}
            {selectedOrder.createdAt
                ? selectedOrder.createdAt.toDate().toLocaleString("id-ID")
                : "-"}
        </p>
        <p><b>Total:</b> Rp {Number(selectedOrder.total).toLocaleString("id-ID")}</p>
      </div>

      <hr className="my-5" />

      <h3 className="font-bold mb-2">Produk</h3>

      <div className="space-y-2">
        {selectedOrder.items?.map((item) => (
          <div
  key={item.id}
  className="flex justify-between border rounded-lg p-2"
>
  <span className="font-medium">
    {item.title || item.name}
  </span>

  <span>
    {item.quantity} × Rp{" "}
    {Number(item.price).toLocaleString("id-ID")}
  </span>
</div>
        ))}
      </div>

    <div className="mt-8 flex items-center justify-between border-t pt-5">

<div className="flex flex-wrap gap-3">

  <button
    onClick={() => changeStatus("Diproses")}
    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
  >
    Diproses
  </button>

  <button
    onClick={() => changeStatus("Siap Diambil")}
    className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition"
  >
    Siap Diambil
  </button>

  <button
    onClick={() => changeStatus("Dikirim")}
    className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition"
  >
    Dikirim
  </button>

  <button
    onClick={() => changeStatus("Selesai")}
    className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
  >
    Selesai
  </button>

  <button
    onClick={() => changeStatus("Dibatalkan")}
    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
  >
    Batalkan
  </button>

</div>

  <button
    onClick={() => setDetailOpen(false)}
    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
  >
    Tutup
  </button>

</div>

    </div>
  </div>
)}
    </div>
  );
}