import { useState } from 'react';
import { useCart } from '../context/CartContext';

const PRODUCTS = [
  {
    id: 'telur-kampung',
    title: 'Telur Ayam Kampung',
    category: 'Peternakan',
    description: 'Kualitas Grade A, dipanen setiap pagi dari peternakan lokal dengan pakan alami.',
    price: 25000,
    unit: 'kg',
    badge: 'Grade A',
    badgeColor: 'bg-[#D97706] text-white', // Menggunakan aksen warna amber/emas premium
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUkEizOAOqBxz8TicWVpz45p25cYO_YwSLJkO-HlnmvCgwBpno903fex52cIectJqRh4NS0CyN2qay2fhVyrJoXeb1Buz5qxwu8A8X8PA0cGCPiOKV2I2wlqWBgteGNrzh06asGcCsjoiG7CkmuY0bee6JNXgTqPc_h0HHR7LyvNV49i-1U7Ui4p1FImbCquFa9qPUnqF4CMIl8a6tq31CTCi_fMv8p3ptPsQXf_NnKDAzA4q7iSeraXAustyK8CowPR48zMzkqq0_',
  },
  {
    id: 'ayam-afkir',
    title: 'Ayam Afkir Segar',
    category: 'Peternakan',
    description: 'Ayam segar pilihan, sudah dibersihkan dan siap olah untuk berbagai masakan Nusantara.',
    price: 45000,
    unit: 'ekor',
    badge: null,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUlAYnXCZ3u4m31uzxfVV-dET-Wslml6mbiUJmQ3vbVeysSsgSwb0jHaGL3AUwfHtwJJtBcd0G2sgyMwI4eJkEwRXVyAk138ew3sClrz0-K6kf9Z3CL_tQUv4Q1UNLT8KCaG9YmuZi3YrVJzfRQ8eSJF2MAIRL45wnEztzh3-uZ7N-oYsfvkTxUECNpC1pUNz18P9S8l-CufZX-7fbYPrERkqnpbgyYOUpW3s7H94HQq-vB_OyIWwK1u3RQnWEdVkcekooxrYenLQU',
  },
  {
    id: 'pupuk-organik',
    title: 'Pupuk Organik Cair',
    category: 'Pertanian',
    description: 'Diproduksi mandiri oleh unit peternakan desa. Kaya nutrisi untuk menyuburkan tanaman Anda.',
    price: 30000,
    unit: 'liter',
    badge: null,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_6G9x2WcGPYawEN62pFVu0zg_jDVeXUK89boQAmz281jxB5BAJSq8JkzIQDVgv2HUT7C7GICnWhqEvN4WFLv4_Ff0sY02FE3FL7QjlHVeSqQKYqyYOBQnmhc3iCdO8ZnadHPYQ-8DBHfCAmJx-YXpkjhGC0llJDIflq6WDOgMgxejXMAUMh1jvsVy7xhFxulBIv_ZiZVdK44t64DGLC8fQIbSGAfi6c2M8YTt9DnuqzPazjjcLN5bmaq19Nr75VknQo47hmttFl5',
  },
  {
    id: 'beras-mulyoarjo',
    title: 'Beras Mulyoarjo',
    category: 'Pertanian',
    description: 'Beras premium hasil panen lokal yang pulen dan harum, diproses tanpa pemutih buatan.',
    price: 65000,
    unit: '5kg',
    badge: 'Premium',
    badgeColor: 'bg-[#114224] text-white', // Menggunakan warna utama hijau hutan desa
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6bXCtaRHRDqFI-6TwF2jgvFwy39UEzTFKytCSUsPwALmJY82RECkDJQ-Ov4qlYEEh89qAFq3aiQ27ECg9pcZovMYIG_CUzhJV3MPaw9ff_APhVhm3sLjWZ2xISXJBEc9fFaHI_z0UIWZdMO0BWmez1YE2VMKdpJ9EQe1kVskoNffH3YVodcMOmwmos7KDKDK2t-kFs8APTX5UMyNvI_NO3ci4cOMDOX36PtMvQunMTJL8JzlutkhUiQEFmb7DboUnIGr_9NvkvmYg',
  },
  {
    id: 'anyaman-bambu',
    title: 'Anyaman Bambu Tradisional',
    category: 'Kerajinan',
    description: 'Kerajinan tangan otentik hasil karya pengrajin Desa Mulyoarjo. Kuat dan estetis.',
    price: 75000,
    unit: 'set',
    badge: null,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj7E06gSIbQpKUcTf9nSp4pOWySD-Cyw7i2Bbkjpxp2zcyeLlB4jx4c5e9NuMp0o30qlAjMaSxlfNompssbCeHEWQkyv1gJGPExM4Q8VrWqshDQz04LCNPrlUtIuUSaqyqvqdF7ER56JsIa57lGhf77-St9lx1AAaiMv8hJKuf6VLp9ifi02HTHTPtrhrYuPYGOEqMLQsJJKmKIW6lNVFfFIPj1FTXJCIl3O4BSQS20EyYNmKUDofJ1_j2mRr5qgQNRYTBgMYFHWLJ',
  },
];

