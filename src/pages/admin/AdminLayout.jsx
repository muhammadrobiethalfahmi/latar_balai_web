import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F7F2]">
      {/* Sidebar Navigation */}
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <AdminNavbar setMobileOpen={setMobileOpen} />

        {/* Dynamic Nested Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-container-max w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
