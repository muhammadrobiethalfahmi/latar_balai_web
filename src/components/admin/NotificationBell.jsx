import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { getNotifications } from "../../services/notificationService";
import { subscribeCollection } from "../../firebase/firestore";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
  loadNotifications();

  const unsubscribeOrders = subscribeCollection(
    "orders",
    () => {
      loadNotifications();
    }
  );

  const unsubscribeProducts = subscribeCollection(
    "products",
    () => {
      loadNotifications();
    }
  );

  return () => {
    unsubscribeOrders();
    unsubscribeProducts();
  };
}, []);
  async function loadNotifications() {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error(error);
    }
  }

  const totalNotification = notifications.reduce(
    (sum, item) => sum + item.count,
    0
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition"
      >
        <Bell size={20} />

        {totalNotification > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
            {totalNotification}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border z-50 overflow-hidden">

          <div className="px-4 py-3 border-b">
            <h3 className="font-bold text-[#00450D]">
              Notifikasi
            </h3>
          </div>

          {notifications.length === 0 ? (
            <div className="p-5 text-center text-gray-500">
              Tidak ada notifikasi
            </div>
          ) : (
            notifications.map((item) => (
            <div key={item.id} className="border-b last:border-b-0">

                <div className="flex justify-between items-center px-4 py-3 bg-gray-50">

                <div className="flex items-center gap-2">
                    <span className="text-lg">{item.icon}</span>

                    <span className="font-semibold text-sm">
                    {item.title}
                    </span>
                </div>

                {item.count > 0 && (
                    <span className="bg-red-600 text-white rounded-full px-2 py-1 text-xs font-bold">
                    {item.count}
                    </span>
                )}

                </div>

                {/* PESANAN BARU */}
                {item.type === "order" &&
                item.items?.map((order) => (
                    <div
                    key={order.id}
                    className="px-4 py-3 hover:bg-gray-50 transition border-t"
                    >
                    <div className="font-medium">
                        {order.customerName}
                    </div>

                    <div className="text-sm text-[#00450D] font-semibold">
                        Rp {Number(order.total).toLocaleString("id-ID")}
                    </div>

                    <div className="text-xs text-gray-500">
                        {order.createdAt
                        ? order.createdAt.toDate().toLocaleString("id-ID")
                        : "-"}
                    </div>
                    </div>
                ))}

                {/* STOK HAMPIR HABIS */}
                {item.type === "warning" &&
                item.data?.slice(0, 5).map((product) => (
                    <div
                    key={product.id}
                    className="px-4 py-3 hover:bg-gray-50 transition border-t"
                    >
                    <div className="font-medium">
                        {product.title}
                    </div>

                    <div className="text-xs text-orange-600">
                        Sisa {product.stock} {product.unit}
                    </div>
                    </div>
                ))}

                {/* STOK HABIS */}
                {item.type === "danger" &&
                item.data?.slice(0, 5).map((product) => (
                    <div
                    key={product.id}
                    className="px-4 py-3 hover:bg-gray-50 transition border-t"
                    >
                    <div className="font-medium">
                        {product.title}
                    </div>

                    <div className="text-xs text-red-600">
                        Stok habis
                    </div>
                    </div>
                ))}

            </div>
            ))
          )}

          <div className="p-3 bg-gray-50 text-center">
            <button
              className="text-sm font-semibold text-[#00450D] hover:underline"
            >
              Lihat Semua
            </button>
          </div>

        </div>
      )}
    </div>
  );
}