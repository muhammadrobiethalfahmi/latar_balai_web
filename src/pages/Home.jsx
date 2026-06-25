import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <main className="w-full text-left">
      {/* Hero Section */}
      <section className="relative w-full h-[819px] md:h-[921px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 w-full h-full">
          <div 
            className="bg-cover bg-center w-full h-full opacity-80 animate-fade-in" 
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCuAyNRnLLU1FG7adbhii-1lB-tNaQhJdx1fjnacghF1VpZujhVMccMJbZ_Kx4VlNwpOSSj1GJyRwbQmC7yFeMmr58MO0Ghjuxyn_A9671YBifJLg0dab9HbrQ8YF41tavQPA6maUF8ZfM9BCqoR7lwMWjed6LdeOP4zqfjzzsz8DHlfQ4A8ba6-P0kc4VjSXKp5Oon-JC9Za6Xr_thvCGXpUou1UCCeeiXjPC-054WpmcOIjiMrNio1e4oGl9W9EgZInk74IMuVtOD')` 
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-on-background/40 to-transparent mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto flex flex-col items-center">
          <span className="font-label-md text-label-md text-tertiary-fixed mb-4 uppercase tracking-wider bg-on-background/30 px-4 py-1 rounded-full backdrop-blur-xs border border-tertiary-fixed/30">
            Selamat Datang di Mulyoarjo
          </span>
          <h1 className="font-heading font-bold text-headline-xl-mobile md:text-headline-xl text-on-primary mb-6 max-w-4xl drop-shadow-lg leading-tight">
            Latar Balai Mulyoarjo
          </h1>
          <p className="font-sans text-body-lg text-surface-container-low mb-10 max-w-2xl opacity-90 leading-relaxed">
            Pusat Edukasi, Wisata, dan Pemberdayaan Ekonomi Desa. Menghubungkan tradisi luhur dengan inovasi masa depan untuk kesejahteraan komunitas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link 
              to="/wisata" 
              className="bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider px-8 py-4 rounded-default hover:brightness-110 active:scale-95 transition-all shadow-lg w-full sm:w-auto text-center flex items-center justify-center"
            >
              Jelajahi Wisata Desa
            </Link>
            <Link 
              to="/toko" 
              className="bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider px-8 py-4 rounded-default hover:bg-surface-container-highest active:scale-95 transition-all shadow-lg w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Kunjungi Toko Desa <span className="material-symbols-outlined text-sm">shopping_bag</span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-section-padding px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="relative rounded-xl overflow-hidden ambient-shadow-mid aspect-[4/5] md:aspect-square">
              <img 
                className="object-cover w-full h-full" 
                alt="Balai Desa community" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7lQ-h6LwGSFhV2C_10VonfRKrUyZFlUB6GiZikSkywm79vS_tshkrSPMEs8-P-S1ojIDXp3pbih2zl2hoWO_csCIzCjXeqrIqbcEoIAp88g3_Bh7R7BOclFNNfkRFIA_nme5HQTZldy1qWh2-lXp_3Gw89gCkNF1zno6y2KXolQhxdswTfqbmF_MZvPk7NMAEcxJHfDPog5Wv5IfSU6FzKxgdXSRNZ0X9HDGfPzGCwZixUKZ3vG4bM82G67cF89wrd-hDoH_NDACk"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-secondary-container rounded-full mix-blend-multiply opacity-50 blur-2xl -z-10"></div>
          </div>
          <div className="order-1 md:order-2 flex flex-col items-start">
            <span className="font-label-md text-label-md text-tertiary mb-3 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-tertiary"></span> TENTANG KAMI
            </span>
            <h2 className="font-heading font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6 leading-tight">
              Merawat Tradisi, <br /><span className="text-primary">Membangun Potensi</span>
            </h2>
            <p className="font-sans text-body-lg text-on-surface-variant mb-6 leading-relaxed">
              Latar Balai Mulyoarjo bukan sekadar pusat administrasi, melainkan jantung denyut nadi ekonomi dan budaya desa kami. Kami percaya bahwa setiap jengkal tanah dan setiap individu di desa ini memiliki potensi luar biasa yang siap untuk dikembangkan.
            </p>
            <p className="font-sans text-body-md text-on-surface-variant mb-8 opacity-80 leading-relaxed">
              Melalui integrasi program edukasi agrikultur, pengelolaan wisata alam yang berkelanjutan, dan pemberdayaan produk lokal melalui e-commerce desa, kami mewujudkan visi Mulyoarjo sebagai desa mandiri yang sejahtera dan berdaya saing tinggi di era digital.
            </p>
            <div className="grid grid-cols-2 gap-6 w-full mb-8">
              <div className="border-l-2 border-primary pl-4">
                <span className="block font-heading font-bold text-headline-md text-primary mb-1">24+</span>
                <span className="font-label-md text-label-md text-on-surface-variant">Program Edukasi</span>
              </div>
              <div className="border-l-2 border-tertiary pl-4">
                <span className="block font-heading font-bold text-headline-md text-tertiary mb-1">100%</span>
                <span className="font-label-md text-label-md text-on-surface-variant">Produk Lokal Asli</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
