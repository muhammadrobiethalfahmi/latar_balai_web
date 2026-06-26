import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { setCartOpen, getCartCount } = useCart();
  const { user, logout, userProfile } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Budidaya', path: '/edukasi' },
    { name: 'Wisata Desa', path: '/wisata' },
    { name: 'Toko', path: '/toko' },
    { name: 'Hubungi Kami', path: '/kontak' },
  ];

  const cartCount = getCartCount();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-surface/70 backdrop-blur-md border-b border-outline-variant/30 transition-all duration-300">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary font-heading font-bold text-base transition-transform group-hover:scale-105">
            M
          </span>
          <span className="font-heading font-bold text-headline-md tracking-tight text-primary">
            Latar Balai Mulyoarjo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-label-md text-label-md uppercase tracking-wider transition-colors duration-300 py-2 border-b-2 ${
                isActive(link.path)
                  ? 'text-primary border-primary font-bold'
                  : 'text-on-surface-variant/80 border-transparent hover:text-primary hover:border-primary/40'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          {/* Cart Trigger */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative p-2.5 rounded-full hover:bg-surface-container transition-colors text-primary"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-tertiary text-on-tertiary font-sans font-bold text-[10px] rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Auth Button Desktop */}
          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <span className="text-body-md font-medium text-on-surface-variant">
                Halo, {userProfile?.name || user.displayName || 'Pengguna'}
              </span>
              <button
                onClick={logout}
                className="bg-surface-container-high border border-outline/30 text-on-surface font-label-md text-label-md uppercase tracking-wider px-6 py-3 rounded-default shadow-sm hover:bg-surface-container-highest hover:brightness-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                Keluar
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:inline-flex bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider px-6 py-3 rounded-default shadow-sm hover:bg-primary-container hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              Masuk
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-primary rounded-full hover:bg-surface-container transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-surface border-b border-outline-variant/30 py-6 px-margin-mobile flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200 z-50">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-label-md text-label-md uppercase tracking-wider py-2.5 px-4 rounded-default transition-all ${
                isActive(link.path)
                  ? 'bg-primary/10 text-primary font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <div className="mt-2 flex flex-col gap-2 border-t border-outline-variant/30 pt-4">
              <div className="text-center text-body-md font-medium text-on-surface-variant mb-1">
                Halo, {userProfile?.name || user.displayName || 'Pengguna'}
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="bg-surface-container-high border border-outline/30 text-on-surface text-center font-label-md text-label-md uppercase tracking-wider py-3.5 rounded-default shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                Keluar
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 bg-primary text-on-primary text-center font-label-md text-label-md uppercase tracking-wider py-3.5 rounded-default shadow-sm active:scale-95 transition-all"
            >
              Masuk
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