const CATEGORIES = ['Semua Produk', 'Peternakan', 'Pertanian', 'Kerajinan'];

export default function Toko() {
  const [activeCategory, setActiveCategory] = useState('Semua Produk');
  const { addToCart } = useCart();

  const filteredProducts =
    activeCategory === 'Semua Produk'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      unit: product.unit,
      image: product.image,
    });
  };

  return (
    <main className="w-full bg-[#FDFBF7] text-left">
      {/* Shop Hero Header */}
      <section className="w-full px-4 md:px-8 pt-8">
        <div className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden rounded-3xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAPtFHVni9M_GewXOn_Mmw81ZFEpwdf5w--awPeuJq3UV4iZaBENf3iZ-ZPqn3R9mRb-euzNs7ivxYGjzkDzrrwiW109yQLRllTSzgT1fMkq75P72LjnGxcF4vM-XZO3Fg4xD9TjhnloWBCaqhRu5cYZT8dBkKwb_42ZlAcpVxKbUsuPRjBS5yS3VZa-gFI2ZSVAR_mjeLnsZNXL75qgNmhSHo11mI1rObQwCqVDT_DpSxPuBx6wxH4OUBxiJIE_bqpsdccYgaTyQwh')`,
            }}
          >
            <div className="absolute inset-0 bg-black/45"></div>
          </div>
          <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#EAB308] text-[#191C19] font-sans font-bold text-xs uppercase tracking-widest mb-6">
              Pasar BUMDes
            </span>
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white font-bold mb-6 leading-tight">
              Toko Desa Mulyoarjo
              <br />
              <span className="font-sans font-light text-2xl md:text-4xl block mt-2 opacity-90">Produk Lokal Berkualitas</span>
            </h1>
            <p className="font-sans text-base md:text-lg text-stone-200 max-w-2xl mx-auto opacity-95">
              Mendukung ekonomi lokal melalui produk-produk unggulan pilihan dari petani dan peternak desa kami.
            </p>
          </div>
        </div>
      </section>

      {/* Marketplace Container */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Categories (Desktop) */}
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <div className="sticky top-28">
              <h3 className="font-serif text-xl font-bold text-[#114224] mb-6 pb-4 border-b border-stone-200">
                Kategori
              </h3>
              <nav className="hidden md:flex flex-col gap-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`flex items-center px-4 py-3 rounded-xl font-sans font-semibold text-sm transition-all text-left cursor-pointer ${activeCategory === category
                        ? 'bg-[#114224] text-white shadow-sm'
                        : 'text-stone-600 hover:bg-[#F4F1EA]'
                      }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mr-3 transition-colors ${activeCategory === category ? 'bg-white' : 'bg-[#114224]/40'
                        }`}
                    ></span>
                    {category}
                  </button>
                ))}
              </nav>

              {/* Help Box */}
              <div className="hidden md:block mt-12 p-6 bg-[#F4F1EA] rounded-2xl border border-stone-200">
                <h4 className="font-serif font-bold text-[#114224] mb-2">Butuh Bantuan?</h4>
                <p className="font-sans text-xs md:text-sm text-stone-600 mb-4 leading-relaxed">
                  Hubungi admin toko untuk pemesanan jumlah besar atau keperluan kemitraan BUMDes.
                </p>
                <a
                  className="inline-flex items-center text-[#114224] font-sans font-bold text-sm hover:underline"
                  href="https://wa.me/6281234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Admin
                  <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {/* Mobile Filter Pills */}
            <div className="flex md:hidden overflow-x-auto pb-4 mb-8 gap-2 scrollbar-none">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-6 py-2 rounded-full font-sans font-bold text-sm transition-colors cursor-pointer ${activeCategory === category
                      ? 'bg-[#114224] text-white'
                      : 'bg-[#F4F1EA] text-stone-600'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                      <img
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={product.image}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1542223175-7582dd7ee509?w=500&auto=format&fit=crop&q=60';
                        }}
                      />
                      {product.badge && (
                        <div
                          className={`absolute top-4 left-4 px-3 py-1 rounded-lg font-sans font-bold text-[10px] uppercase tracking-wider shadow-sm ${product.badgeColor}`}
                        >
                          {product.badge}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6 flex-grow flex flex-col">
                      <span className="text-[#114224]/80 font-sans font-bold text-xs uppercase tracking-widest mb-2 block">
                        {product.category}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-[#191C19] mb-2 group-hover:text-[#114224] transition-colors">
                        {product.title}
                      </h3>
                      <p className="font-sans text-sm text-stone-600 mb-6 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Price + Add to Cart */}
                      <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-sans text-[11px] text-stone-400 uppercase tracking-wider">Harga</span>
                          <span className="font-serif font-bold text-[#114224] text-lg">
                            Rp {product.price.toLocaleString('id-ID')}
                            <span className="font-sans text-xs font-normal text-stone-500">/{product.unit}</span>
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-12 h-12 rounded-xl bg-[#114224] text-white flex items-center justify-center hover:bg-[#0B2D18] transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                          aria-label={`Tambahkan ${product.title} ke keranjang`}
                        >
                          <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="py-20 text-center bg-[#F4F1EA] rounded-2xl border border-stone-200">
                <span className="material-symbols-outlined text-6xl text-stone-300 mb-4 block">
                  inventory_2
                </span>
                <h3 className="font-serif text-xl font-bold text-[#191C19]">
                  Belum Ada Produk
                </h3>
                <p className="font-sans text-sm text-stone-500 mt-1">
                  Produk untuk kategori ini akan segera tersedia.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BUMDes Assurance Section */}
      <section className="bg-[#F4F1EA] py-24 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="w-20 h-20 bg-[#114224] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#114224]/10 rotate-3 hover:rotate-0 transition-transform">
            <span className="material-symbols-outlined text-white text-4xl">handshake</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#114224] mb-6">
            Mendukung Ekonomi Desa
          </h2>
          <p className="font-sans text-base md:text-lg text-stone-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            Every purchase you make directly empowers Mulyoarjo's multi-generational cooperative network, sustaining agricultural innovation and fair trade models.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[#114224]">
            {[
              { icon: 'verified', label: 'Terjamin Mutu' },
              { icon: 'local_shipping', label: 'Pengiriman Aman' },
              { icon: 'payments', label: 'Harga Fair Trade' },
            ].map((item) => (
              <div key={item.icon} className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-stone-200/60 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-[#114224]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl text-[#114224]">{item.icon}</span>
                </div>
                <span className="font-sans font-bold text-sm tracking-wide text-[#191C19]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}