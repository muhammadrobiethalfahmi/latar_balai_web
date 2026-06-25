import { Link } from 'react-router-dom';

export default function Edukasi() {
  return (
    <main className="w-full text-left">
      {/* Hero Section */}
      <section className="relative w-full h-[614px] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center w-full h-full z-0" 
          style={{ 
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDfjnITj_CRZK9kfTfgleQJwpg8WDkiYLNxT3txAlAt94nmJP0Shhktvii4vH9P5c8yKBPDKXKhNYjsn3IZO3BTZ5afPyDnBjhzuCf3op5Wo9txQKz8oe48Tm2WtAru4aoHPjYb03ObWe1JrYln8TsSoTwCjzJuoYb58mxH5JXOxwMhn_vL3qzkzkGd5tA3G45cyAwiFbhkmfAmnagwzZLFHNY6bD39tZEJKur5GvMJHP4Uz_yK_JvKnRo6p54XWUywmBYrCGOnuOAO')` 
          }}
        ></div>
        <div className="absolute inset-0 bg-surface/30 backdrop-blur-xs z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
        
        <div className="relative z-20 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center mt-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-tertiary-container/90 text-on-tertiary-container font-label-md text-label-md mb-6 shadow-sm backdrop-blur-md">
            Program Unggulan
          </span>
          <h1 className="font-heading font-bold text-headline-xl-mobile md:text-headline-xl text-primary mb-6 drop-shadow-md leading-tight">
            Belajar Budidaya Kambing Bersama Latar Balai
          </h1>
          <p className="font-sans text-body-lg text-on-surface-variant max-w-3xl mx-auto drop-shadow-sm leading-relaxed">
            Pusat pembelajaran komunitas untuk peternakan berkelanjutan dan pemberdayaan ekonomi desa.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-section-padding max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-5 relative">
            <img 
              className="w-full rounded-xl object-cover shadow-[0_10px_30px_rgba(42,107,44,0.08)] aspect-[4/5] border border-surface-variant" 
              alt="Local farmer feeding goat" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrWS3sH0wvFXVrskq751mFTVvHZ193diqT0AfztYAH2CoGu_cF9djzLw4wAbd62nJjhioiiluGgryJqrvz5ujWEbrVJyN1GN6oEU_jY-NT06rslE-WEejhFcaPjERYiwqollRjzGppEOLQ-Jk2xnjhRlwcdGzNKi6nGXLGi059MvSWq1sUXFeCW_upO_vlxpPeQul4cooAwlc6qTrua1KBv9u3j_nP9a7wO7ijavF68JZ2SpO9My35qi79BGWLkTvhWZgy2UvaI4h1"
            />
            <div className="absolute -bottom-6 -right-6 bg-surface p-6 rounded-xl shadow-lg border border-surface-variant hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                  <p className="font-heading font-bold text-headline-md text-primary">50+</p>
                  <p className="font-label-md text-label-md text-on-surface-variant">Sesi Edukasi</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-1"></div>
          <div className="md:col-span-6 space-y-6">
            <h2 className="font-heading font-bold text-headline-lg-mobile md:text-headline-lg text-primary leading-tight">
              Membangun Pengetahuan, Memberdayakan Komunitas
            </h2>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              Program Edukasi Budidaya Kambing di Latar Balai Mulyoarjo didedikasikan untuk menjembatani kearifan lokal dengan inovasi peternakan modern. Kami percaya bahwa pengetahuan adalah kunci utama dalam membangun ekosistem desa yang tangguh dan mandiri.
            </p>
            <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
              Melalui pendekatan praktis dan berbasis komunitas, pengunjung dan warga desa diajak untuk memahami setiap aspek siklus kehidupan ternak—mulai dari manajemen nutrisi hingga perawatan holistik—menjadikan peternakan sebagai sumber kebanggaan dan kesejahteraan bersama.
            </p>
            <div className="pt-4">
              <Link 
                to="/kontak" 
                className="inline-flex bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider px-6 py-3.5 rounded-default hover:brightness-110 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
              >
                Jadwal Kunjungan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-section-padding bg-surface-container-low border-y border-outline-variant/20">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-headline-lg-mobile md:text-headline-lg text-primary mb-4 leading-tight">
              Siklus Pembelajaran Praktis
            </h2>
            <p className="font-sans text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Metodologi edukasi kami dirancang secara bertahap untuk memastikan pemahaman mendalam pada setiap fase peternakan.
            </p>
          </div>
          <div className="relative">
            {/* Timeline Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant/30 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-surface border-2 border-primary flex items-center justify-center text-primary mb-6 shadow-sm group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                  <span className="material-symbols-outlined text-[28px]">architecture</span>
                </div>
                <h3 className="font-heading font-bold text-headline-md text-on-surface mb-3">Persiapan</h3>
                <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                  Pemahaman desain kandang ideal, sanitasi lingkungan, dan persiapan lahan hijau untuk kesejahteraan ternak.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-surface border-2 border-primary flex items-center justify-center text-primary mb-6 shadow-sm group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                  <span className="material-symbols-outlined text-[28px]">eco</span>
                </div>
                <h3 className="font-heading font-bold text-headline-md text-on-surface mb-3">Manajemen Pakan</h3>
                <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                  Edukasi formulasi nutrisi, pengenalan hijauan unggul, dan teknik fermentasi pakan alami yang berkelanjutan.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-surface border-2 border-primary flex items-center justify-center text-primary mb-6 shadow-sm group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                  <span className="material-symbols-outlined text-[28px]">favorite</span>
                </div>
                <h3 className="font-heading font-bold text-headline-md text-on-surface mb-3">Perawatan Hewan</h3>
                <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                  Praktik perawatan harian, menjaga kebersihan ternak, dan pendekatan ramah hewan untuk meminimalisir stres.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-surface border-2 border-primary flex items-center justify-center text-primary mb-6 shadow-sm group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                  <span className="material-symbols-outlined text-[28px]">monitoring</span>
                </div>
                <h3 className="font-heading font-bold text-headline-md text-on-surface mb-3">Monitoring</h3>
                <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                  Pelatihan pencatatan pertumbuhan, deteksi dini kesehatan, dan evaluasi berkala produktivitas ternak.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Box */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        <div className="bg-error-container text-on-error-container p-6 md:p-8 rounded-xl flex items-start gap-4 shadow-sm border border-error/20">
          <span className="material-symbols-outlined text-error text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            info
          </span>
          <div>
            <h4 className="font-heading font-bold text-headline-md text-error mb-2">Pemberitahuan Penting</h4>
            <p className="font-sans text-body-md leading-relaxed">
              Kambing di Latar Balai digunakan sebagai pusat edukasi dan studi percontohan, bukan untuk diperjualbelikan. Program ini murni berfokus pada transfer pengetahuan dan pengembangan kapasitas masyarakat.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
