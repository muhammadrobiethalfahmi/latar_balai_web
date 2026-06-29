import React, { useState, useEffect } from 'react';
import { ShoppingBag, MapPin, BookOpen, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../../components/admin/StatCard';
import { getProducts } from '../../services/productService';
import { getTourismPlaces } from '../../services/tourismService';
import { getArticles } from '../../services/educationService';
import { getUsers } from '../../services/userService';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    tourism: 0,
    education: 0,
    users: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [productsData, tourismData, educationData, usersData] = await Promise.all([
          getProducts(),
          getTourismPlaces(),
          getArticles(),
          getUsers(),
        ]);

        setStats({
          products: productsData.length,
          tourism: tourismData.length,
          education: educationData.length,
          users: usersData.length,
        });

        // Get 5 most recent products (sorted by createdAt if exists, otherwise slice)
        const sortedProducts = [...productsData]
          .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
          .slice(0, 5);
        setRecentProducts(sortedProducts);

        // Get 5 most recent users
        const sortedUsers = [...usersData]
          .sort((a, b) => {
            // Sort by createdAt or updatedAt or any fallback
            const dateA = a.createdAt?.seconds || 0;
            const dateB = b.createdAt?.seconds || 0;
            return dateB - dateA;
          })
          .slice(0, 5);
        setRecentUsers(sortedUsers);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Produk BUMDes"
          value={stats.products}
          icon={ShoppingBag}
          color="primary"
        />
        <StatCard
          title="Destinasi Wisata"
          value={stats.tourism}
          icon={MapPin}
          color="secondary"
        />
        <StatCard
          title="Artikel Edukasi"
          value={stats.education}
          icon={BookOpen}
          color="gold"
        />
        <StatCard
          title="Total Pengguna"
          value={stats.users}
          icon={Users}
          color="primary"
        />
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
                      src={product.image || 'https://via.placeholder.com/80?text=Produk'}
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
