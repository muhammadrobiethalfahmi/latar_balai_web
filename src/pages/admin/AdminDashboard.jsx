import React, { useState, useEffect } from 'react';
import { ShoppingBag, MapPin, BookOpen, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/admin/StatCard';
import { getDashboardStats,getRevenueLast7Days, } from "../../services/dashboardService";
import { getTourismPlaces } from '../../services/tourismService';
import { getArticles } from '../../services/educationService';
import { getUsers } from '../../services/userService';
import { getProducts } from "../../services/productService";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
  totalProduk: 0,
  totalPesanan: 0,
  totalPendapatan: 0,
  pesananHariIni: 0,
  produkHampirHabis: 0,
});
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [revenueChart, setRevenueChart] = useState([]);

  useEffect(() => {
  async function fetchDashboardData() {
    try {
      const [
        dashboard,
        productsData,
        usersData,
        revenueData,
      ] = await Promise.all([
        getDashboardStats(),
        getProducts(),
        getUsers(),
        getRevenueLast7Days(),
      ]);

      console.log("Revenue Data :", revenueData);
      setStats(dashboard);
      setRevenueChart(revenueData);

      const sortedProducts = [...productsData]
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
        .slice(0, 5);

      setRecentProducts(sortedProducts);

      const sortedUsers = [...usersData]
        .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
        .slice(0, 5);

      setRecentUsers(sortedUsers);

    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-on-surface-variant font-medium text-sm">Memuat data dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#00450D] text-white p-6 rounded-lg shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Background Accent Graphics */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
        <div className="relative z-10">
          <h3 className="text-xl md:text-2xl font-bold font-heading mb-1.5">
            Selamat Datang di Panel Kontrol Mulyoarjo
          </h3>
          <p className="text-white/80 text-sm max-w-2xl">
            Kelola data produk BUMDes, destinasi wisata, materi edukasi pertanian, dan verifikasi akun warga secara real-time.
          </p>
        </div>
        <div className="flex-shrink-0 z-10">
          <span className="bg-[#D4AF37] text-[#00450D] font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
            Sistem Aktif
          </span>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

        <StatCard
        title="Total Produk"
        value={stats.totalProduk}
        icon={ShoppingBag}
        color="primary"
        />

        <StatCard
        title="Total Pesanan"
        value={stats.totalPesanan}
        icon={ShoppingBag}
        color="secondary"
        />

        <StatCard
        title="Total Pendapatan"
        value={`Rp ${stats.totalPendapatan.toLocaleString("id-ID")}`}
        icon={Users}
        color="gold"
        />

        <StatCard
        title="Pesanan Hari Ini"
        value={stats.pesananHariIni}
        icon={BookOpen}
        color="primary"
        />

        <StatCard
        title="Produk Hampir Habis"
        value={stats.produkHampirHabis}
        icon={MapPin}
        color="secondary"
        />

        </div>

      <div className="bg-white rounded-xl shadow p-6 h-[350px]">
  <h3 className="text-lg font-bold mb-4">
    Pendapatan 7 Hari Terakhir
  </h3>

  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={revenueChart}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#00450D"
        strokeWidth={3}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
      {/* Detailed Sections Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Products */}
        <div className="bg-surface border border-outline-variant/30 rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30 mb-4">
            <h4 className="font-heading font-bold text-base text-[#00450D]">
              Produk Terbaru
            </h4>
            <Link
              to="/admin/products"
              className="text-[#D4AF37] hover:text-[#00450D] text-xs font-bold flex items-center gap-1 transition-colors uppercase tracking-wider"
            >
              <span>Semua Produk</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex-1 divide-y divide-outline-variant/10">
            {recentProducts.length > 0 ? (
              recentProducts.map((product) => (
                <div key={product.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imageUrl || 'https://via.placeholder.com/80?text=Produk'}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md border border-outline-variant/20 bg-surface-container"
                    />
                    <div>
                      <h5 className="text-body-md font-semibold text-on-surface truncate max-w-[200px]">
                        {product.name}
                      </h5>
                      <span className="text-xs text-on-surface-variant/80 uppercase font-medium bg-surface-container-low px-2 py-0.5 rounded border border-outline-variant/15">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-body-md font-bold text-[#00450D]">
                      Rp {Number(product.price).toLocaleString('id-ID')}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Stok: <span className="font-semibold">{product.stock}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-on-surface-variant/60 text-sm">
                Belum ada produk yang didaftarkan.
              </div>
            )}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-surface border border-outline-variant/30 rounded-lg p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30 mb-4">
            <h4 className="font-heading font-bold text-base text-[#00450D]">
              Pengguna Terdaftar Baru
            </h4>
            <Link
              to="/admin/users"
              className="text-[#D4AF37] hover:text-[#00450D] text-xs font-bold flex items-center gap-1 transition-colors uppercase tracking-wider"
            >
              <span>Semua Pengguna</span>
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex-1 divide-y divide-outline-variant/10">
            {recentUsers.length > 0 ? (
              recentUsers.map((u) => (
                <div key={u.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold uppercase shadow-sm">
                      {u.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <h5 className="text-body-md font-semibold text-on-surface truncate max-w-[200px]">
                        {u.name}
                      </h5>
                      <p className="text-xs text-on-surface-variant truncate max-w-[200px]">
                        {u.email}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                        u.role === 'admin'
                          ? 'bg-[#D4AF37]/15 text-[#8a7224] border border-[#D4AF37]/20'
                          : 'bg-primary/15 text-primary border border-primary/20'
                      }`}
                    >
                      {u.role || 'user'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-on-surface-variant/60 text-sm">
                Belum ada pengguna terdaftar.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
