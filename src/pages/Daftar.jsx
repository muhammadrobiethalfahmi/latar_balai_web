import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Daftar() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    // Validate password match
    if (password !== confirmPassword) {
      toast.error('Password dan Konfirmasi Password tidak cocok.');
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      toast.error('Password minimal 6 karakter.');
      return;
    }

    // Validate terms acceptance
    if (!termsAccepted) {
      toast.error('Anda harus menyetujui Syarat & Ketentuan.');
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password, fullName, phone);
      toast.success('Akun berhasil dibuat! Selamat datang.');
      navigate('/');
    } catch (error) {
      const messages = {
        'auth/email-already-in-use': 'Email ini sudah terdaftar. Silakan masuk.',
        'auth/invalid-email': 'Format email tidak valid.',
        'auth/weak-password': 'Password terlalu lemah. Minimal 6 karakter.',
        'auth/operation-not-allowed': 'Pendaftaran sementara tidak tersedia.',
      };
      toast.error(messages[error.code] || 'Gagal mendaftar. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface/70 backdrop-blur-md border-b border-outline-variant/30 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 py-4 flex justify-between items-center w-full">
          <Link to="/" className="font-heading text-2xl font-bold text-primary tracking-tight">
            Latar Balai Mulyoarjo
          </Link>
          <Link
            to="/login"
            className="text-on-surface-variant hover:text-primary font-semibold text-sm transition-colors"
          >
            Masuk
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-5 md:px-0">
        {/* Registration Card */}
        <div className="w-full max-w-4xl grid md:grid-cols-5 bg-surface-container-lowest rounded-xl shadow-lg overflow-hidden border border-outline-variant/20">
          {/* Left Side: Visual Narrative (2/5 columns) */}
          <div className="hidden md:flex md:col-span-2 relative flex-col justify-end p-10 text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover brightness-75"
                alt="Pemandangan aerial desa Mulyoarjo dengan sawah terasering hijau di pagi hari"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEC-24TR3bNXt-ES7aNPSMhIg-cygXwNR6pt-ub0o7iVtApBXB9fdvMHMrEf2kZLP7IrAU4_AMOpRDxxkPPMgniZXYWP2dGO-mG1rV51zTU_5E2zBACODmuKIaZvJLNjZJTo_pDjy9oUK0FOYk_Yb5G2joVFr-yXkkL3I4-gpd4jXzJHrmyLZlB3J2TKTG4My8G_DynsEMJ3lpyJTyxqzBw-1j1ZRjGemqu3tq7lp-Bd0dGMKRKmiWmG_2RU47szaM_MdzTSDGyUA0"
              />
            </div>
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-tertiary-container/90 text-on-tertiary-container rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                Mulyoarjo
              </span>
              <h2 className="text-3xl font-bold font-heading leading-tight mb-2">Mari Tumbuh Bersama Kami</h2>
              <p className="text-sm opacity-90 leading-relaxed font-sans">
                Bergabunglah dalam ekosistem digital desa yang modern, berkelanjutan, dan mengedepankan kearifan lokal.
              </p>
            </div>
            {/* Atmospheric Overlay */}
            <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"></div>
          </div>

          {/* Right Side: Registration Form (3/5 columns) */}
          <div className="col-span-5 md:col-span-3 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-surface-container-lowest">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold font-heading text-primary mb-2">Buat Akun Baru</h1>
              <p className="text-on-surface-variant text-sm md:text-base">
                Lengkapi data diri Anda untuk memulai perjalanan digital di Mulyoarjo.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="group">
                <label
                  className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5 ml-1"
                  htmlFor="full_name"
                >
                  Nama Lengkap
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">
                    person
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-on-surface text-sm transition-all form-input-focus placeholder:text-outline/50"
                    id="full_name"
                    type="text"
                    placeholder="Masukkan nama lengkap Anda"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="group">
                <label
                  className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5 ml-1"
                  htmlFor="register-email"
                >
                  Email
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">
                    mail
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-on-surface text-sm transition-all form-input-focus placeholder:text-outline/50"
                    id="register-email"
                    type="email"
                    placeholder="alamat@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="group">
                <label
                  className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5 ml-1"
                  htmlFor="phone"
                >
                  Nomor Telepon (WA)
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">
                    call
                  </span>
                  <input
                    className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-on-surface text-sm transition-all form-input-focus placeholder:text-outline/50"
                    id="phone"
                    type="tel"
                    placeholder="08xx xxxx xxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group">
                  <label
                    className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5 ml-1"
                    htmlFor="register-password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">
                      lock
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-on-surface text-sm transition-all form-input-focus placeholder:text-outline/50"
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="group">
                  <label
                    className="block text-xs font-bold uppercase tracking-wider text-outline mb-1.5 ml-1"
                    htmlFor="confirm_password"
                  >
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-lg">
                      lock_clock
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant/50 rounded-lg text-on-surface text-sm transition-all form-input-focus placeholder:text-outline/50"
                      id="confirm_password"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-start gap-3 mt-2">
                <div className="flex items-center h-5">
                  <input
                    className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary transition-all accent-primary"
                    id="terms"
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    required
                  />
                </div>
                <label className="text-xs text-on-surface-variant leading-tight" htmlFor="terms">
                  Saya menyetujui{' '}
                  <a href="#" className="text-secondary font-semibold hover:underline">
                    Syarat & Ketentuan
                  </a>{' '}
                  serta{' '}
                  <a href="#" className="text-secondary font-semibold hover:underline">
                    Kebijakan Privasi
                  </a>{' '}
                  yang berlaku.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-primary text-on-primary rounded-lg font-bold text-sm tracking-wide shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex justify-center items-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-base">sync</span>
                    Mendaftarkan...
                  </>
                ) : (
                  <>
                    Daftar
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </>
                )}
              </button>
            </form>

            {/* Footer Link */}
            <div className="mt-8 text-center">
              <p className="text-sm text-on-surface-variant">
                Sudah punya akun?{' '}
                <Link to="/login" className="text-primary font-bold hover:underline transition-all ml-1">
                  Masuk
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto border-t border-outline-variant/20 bg-surface-container-high/30">
        <div className="max-w-[1280px] mx-auto px-5 text-center">
          <p className="text-xs text-outline font-medium tracking-wide">
            © 2024 Latar Balai Mulyoarjo. Premium Village Platform.
          </p>
        </div>
      </footer>
    </div>
  );
}
