import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const { login, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      await login(email, password);
      toast.success('Berhasil masuk!');
      navigate('/');
    } catch (error) {
      const messages = {
        'auth/invalid-credential': 'Email atau kata sandi salah.',
        'auth/user-not-found': 'Akun tidak ditemukan.',
        'auth/wrong-password': 'Kata sandi salah.',
        'auth/too-many-requests': 'Terlalu banyak percobaan. Coba lagi nanti.',
        'auth/invalid-email': 'Format email tidak valid.',
      };
      toast.error(messages[error.code] || 'Gagal masuk. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  // Subtle card tilt effect (desktop only, from Stitch design)
  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth <= 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 50;
    const rotateY = (centerX - x) / 50;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Back Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center max-w-[1280px] mx-auto w-full">
        <Link
          to="/"
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors duration-300"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          <span className="font-sans text-[14px] font-semibold tracking-wider uppercase">Kembali</span>
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-12">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full max-w-[1000px] bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col md:flex-row soft-shadow min-h-[600px] transition-transform duration-200"
        >
          {/* Left Side: Atmospheric Photograph */}
          <div className="hidden md:block md:w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent z-10"></div>
            <img
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] hover:scale-110 ease-linear"
              alt="Pemandangan desa Mulyoarjo yang asri dengan arsitektur tradisional Jawa"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFhV-la10S_PO6flCutK7-LHUPK8PK_KSgu21z7gqz9mHXCryHf0LLQWRq7STKbDaQAZkCw94KYVVn15B3NTGdc-zMbgJ4TEKnA6IQpjedp3p9mFrKMKYX59Tpf5EBIGwS-MN6Kx5qF5R2ozHZEoh-ygX79qedwP9abvXlsLCt83wG8uwPrIS4-JrWDW6UrTJYy0vhzht7n_duBLXjkExJQKJdaru7hvGWODXDV9vBBWhSa4OYXDmDRh5IcuGeBFEKGf3Xm7cArQLU"
            />
            <div className="absolute bottom-12 left-12 right-12 z-20 text-white">
              <span className="inline-block px-3 py-1 bg-tertiary-container/90 text-on-tertiary-container rounded-full text-[12px] font-bold tracking-widest uppercase mb-4">
                Destinasi Budaya
              </span>
              <h2 className="text-3xl font-bold font-heading leading-tight mb-2">Harmoni Alam & Tradisi</h2>
              <p className="text-white/80 text-sm leading-relaxed max-w-xs font-sans">
                Temukan kedamaian dan kearifan lokal di jantung Desa Mulyoarjo.
              </p>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            {/* Brand Identity */}
            <div className="mb-10 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    landscape
                  </span>
                </div>
                <span className="font-heading text-2xl font-extrabold tracking-tight text-primary">Latar Bale</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold font-heading text-on-surface mb-2">Selamat Datang Kembali</h1>
              <p className="text-on-surface-variant text-[0.875rem]">
                Silakan masuk ke akun Anda untuk melanjutkan penjelajahan.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface-variant" htmlFor="login-email">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">
                    mail
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-on-surface"
                    id="login-email"
                    type="email"
                    placeholder="nama@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-sm font-semibold text-on-surface-variant" htmlFor="login-password">
                    Kata Sandi
                  </label>
                  <Link
                    to="/lupa-password"
                    className="text-sm font-semibold text-tertiary hover:underline transition-all"
                  >
                    Lupa Password?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">
                    lock
                  </span>
                  <input
                    className="w-full pl-12 pr-12 py-3.5 bg-surface-container-low border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none text-on-surface"
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold text-lg hover:bg-primary-container transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer CTA */}
            <div className="mt-12 text-center">
              <p className="text-on-surface-variant">
                Belum memiliki akun?{' '}
                <Link
                  to="/daftar"
                  className="text-primary font-bold hover:text-primary-container transition-colors ml-1"
                >
                  Daftar Sekarang
                </Link>
              </p>
            </div>

            {/* Decorative Divider */}
            <div className="relative flex items-center py-8">
              <div className="flex-grow border-t border-outline-variant/20"></div>
              <span className="flex-shrink mx-4 text-outline-variant text-[10px] uppercase tracking-[0.2em] font-bold">
                Latar Bale Mulyoarjo
              </span>
              <div className="flex-grow border-t border-outline-variant/20"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-on-surface-variant/60 text-xs">
        <p>© 2024 Latar Bale Mulyoarjo. Premium Village Platform.</p>
      </footer>
    </div>
  );
}
