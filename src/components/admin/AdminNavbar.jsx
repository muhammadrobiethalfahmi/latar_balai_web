import React from "react";
import { useLocation } from "react-router-dom";
import { Menu, Calendar } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import NotificationBell from "./NotificationBell";

export default function AdminNavbar({ setMobileOpen }) {
  const location = useLocation();
  const { userProfile } = useAuth();
    

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin/dashboard':
        return 'Ringkasan Dashboard';
      case '/admin/products':
        return 'Manajemen Produk BUMDes';
      case '/admin/tourism':
        return 'Manajemen Wisata Desa';
      case '/admin/education':
        return 'Manajemen Edukasi Pertanian';
      case '/admin/users':
        return 'Manajemen Akun Pengguna';
      default:
        return 'Panel Admin';
    }
  };

  const getFormattedDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString('id-ID', options);
  };

  
  

  return (
    <header className="h-20 bg-surface border-b border-outline-variant/30 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
      {/* Mobile Drawer Trigger & Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 text-[#00450D] hover:bg-surface-container rounded-full transition-colors cursor-pointer"
          aria-label="Buka Menu"
        >
          <Menu size={24} />
        </button>
        <div>
          <h2 className="font-heading font-bold text-lg md:text-xl text-[#00450D]">
            {getPageTitle()}
          </h2>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-on-surface-variant/80 mt-0.5">
            <Calendar size={13} className="text-[#D4AF37]" />
            <span>{getFormattedDate()}</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Notifications (Mock) */}
        <NotificationBell />

        {/* Profile Card */}
        <div className="flex items-center gap-3 border-l border-outline-variant/40 pl-4">
          <div className="text-right hidden sm:block">
            <span className="block text-body-md font-semibold text-on-surface">
              {userProfile?.name || 'Administrator'}
            </span>
            <span className="block text-[11px] font-medium text-[#D4AF37] uppercase tracking-wider">
              {userProfile?.role || 'Admin'}
            </span>
          </div>
          <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/20 uppercase shadow-sm">
            {userProfile?.name?.charAt(0) || 'A'}
          </div>
        </div>
      </div>
    </header>
  );
}
