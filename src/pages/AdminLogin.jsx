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

  const { 
    login, 
    user, 
    userProfile,
    isAdmin, 
    logout 
  } = useAuth();


  // Redirect jika sudah admin
  useEffect(() => {

  if (!user) return;

  if (!userProfile) return;

  if (isAdmin) {

    toast.success("Login berhasil");

    navigate("/admin/dashboard", {
      replace: true,
    });

  } else {

    toast.error("Akun ini bukan administrator");

    logout();

  }

  setIsLoading(false);

}, [
  user,
  userProfile,
  isAdmin,
  navigate,
]);



const handleSubmit = async (e) => {
  e.preventDefault();

  if (isLoading) return;

  setIsLoading(true);

  try {

    await login(identity, password);

    // Tidak cek admin di sini
    // AuthContext akan mengisi userProfile

  } catch (error) {

    const messages = {
      "auth/invalid-credential": "Kredensial admin tidak valid.",
      "auth/user-not-found": "Akun admin tidak ditemukan.",
      "auth/wrong-password": "Kata sandi salah.",
      "auth/too-many-requests": "Terlalu banyak percobaan.",
      "auth/invalid-email": "Format email tidak valid.",
    };

    toast.error(messages[error.code] || "Gagal login.");

    setIsLoading(false);
  }
};



  return (
    <div className="bg-mesh-gradient min-h-screen flex flex-col relative">


      <header className="w-full fixed top-0 z-50 py-6 px-10 flex justify-between items-center pointer-events-none">

        <div className="flex items-center gap-3 pointer-events-auto">

          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary">

            <span className="material-symbols-outlined">
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
            className="text-on-surface-variant font-sans text-sm flex items-center gap-2"
          >

            <span className="material-symbols-outlined text-[18px]">
              arrow_back
            </span>

            Kembali ke Beranda

          </Link>


        </div>


      </header>





      <main className="flex-grow flex items-center justify-center px-4 md:px-8 py-20">


        <div className="w-full max-w-md grid gap-8">



          <div className="text-center space-y-3">


            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-container/10 text-primary">

              <span className="material-symbols-outlined text-[14px]">
                verified_user
              </span>

              <span className="text-[11px] font-bold tracking-widest uppercase">
                Internal Portal
              </span>

            </div>



            <h1 className="text-3xl font-heading font-extrabold text-primary">

              Portal Administrasi Latar Balai

            </h1>



            <p className="text-on-surface-variant text-sm">

              Akses aman untuk pengelolaan operasional Desa Mulyoarjo.

            </p>


          </div>






          <div className="admin-glass rounded-xl p-8">


            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >


              <div>

                <label className="text-xs font-bold">
                  Email Admin
                </label>


                <input

                  className="w-full mt-2 p-4 rounded-lg border"

                  type="email"

                  value={identity}

                  onChange={
                    e=>setIdentity(e.target.value)
                  }

                  required

                />

              </div>





              <div>


                <label className="text-xs font-bold">
                  Kata Sandi
                </label>


                <input

                  className="w-full mt-2 p-4 rounded-lg border"

                  type={
                    showPassword
                    ?
                    "text"
                    :
                    "password"
                  }


                  value={password}

                  onChange={
                    e=>setPassword(e.target.value)
                  }


                  required

                />

              </div>






              <button

                disabled={
                  isLoading ||
                  isSuccess
                }


                className="w-full py-4 rounded-lg bg-primary text-white font-bold"

              >


                {
                  isSuccess
                  ?
                  "Akses Diterima"
                  :
                  isLoading
                  ?
                  "Memverifikasi..."
                  :
                  "Login Admin"
                }


              </button>



            </form>



          </div>




        </div>


      </main>



    </div>
  );
}