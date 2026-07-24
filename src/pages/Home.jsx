import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="w-full text-left bg-[#FCFBF7]">
      {/* Hero Section */}
      <section className="relative w-full min-h-[650px] md:h-[85vh] flex items-center justify-center overflow-hidden bg-emerald-950">
        <div className="absolute inset-0 w-full h-full">
          <div 
            className="bg-cover bg-center w-full h-full opacity-40 mix-blend-overlay" 
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCuAyNRnLLU1FG7adbhii-1lB-tNaQhJdx1fjnacghF1VpZujhVMccMJbZ_Kx4VlNwpOSSj1GJyRwbQmC7yFeMmr58MO0Ghjuxyn_A9671YBifJLg0dab9HbrQ8YF41tavQPA6maUF8ZfM9BCqoR7lwMWjed6LdeOP4zqfjzzsz8DHlfQ4A8ba6-P0kc4VjSXKp5Oon-JC9Za6Xr_thvCGXpUou1UCCeeiXjPC-054WpmcOIjiMrNio1e4oGl9W9EgZInk74IMuVtOD')` 
            }}
          ></div>
          {/* Lapisan gradasi untuk menjamin semua teks putih terbaca jelas */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/50 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto flex flex-col items-center">
          {/* PERBAIKAN KONTRAS: Menggunakan bg putih transparan agar teks di dalam badge terlihat tajam */}
          <span className="font-sans text-xs md:text-sm font-semibold text-emerald-200 mb-6 uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/20 backdrop-blur-sm">
            Selamat Datang di Mulyoarjo
          </span>
          
          {/* SKALA TYPOGRAPHY: Menaikkan ukuran font agar megah dan sebanding dengan space Hero */}
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 drop-shadow-md leading-tight">
            Latar Bale Mulyoarjo
          </h1>
          
          <p className="font-sans text-base md:text-xl text-stone-200 mb-10 max-w-3xl opacity-90 leading-relaxed">
            Pusat Edukasi, Wisata, dan Pemberdayaan Ekonomi Desa. Menghubungkan tradisi luhur dengan inovasi masa depan untuk kesejahteraan komunitas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              to="/wisata" 
              className="bg-emerald-700 text-white font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-emerald-800 active:scale-95 transition-all shadow-lg text-center"
            >
              Jelajahi Wisata Desa
            </Link>
            <Link 
              to="/toko" 
              className="bg-white/10 text-white border border-white/20 backdrop-blur-sm font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-white/20 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Kunjungi Toko Desa <span className="material-symbols-outlined text-base">shopping_bag</span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* PERBAIKAN SPACING: Mengganti py-section-padding dengan py-20 agar memberi nafas antar-section */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Kiri: Kolom Gambar */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/5] sm:aspect-video lg:aspect-[4/5]">
              <img 
                className="object-cover w-full h-full" 
                alt="Balai Desa community" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7lQ-h6LwGSFhV2C_10VonfRKrUyZFlUB6GiZikSkywm79vS_tshkrSPMEs8-P-S1ojIDXp3pbih2zl2hoWO_csCIzCjXeqrIqbcEoIAp88g3_Bh7R7BOclFNNfkRFIA_nme5HQTZldy1qWh2-lXp_3Gw89gCkNF1zno6y2KXolQhxdswTfqbmF_MZvPk7NMAEcxJHfDPog5Wv5IfSU6FzKxgdXSRNZ0X9HDGfPzGCwZixUKZ3vG4bM82G67cF89wrd-hDoH_NDACk"
              />
            </div>
            {/* Elemen Dekoratif di belakang gambar */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-emerald-200 rounded-full mix-blend-multiply opacity-30 blur-3xl -z-10"></div>
          </div>
          
          {/* Kanan: Kolom Teks Konten */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="font-sans text-xs md:text-sm font-bold text-emerald-700 mb-3 flex items-center gap-2 tracking-wider">
              <span className="w-8 h-[2px] bg-emerald-700"></span> TENTANG KAMI
            </span>
            
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-stone-800 mb-6 leading-tight">
              Merawat Tradisi, <br /><span className="text-emerald-700">Membangun Potensi</span>
            </h2>
            
            <p className="font-sans text-base md:text-lg text-stone-600 mb-6 leading-relaxed">
              Latar Bale Mulyoarjo bukan sekadar pusat administrasi, melainkan jantung denyut nadi ekonomi dan budaya desa kami. Kami percaya bahwa setiap jengkal tanah dan setiap individu di desa ini memiliki potensi luar biasa yang siap untuk dikembangkan.
            </p>
            
            <p className="font-sans text-sm md:text-base text-stone-500 mb-8 leading-relaxed">
              Melalui integrasi program edukasi agrikultur, pengelolaan wisata alam yang berkelanjutan, dan pemberdayaan produk lokal melalui e-commerce desa, kami mewujudkan visi Mulyoarjo sebagai desa mandiri yang sejahtera dan berdaya saing tinggi di era digital.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 w-full pt-4 border-t border-stone-200">
              <div className="pl-2">
                <span className="block font-serif font-bold text-3xl md:text-4xl text-emerald-700 mb-1">24+</span>
                <span className="font-sans text-sm font-medium text-stone-600">Program Edukasi</span>
              </div>
              <div className="pl-2 border-l border-stone-200">
                <span className="block font-serif font-bold text-3xl md:text-4xl text-emerald-600 mb-1">100%</span>
                <span className="font-sans text-sm font-medium text-stone-600">Produk Lokal Asli</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}