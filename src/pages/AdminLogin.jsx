import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const { login, user, isAdmin } = useAuth();

  // Redirect if already logged in as admin
  useEffect(() => {
    if (user && isAdmin) navigate('/admin/dashboard', { replace: true });
  }, [user, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      await login(identity, password);

      // Show success state briefly before redirect
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/admin/dashboard', { replace: true });
      }, 800);
    } catch (error) {
      const messages = {
        'auth/invalid-credential': 'Kredensial admin tidak valid.',
        'auth/user-not-found': 'Akun admin tidak ditemukan.',
        'auth/wrong-password': 'Kata sandi salah.',
        'auth/too-many-requests': 'Terlalu banyak percobaan. Coba lagi nanti.',
        'auth/invalid-email': 'Format email tidak valid.',
      };
      toast.error(messages[error.code] || 'Gagal masuk. Periksa kredensial Anda.');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-mesh-gradient min-h-screen flex flex-col relative">
      {/* Header */}
      <header className="w-full fixed top-0 z-50 py-6 px-10 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              landscape
            </span>
          </div>
          <span className="text-primary font-heading font-bold text-lg tracking-tight">
            Latar Balai Mulyoarjo
          </span>
        </div>
        <div className="pointer-events-auto">
          <Link
            to="/"
            className="text-on-surface-variant font-sans text-sm flex items-center gap-2 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali ke Beranda
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 md:px-8 py-20">
        <div className="w-full max-w-md grid gap-8">
          {/* Branding Area */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-container/10 text-primary border border-primary/10">
              <span
                className="material-symbols-outlined text-[14px] mr-2"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
              <span className="text-[11px] font-bold tracking-widest uppercase">Internal Portal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-primary tracking-tight">
              Portal Administrasi Latar Balai
            </h1>
            <p className="text-on-surface-variant text-[0.875rem] max-w-[320px] mx-auto leading-relaxed">
              Akses aman untuk pengelolaan operasional, edukasi, dan pariwisata Desa Mulyoarjo.
            </p>
          </div>

          {/* Login Card */}
          <div className="admin-glass rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-10 relative overflow-hidden">
            {/* Decorative Element */}
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>

            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              {/* Identity Input */}
              <div className="space-y-2">
                <label
                  className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest px-1"
                  htmlFor="admin-identity"
                >
                  Username atau Email
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                    person
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface focus:outline-none input-glow transition-all font-sans text-sm placeholder:text-outline-variant"
                    id="admin-identity"
                    type="text"
                    placeholder="admin_mulyoarjo"
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label
                    className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest"
                    htmlFor="admin-password"
                  >
                    Kata Sandi
                  </label>
                  <Link
                    to="/lupa-password"
                    className="text-[11px] font-bold text-secondary hover:text-primary transition-colors"
                  >
                    Lupa Password?
                  </Link>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                    lock
                  </span>
                  <input
                    className="w-full pl-12 pr-12 py-4 bg-surface-container-lowest border border-outline-variant rounded-lg text-on-surface focus:outline-none input-glow transition-all font-sans text-sm placeholder:text-outline-variant"
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember Device */}
              <div className="flex items-center gap-3 px-1">
                <input
                  className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary transition-all accent-primary"
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label className="text-sm text-on-surface-variant font-sans" htmlFor="remember">
                  Ingat perangkat ini untuk 30 hari
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || isSuccess}
                className={`w-full py-4 rounded-lg font-heading font-bold text-sm tracking-wide transition-all active:scale-[0.98] flex justify-center items-center gap-2 group disabled:cursor-not-allowed ${
                  isSuccess
                    ? 'bg-tertiary-container text-on-tertiary-container'
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
              >
                {isSuccess ? (
                  <>
                    <span className="material-symbols-outlined">check_circle</span>
                    <span>Akses Diterima</span>
                  </>
                ) : isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <>
                    <span>Login Admin</span>
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer Meta */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-outline text-[11px] font-bold tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px]">shield_lock</span>
              Encrypted Session
            </div>
            <div>Latar Balai Admin Portal</div>
          </div>
        </div>
      </main>

      {/* Desktop "ADMIN" watermark */}
      <div className="hidden lg:block fixed left-10 bottom-10 w-64 opacity-20 pointer-events-none">
        <div className="font-heading font-extrabold text-[120px] leading-none text-primary/10 select-none">
          ADMIN
        </div>
      </div>

      {/* Background Security Backdrop */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-surface">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#acf4a410,transparent)]"></div>
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage: 'radial-gradient(#717a6d20 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>

      {/* Background Animation Blobs */}
      <div className="fixed inset-0 pointer-events-none -z-20">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-secondary-container/10 rounded-full blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary-container/10 rounded-full blur-[100px] animate-pulse"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>
    </div>
  );
}
