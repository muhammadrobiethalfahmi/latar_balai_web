import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { getProducts } from '../services/productService';

const CATEGORIES = [
  'Semua Produk',
  'Peternakan',
  'Pertanian',
  'Kerajinan',
];

export default function Toko() {
  const [activeCategory, setActiveCategory] = useState('Semua Produk');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  useEffect(() => {

  loadProducts();

}, []);

async function loadProducts() {
  try {
    const data = await getProducts();

    console.log(JSON.stringify(data, null, 2));

    setProducts(data);

  } catch (error) {
    console.log(error);

  } finally {
    setLoading(false);
  }
}

  const filteredProducts =
    activeCategory === 'Semua Produk'
      ? products
      : products.filter( 
             (p) =>
          p.category?.trim().toLowerCase() ===
          activeCategory.trim().toLowerCase()
      );

const handleAddToCart = (product) => {
  addToCart({
    id: product.id,
    title: product.name,
    price: Number(product.price),
    unit: "pcs",
    image: product.imageUrl,
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
                  href={`https://wa.me/6285808805840?text=Halo%20Admin%20Latar%20Balai,%20saya%20ingin%20memesan%20produk`}

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
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        src={product.imageUrl}
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
                        {product.name}
                      </h3>
                      <p className="font-sans text-sm text-stone-600 mb-6 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Price + Add to Cart */}
                      <div className="mt-auto pt-4 border-t border-stone-100 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-sans text-[11px] text-stone-400 uppercase tracking-wider">Harga</span>
                          <span className="font-serif font-bold text-[#114224] text-lg">
                            Rp {Number(product.price).toLocaleString('id-ID')}
                            <span className="font-sans text-xs font-normal text-stone-500">/{product.unit}</span>
                          </span>
                        </div>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-12 h-12 rounded-xl bg-[#114224] text-white flex items-center justify-center hover:bg-[#0B2D18] transition-all shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                          aria-label={`Tambahkan ${product.name} ke keranjang`}
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