import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function LupaPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { sendResetEmail } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      await sendResetEmail(email);
      setIsSuccess(true);
    } catch (error) {
      const messages = {
        'auth/user-not-found': 'Email tidak terdaftar.',
        'auth/invalid-email': 'Format email tidak valid.',
        'auth/too-many-requests': 'Terlalu banyak percobaan. Coba lagi nanti.',
      };
      toast.error(messages[error.code] || 'Gagal mengirim email. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 relative">
      <main className="w-full max-w-md flex flex-col gap-10">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="w-16 h-16 bg-primary-container rounded-xl flex items-center justify-center shadow-lg">
            <span
              className="material-symbols-outlined text-on-primary-container text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              landscape
            </span>
          </div>
          <div>
            <h2 className="text-primary font-bold tracking-tight text-xl font-heading">
              Latar Balai Mulyoarjo
            </h2>
            <p className="text-secondary font-medium text-sm tracking-widest uppercase">
              Premium Village Platform
            </p>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-surface-container-lowest p-8 md:p-10 rounded-xl soft-shadow border border-outline-variant/30 relative overflow-hidden">
          {/* Decorative Organic Shape */}
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <header className="mb-8">
              <h1 className="text-on-surface font-bold text-3xl font-heading leading-tight mb-3">
                Atur Ulang Kata Sandi
              </h1>
              <p className="text-on-surface-variant text-[0.875rem] leading-relaxed">
                Masukkan alamat email Anda yang terdaftar. Kami akan mengirimkan tautan aman untuk memulihkan akses akun
                Anda.
              </p>
            </header>

            {/* Form */}
            {!isSuccess ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="block text-on-surface font-semibold text-sm" htmlFor="reset-email">
                    Alamat Email
                  </label>
                  <div className="relative active-glow rounded-lg transition-all">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="material-symbols-outlined text-outline text-xl">mail</span>
                    </div>
                    <input
                      className="w-full pl-11 pr-4 py-4 bg-surface border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-sans text-sm"
                      id="reset-email"
                      type="email"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-on-primary font-bold py-4 px-6 rounded-lg hover:opacity-90 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">progress_activity</span>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <span>Kirim Link Pemulihan</span>
                      <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Success State */
              <div className="flex flex-col items-center text-center gap-4 py-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <p className="text-on-surface font-semibold">Tautan Terkirim!</p>
                <p className="text-on-surface-variant text-sm">
                  Silakan periksa kotak masuk email Anda untuk melanjutkan proses pemulihan.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-on-surface-variant font-medium hover:text-primary transition-colors py-2 px-4 group"
          >
            <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">
              chevron_left
            </span>
            <span>Kembali ke Login</span>
          </Link>
        </div>
      </main>

      {/* Background Visual Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[10%] -left-[10%] w-[40vw] h-[40vw] bg-secondary-container/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[5%] -right-[5%] w-[30vw] h-[30vw] bg-primary-container/10 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}
