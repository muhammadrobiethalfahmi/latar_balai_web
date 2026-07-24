import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  ShoppingBag,
  MapPin,
  BookOpen,
  Users,
  ClipboardList,
  Settings,
  LogOut,
  X,
  Shield,
} from 'lucide-react';

export default function AdminSidebar({ mobileOpen, setMobileOpen }) {
  const { logout, userProfile } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Produk BUMDes', path: '/admin/products', icon: ShoppingBag },
    { name: 'Pesanan', path: '/admin/orders', icon: ClipboardList },
    { name: 'Wisata Desa', path: '/admin/tourism', icon: MapPin },
    { name: 'E-Edukasi', path: '/admin/education', icon: BookOpen },
    { name: 'Manajemen User', path: '/admin/users', icon: Users },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Berhasil keluar dari panel admin');
      navigate('/admin/login');
    } catch {
      toast.error('Gagal keluar');
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#00450D] text-white">
      {/* Brand Header */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#00450D] font-bold">
            <Shield size={20} />
          </div>
          <div>
            <h1 className="font-heading font-bold text-sm tracking-tight text-white leading-tight">
              Latar Bale Digital
            </h1>
            <p className="text-[10px] text-[#D4AF37] font-semibold uppercase tracking-wider">
              Panel Administrator
            </p>
          </div>
        </div>
        {/* Mobile close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1.5 rounded-full hover:bg-white/10 text-white transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-lg text-body-md font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-[#D4AF37] text-[#00450D] font-bold shadow-md'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}

        {/* Separator */}
        <div className="border-t border-white/10 my-4" />

        {/* Dummy Settings Link */}
        <button
          onClick={() => {
            toast.success('Fitur Pengaturan sedang dikembangkan');
            setMobileOpen(false);
          }}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-lg text-body-md font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200 text-left cursor-pointer"
        >
          <Settings size={20} />
          <span>Pengaturan</span>
        </button>
      </nav>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-white/10 bg-black/10 flex flex-col gap-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-white/20 border border-white/10 flex items-center justify-center font-bold text-white uppercase shadow-sm">
            {userProfile?.name?.charAt(0) || 'A'}
          </div>
          <div className="overflow-hidden">
            <h4 className="text-body-md font-semibold text-white truncate">
              {userProfile?.name || 'Administrator'}
            </h4>
            <p className="text-[11px] text-white/60 truncate">
              {userProfile?.email || 'admin@mulyoarjo.go.id'}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-error text-white font-semibold text-xs uppercase tracking-wider py-2.5 rounded-lg hover:bg-error-container hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
        >
          <LogOut size={14} />
          <span>Keluar</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside className="hidden md:block w-64 h-screen sticky top-0 flex-shrink-0 z-20 shadow-lg">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer Container */}
      <aside
        className={`md:hidden fixed top-0 bottom-0 left-0 w-64 z-40 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
