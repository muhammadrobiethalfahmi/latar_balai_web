import { Link } from 'react-router-dom';

export default function Wisata() {
  const handleOpenMaps = () => {
    window.open('https://maps.google.com/?q=Desa+Mulyoarjo+Lawang+Malang', '_blank');
  };

  return (
    <main className="w-full text-left">
      {/* Hero Section */}
      <section className="relative w-full min-h-[819px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-80 mix-blend-overlay" 
            alt="Freshwater fishing pond" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxA4OgCYabgK_FXE9sIkiB2MvzSMRzyQkk_kg4Yi-beKExLO2hL0oXe186vfApdwvjyyMeTVYFzUItasgKoxi7XHfVYkR8z6pmLCRn-STVMVkxu1h30LKDFRaL4iBih-VKliiMuP3pFaYxI7eUW4WnHpefSmMubY_Hxw_7sStm8xTX2DfdqOKjHg5z4Ic9VAkJ3MFEIMujpXJW8Ek8BLdKcDYVdnBCn-sBaLLu2IO48RN20TyF3iPMIdGehwcZt3aw9iwV6n3FVftg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-primary-fixed/80 via-transparent to-transparent"></div>
        </div>
        <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center mt-section-padding">
          <span className="inline-block px-4 py-1.5 rounded-full bg-tertiary-container/20 text-tertiary-fixed backdrop-blur-xs font-label-md text-label-md mb-6 border border-tertiary-fixed/30 uppercase tracking-widest">
            Destinasi Unggulan
          </span>
          <h1 className="font-heading font-bold text-headline-xl-mobile md:text-headline-xl text-on-tertiary mb-6 max-w-4xl mx-auto drop-shadow-sm leading-tight">
            Wisata Pemancingan Latar Bale
          </h1>
          <p className="font-sans text-body-lg text-on-tertiary/90 max-w-2xl mx-auto mb-10 drop-shadow-sm leading-relaxed">
            Ketenangan alam dan keseruan memancing di jantung Desa Mulyoarjo. Nikmati pengalaman ekowisata premium yang menyatu dengan harmoni pedesaan.
          </p>
          <Link 
            to="/kontak" 
            className="inline-flex bg-tertiary text-on-tertiary font-label-md text-label-md uppercase tracking-wider px-8 py-4 rounded-default hover:brightness-110 hover:-translate-y-0.5 hover:shadow-xl active:scale-95 transition-all"
          >
            Pesan Tempat Sekarang
          </Link>
        </div>
      </section>

      {/* Bento Grid Info Section */}
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          
          {/* Card 1: Spesies Ikan (Tall) */}
          <div className="md:col-span-1 md:row-span-2 group relative overflow-hidden rounded-xl bg-surface-container border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
            <div className="h-64 md:h-1/2 w-full overflow-hidden relative">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                alt="Tilapia fish swimming" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJcajxXjpUbfxmsPPWAkFzypsm6tUwOWODel0WyhHukETvVjBjfa3npf3wSPJMDwBLzdmLfpEQMPcewt-suVqJSI9GIFnrYdApcfIsnQ_OjI0i9KjPsjEApMM8PBxpUuY_DkJd_nGQHcEvP3tAVSOyF7fNH8hehI9tEQrm_u3GN6GTNtd4Gyqhn_xHJTwaGo35XDq6_wjuwjj4_WuHWBouQCqD0vgKspTmPMtXs1lGKz-mwxxz4HVu599XlS6r0Z97C7WqTTA6_uND"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent"></div>
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-end bg-surface-container z-10 relative -mt-4">
              <span className="material-symbols-outlined text-primary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 0" }}>
                phishing
              </span>
              <h3 className="font-heading font-bold text-headline-md text-on-surface mb-3">Spesies Ikan</h3>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                Kolam kami dikelola dengan standar akuakultur tinggi, menyediakan habitat ideal bagi ikan <strong>Lele</strong> dan <strong>Nila</strong> premium. Nikmati sensasi tarikan ikan yang sehat dalam lingkungan yang terjaga kualitas airnya.
              </p>
            </div>
          </div>

          {/* Card 2: Sistem Memancing (Wide) */}
          <div className="md:col-span-2 bg-surface-container rounded-xl border border-outline-variant/20 shadow-sm hover:shadow-md transition-all duration-300 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 group">
            <div className="flex-1">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 0" }}>
                hourglass_top
              </span>
              <h3 className="font-heading font-bold text-headline-md text-on-surface mb-3">Sistem Memancing</h3>
              <p className="font-sans text-body-md text-on-surface-variant leading-relaxed">
                Kami menerapkan sistem sewa per jam yang fleksibel dipadukan dengan manajemen tangkapan berkelanjutan. Pendekatan ini memastikan populasi kolam tetap sehat dan setiap pengunjung mendapatkan pengalaman memancing yang optimal.
              </p>
            </div>
            <div className="w-full md:w-1/3 h-48 rounded-lg overflow-hidden shrink-0">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                alt="Fishing rods on dock" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuASa-fHtDcn39Xa3uvBUzTLzo4KT2gPoxwMqe1ratFvzsx9Ht9z9GIxNCLnC7ZQR-rgV6tzvio_X8K3j3SezKIkdh27V9Oc4OFPTaIU5UHkMMzQTqcL-qWsFNGxnrBULsxb8lLzL4QDvBnMprHrbU3m68n7bF-sImh5hQDXyQk8rfXNnoK1C-74htDLQVK2nEiyRdUp6qRONKhzBIXfijr1dfMCtIOYCvUbWOfjwCZpLt3Ns5xabihQZBJJHg2dC4Igcvkd7SBttSuX"
              />
            </div>
          </div>

          {/* Card 3: Informasi Pengunjung (Wide) */}
          <div className="md:col-span-2 bg-secondary-container text-on-secondary-container rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                info
              </span>
              <h3 className="font-heading font-bold text-headline-md">Informasi Pengunjung</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
              <div>
                <h4 className="font-label-md text-label-md mb-1 opacity-80 uppercase tracking-wider">Waktu Terbaik</h4>
                <p className="font-sans text-body-md leading-relaxed">
                  Pagi: 06:00 - 09:00<br />Sore: 15:30 - 18:00
                </p>
              </div>
              <div>
                <h4 className="font-label-md text-label-md mb-1 opacity-80 uppercase tracking-wider">Fasilitas Tersedia</h4>
                <p className="font-sans text-body-md leading-relaxed">
                  Gazebo Pribadi, Kantin Desa, Area Bersih, Toilet &amp; Mushola.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Rules Section */}
      <section className="w-full bg-surface-container-high py-section-padding">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h2 className="font-heading font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface mb-12 leading-tight">
            Panduan Pengunjung
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-6 shadow-sm border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                  eco
                </span>
              </div>
              <h4 className="font-heading font-bold text-headline-md text-on-surface mb-2 text-xl">Jaga Kebersihan</h4>
              <p className="font-sans text-body-md text-on-surface-variant text-center leading-relaxed">
                Dilarang membuang sampah sembarangan. Tersedia tempat sampah terpilah di setiap area gazebo.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-6 shadow-sm border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                  set_meal
                </span>
              </div>
              <h4 className="font-heading font-bold text-headline-md text-on-surface mb-2 text-xl">Opsi Tangkapan</h4>
              <p className="font-sans text-body-md text-on-surface-variant text-center leading-relaxed">
                Tersedia pilihan <em>Catch &amp; Release</em> untuk kelestarian, atau timbang bayar untuk ikan yang dibawa pulang.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-6 shadow-sm border border-outline-variant/30">
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>
                  bug_report
                </span>
              </div>
              <h4 className="font-heading font-bold text-headline-md text-on-surface mb-2 text-xl">Aturan Umpan</h4>
              <p className="font-sans text-body-md text-on-surface-variant text-center leading-relaxed">
                Gunakan umpan alami yang disediakan atau disetujui pihak pengelola untuk menjaga kualitas air kolam.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Location CTA Section */}
      <section className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-padding">
        <div className="bg-surface-container rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 flex flex-col md:flex-row">
          <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
            <h2 className="font-heading font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4 leading-tight">
              Kunjungi Kami
            </h2>
            <p className="font-sans text-body-md text-on-surface-variant mb-8 leading-relaxed">
              Latar Bale Fishing Tourism berlokasi strategis di pusat Desa Mulyoarjo. Tempat pelarian sempurna dari hiruk-pikuk kota, mudah diakses kendaraan pribadi.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  location_on
                </span>
                <span className="font-sans text-body-md text-on-surface">Jl. Desa Mulyoarjo Blok C, Latar Bale</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  call
                </span>
                <span className="font-sans text-body-md text-on-surface">+62 812-3456-7890 (Reservasi)</span>
              </div>
            </div>
            <button 
              onClick={handleOpenMaps}
              className="self-start flex items-center gap-2 bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider px-6 py-3.5 rounded-default hover:brightness-110 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>map</span>
              Buka di Google Maps
            </button>
          </div>
          <div className="h-64 md:h-auto md:w-1/2 bg-surface-dim">
            <img 
              className="w-full h-full object-cover" 
              alt="Mulyoarjo Map Pin Location" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBABxQCmzk5hPxFkYOfMT0s47uXABP5flCCNuzCtcrMwMkP_2CJqXAGooHXKBS0u82AdKf_9qcIle6a0P8uz4PegwgKeJTKoKNH1lxvJWZ2Cwkvdd7I5OLwJm_viSJwufeTdjW7oFZthvilB8LnYbsK3uL-o04AvVtov678VMH_4Gr2obpB305BVyj7Rsge04-HPAJ-19IMqTpijC_nZXT7jtvI1GCk-QzcFVuVSwZET2h_p8WnImH8OYzlYU0iLIZPGomGytJqxk8f"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
