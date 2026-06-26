import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';

import Home from './pages/Home';
import Edukasi from './pages/Edukasi';
import Wisata from './pages/Wisata';
import Toko from './pages/Toko';
import Kontak from './pages/Kontak';
import Login from './pages/Login';
import Daftar from './pages/Daftar';
import LupaPassword from './pages/LupaPassword';
import AdminLogin from './pages/AdminLogin';

// Auth pages have their own layouts (no shared Navbar/Footer per Stitch design)
const AUTH_ROUTES = ['/login', '/daftar', '/lupa-password', '/admin/login'];

function AppLayout() {
  const location = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(location.pathname);

  return (
    <>
      {isAuthPage ? (
        /* Auth pages render standalone (transactional layout from Stitch) */
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/daftar" element={<Daftar />} />
          <Route path="/lupa-password" element={<LupaPassword />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>
      ) : (
        /* Main app pages with shared Navbar + Footer */
        <div className="min-h-screen flex flex-col bg-background text-on-surface">
          <Navbar />
          <CartSidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/edukasi" element={<Edukasi />} />
              <Route path="/wisata" element={<Wisata />} />
              <Route path="/toko" element={<Toko />} />
              <Route path="/kontak" element={<Kontak />} />
            </Routes>
          </main>
          <Footer />
        </div>
      )}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1c1c16',
            color: '#f4f0e7',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            borderRadius: '12px',
          },
          success: {
            iconTheme: { primary: '#00450d', secondary: '#ffffff' },
          },
          error: {
            iconTheme: { primary: '#ba1a1a', secondary: '#ffffff' },
          },
        }}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppLayout />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
