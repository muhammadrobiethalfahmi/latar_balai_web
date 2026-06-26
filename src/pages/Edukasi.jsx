import { Link } from 'react-router-dom';

export default function Edukasi() {
  return (
    <main className="w-full text-left bg-[#FCFBF7]"> {/* Menambahkan background earthy tone yang lembut */}
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[614px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center w-full h-full z-0" 
          style={{ 
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfjnITj_CRZK9kfTfgleQJwpg8WDkiYLNxT3txAlAt94nmJP0Shhktvii4vH9P5c8yKBPDKXKhNYjsn3IZO3BTZ5afPyDnBjhzuCf3op5Wo9txQKz8oe48Tm2WtAru4aoHPjYb03ObWe1JrYln8TsSoTwCjzJuoYb58mxH5JXOxwMhn_vL3qzkzkGd5tA3G45cyAwiFbhkmfAmnagwzZLFHNY6bD39tZEJKur5GvMJHP4Uz_yK_JvKnRo6p54XWUywmBYrCGOnuOAO')` 
          }}
        ></div>
        {/* Mengubah opacity backdrop agar text hero lebih kontras dan terbaca */}
        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCFBF7] via-transparent to-transparent z-10"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-8 text-center mt-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-medium text-sm mb-6 shadow-sm">
            Program Unggulan
          </span>
          <h1 className="font-serif font-bold text-3xl md:text-5xl text-white mb-6 drop-shadow-md leading-tight">
            Belajar Budidaya Kambing Bersama Latar Balai
          </h1>
          <p className="font-sans text-lg md:text-xl text-stone-100 max-w-3xl mx-auto drop-shadow-sm leading-relaxed">
            Pusat pembelajaran komunitas untuk peternakan berkelanjutan dan pemberdayaan ekonomi desa.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative pb-6 md:pb-0"> {/* Ditambah padding bawah untuk ruang badge di mobile */}
            <img 
              className="w-full rounded-2xl object-cover shadow-[0_15px_30px_rgba(42,107,44,0.06)] aspect-[4/5] border border-stone-200" 
              alt="Local farmer feeding goat" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrWS3sH0wvFXVrskq751mFTVvHZ193diqT0AfztYAH2CoGu_cF9djzLw4wAbd62nJjhioiiluGgryJqrvz5ujWEbrVJyN1GN6oEU_jY-NT06rslE-WEejhFcaPjERYiwqollRjzGppEOLQ-Jk2xnjhRlwcdGzNKi6nGXLGi059MvSWq1sUXFeCW_upO_vlxpPeQul4cooAwlc6qTrua1KBv9u3j_nP9a7wO7ijavF68JZ2SpO9My35qi79BGWLkTvhWZgy2UvaI4h1"
            />
            {/* Mengubah posisi dan kebulatan sudut badge agar serasi dengan gambar */}
            <div className="absolute -bottom-4 -right-4 bg-white p-5 rounded-2xl shadow-xl border border-stone-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                  <p className="font-sans font-bold text-2xl text-emerald-800 leading-none">50+</p>
                  <p className="font-sans text-sm text-stone-500 mt-1">Sesi Edukasi</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1"></div>
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-stone-800 leading-tight">
              Membangun Pengetahuan, Memberdayakan Komunitas
            </h2>
            <p className="font-sans text-base text-stone-600 leading-relaxed">
              Program Edukasi Budidaya Kambing di Latar Balai Mulyoarjo didedikasikan untuk menjembatani kearifan lokal dengan inovasi peternakan modern. Kami percaya bahwa pengetahuan adalah kunci utama dalam membangun ekosistem desa yang tangguh dan mandiri.
            </p>
            <p className="font-sans text-base text-stone-600 leading-relaxed">
              Melalui pendekatan praktis dan berbasis komunitas, pengunjung dan warga desa diajak untuk memahami setiap aspek siklus kehidupan ternak—mulai dari manajemen nutrisi hingga perawatan holistik—menjadikan peternakan sebagai sumber kebanggaan dan kesejahteraan bersama.
            </p>
            <div className="pt-4">
              <Link 
                to="/kontak" 
                className="inline-flex bg-emerald-700 text-white font-semibold text-sm uppercase tracking-wider px-7 py-4 rounded-xl hover:bg-emerald-800 transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:scale-95"
              >
                Jadwal Kunjungan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-stone-50 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif font-bold text-3xl md:text-4xl text-stone-800 mb-4 leading-tight">
              Siklus Pembelajaran Praktis
            </h2>
            <p className="font-sans text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Metodologi edukasi kami dirancang secara bertahap untuk memastikan pemahaman mendalam pada setiap fase peternakan.
            </p>
          </div>
          
          <div className="relative">
            {/* FIX GARIS TIMELINE: Diubah dari top-1/2 ke top-8 agar garis melintasi MODAL/IKON BULAT, bukan memotong teks tulisan */}
            <div className="hidden lg:block absolute top-8 left-4 right-4 h-0.5 bg-emerald-700/20 z-0"></div>
            
            {/* RESPONSIVITAS TERCAPAI: Menggunakan sm:grid-cols-2 agar saat di tablet teks tidak berdesakan kekanan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl shadow-sm lg:shadow-none border border-stone-100 lg:border-none">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-emerald-700 flex items-center justify-center text-emerald-700 mb-6 shadow-sm group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-[26px]">architecture</span>
                </div>
                <h3 className="font-sans font-bold text-xl text-stone-800 mb-3">Persiapan</h3>
                <p className="font-sans text-sm text-stone-600 leading-relaxed max-w-xs">
                  Pemahaman desain kandang ideal, sanitasi lingkungan, dan persiapan lahan hijau untuk kesejahteraan ternak.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl shadow-sm lg:shadow-none border border-stone-100 lg:border-none">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-emerald-700 flex items-center justify-center text-emerald-700 mb-6 shadow-sm group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-[26px]">eco</span>
                </div>
                <h3 className="font-sans font-bold text-xl text-stone-800 mb-3">Manajemen Pakan</h3>
                <p className="font-sans text-sm text-stone-600 leading-relaxed max-w-xs">
                  Edukasi formulasi nutrisi, pengenalan hijauan unggul, dan teknik fermentasi pakan alami yang berkelanjutan.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl shadow-sm lg:shadow-none border border-stone-100 lg:border-none">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-emerald-700 flex items-center justify-center text-emerald-700 mb-6 shadow-sm group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-[26px]">favorite</span>
                </div>
                <h3 className="font-sans font-bold text-xl text-stone-800 mb-3">Perawatan Hewan</h3>
                <p className="font-sans text-sm text-stone-600 leading-relaxed max-w-xs">
                  Praktik perawatan harian, menjaga kebersihan ternak, dan pendekatan ramah hewan untuk meminimalisir stres.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center group bg-white lg:bg-transparent p-6 lg:p-0 rounded-2xl shadow-sm lg:shadow-none border border-stone-100 lg:border-none">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-emerald-700 flex items-center justify-center text-emerald-700 mb-6 shadow-sm group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-[26px]">monitoring</span>
                </div>
                <h3 className="font-sans font-bold text-xl text-stone-800 mb-3">Monitoring</h3>
                <p className="font-sans text-sm text-stone-600 leading-relaxed max-w-xs">
                  Pelatihan pencatatan pertumbuhan, deteksi dini kesehatan, dan evaluasi berkala produktivitas ternak.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Box */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="bg-amber-50 text-amber-900 p-6 md:p-8 rounded-2xl flex items-start gap-4 shadow-sm border border-amber-200/70">
          <span className="material-symbols-outlined text-amber-700 text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            info
          </span>
          <div>
            <h4 className="font-sans font-bold text-lg text-amber-800 mb-1">Pemberitahuan Penting</h4>
            <p className="font-sans text-sm md:text-base text-amber-900/80 leading-relaxed">
              Kambing di Latar Balai digunakan sebagai pusat edukasi dan studi percontohan, bukan untuk diperjualbelikan. Program ini murni berfokus pada transfer pengetahuan dan pengembangan kapasitas masyarakat.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}