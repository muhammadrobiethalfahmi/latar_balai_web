import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartSidebar() {
  const {
    cartItems,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    getSubtotal,
    sendWhatsAppCheckout,
  } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    orderType: 'delivery', // 'delivery' | 'pickup'
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama lengkap wajib diisi';
    if (formData.orderType === 'delivery' && !formData.address.trim()) {
      newErrors.address = 'Alamat pengiriman wajib diisi';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    sendWhatsAppCheckout(formData);
  };

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 z-50 bg-on-background/30 backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-surface border-l border-outline-variant/30 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-2 text-primary">
            <ShoppingBag size={20} />
            <h3 className="font-heading font-bold text-headline-md">Keranjang Belanja</h3>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            className="p-2 text-on-surface-variant hover:text-primary rounded-full hover:bg-surface-container transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-on-surface-variant gap-3">
              <ShoppingBag size={48} className="stroke-1 opacity-40" />
              <p className="font-sans text-body-md">Keranjang Anda masih kosong</p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-2 text-primary font-sans font-bold text-sm hover:underline"
              >
                Mulai Belanja &rarr;
              </button>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 bg-surface-container rounded-lg border border-outline-variant/10 relative group"
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-white border border-outline-variant/20 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col min-w-0">
                      <h4 className="font-heading font-bold text-sm text-primary truncate pr-6">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs text-on-surface-variant mb-2">
                        Rp {item.price.toLocaleString('id-ID')} / {item.unit || 'pcs'}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-auto">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full border border-outline flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-sans text-sm font-semibold w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full border border-outline flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Remove Action */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-3 right-3 text-on-surface-variant/60 hover:text-error transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Form */}
              <form onSubmit={handleCheckout} className="border-t border-outline-variant/20 pt-6 space-y-4 text-left">
                <h4 className="font-heading font-bold text-sm text-primary">Detail Pemesan</h4>
                
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block font-sans text-xs font-semibold text-on-surface-variant mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama Anda"
                    className={`w-full bg-surface-container-lowest border rounded-default px-4 py-2.5 font-sans text-sm outline-hidden focus:border-2 focus:border-primary focus:ring-3 focus:ring-primary/10 ${
                      errors.name ? 'border-error' : 'border-outline-variant'
                    }`}
                  />
                  {errors.name && <p className="text-error text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Delivery Type */}
                <div>
                  <span className="block font-sans text-xs font-semibold text-on-surface-variant mb-2">
                    Metode Transaksi
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`border rounded-default p-3 flex items-center gap-2 cursor-pointer transition-all ${
                      formData.orderType === 'delivery'
                        ? 'border-primary bg-primary/5 text-primary font-semibold'
                        : 'border-outline-variant hover:bg-surface-container'
                    }`}>
                      <input
                        type="radio"
                        name="orderType"
                        value="delivery"
                        checked={formData.orderType === 'delivery'}
                        onChange={handleInputChange}
                        className="text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="font-sans text-xs">Kirim Alamat</span>
                    </label>
                    <label className={`border rounded-default p-3 flex items-center gap-2 cursor-pointer transition-all ${
                      formData.orderType === 'pickup'
                        ? 'border-primary bg-primary/5 text-primary font-semibold'
                        : 'border-outline-variant hover:bg-surface-container'
                    }`}>
                      <input
                        type="radio"
                        name="orderType"
                        value="pickup"
                        checked={formData.orderType === 'pickup'}
                        onChange={handleInputChange}
                        className="text-primary focus:ring-primary h-4 w-4"
                      />
                      <span className="font-sans text-xs">Ambil Sendiri</span>
                    </label>
                  </div>
                </div>

                {/* Address (Only shown for delivery) */}
                {formData.orderType === 'delivery' && (
                  <div>
                    <label htmlFor="address" className="block font-sans text-xs font-semibold text-on-surface-variant mb-1">
                      Alamat Pengiriman
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Masukkan alamat pengiriman lengkap"
                      className={`w-full bg-surface-container-lowest border rounded-default px-4 py-2.5 font-sans text-sm outline-hidden focus:border-2 focus:border-primary focus:ring-3 focus:ring-primary/10 resize-none ${
                        errors.address ? 'border-error' : 'border-outline-variant'
                      }`}
                    />
                    {errors.address && <p className="text-error text-xs mt-1">{errors.address}</p>}
                  </div>
                )}

                {/* Submit Checkout Button */}
                <div className="border-t border-outline-variant/20 pt-6 space-y-4">
                  <div className="flex justify-between items-center font-sans">
                    <span className="text-sm font-semibold text-on-surface-variant">Subtotal</span>
                    <span className="text-base font-bold text-primary">
                      Rp {getSubtotal().toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary text-on-primary font-sans font-bold text-sm py-3.5 rounded-default shadow-md hover:brightness-110 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Pesan via WhatsApp</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
