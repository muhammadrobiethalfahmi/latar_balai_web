import { createContext, useContext, useState, useEffect } from 'react';
import { createOrder } from '../services/orderService';
import { getSettings } from '../services/settingsService';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('mulyoarjo_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [cartOpen, setCartOpen] = useState(false);

  // Nomor WhatsApp khusus Toko
  const [tokoWhatsapp, setTokoWhatsapp] = useState('');

  // ============================================================
  // LOAD NOMOR WHATSAPP TOKO DARI FIRESTORE
  // ============================================================
  useEffect(() => {
    async function loadTokoWhatsapp() {
      try {
        const data = await getSettings();

        const whatsapp = data?.contact?.toko?.whatsapp;

        if (whatsapp) {
          const cleanNumber = String(whatsapp).replace(/\D/g, '');
          setTokoWhatsapp(cleanNumber);

          console.log('WhatsApp Toko berhasil dimuat:', cleanNumber);
        } else {
          console.warn(
            'Nomor WhatsApp Toko belum tersedia di Settings.'
          );
        }
      } catch (error) {
        console.error(
          'Gagal mengambil nomor WhatsApp Toko:',
          error
        );
      }
    }

    loadTokoWhatsapp();
  }, []);

  // ============================================================
  // SIMPAN KERANJANG KE LOCAL STORAGE
  // ============================================================
  useEffect(() => {
    localStorage.setItem(
      'mulyoarjo_cart',
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // ============================================================
  // TAMBAH PRODUK
  // ============================================================
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  };

  // ============================================================
  // HAPUS PRODUK
  // ============================================================
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // ============================================================
  // UPDATE JUMLAH PRODUK
  // ============================================================
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  // ============================================================
  // KOSONGKAN KERANJANG
  // ============================================================
  const clearCart = () => {
    setCartItems([]);
  };

  // ============================================================
  // HITUNG SUBTOTAL
  // ============================================================
  const getSubtotal = () => {
    return cartItems.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  };

  // ============================================================
  // HITUNG JUMLAH PRODUK
  // ============================================================
  const getCartCount = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  };

  // ============================================================
  // CHECKOUT VIA WHATSAPP TOKO
  // ============================================================
  const sendWhatsAppCheckout = async (formData) => {
    try {
      const {
        name,
        address,
        orderType,
      } = formData;

      // Pastikan nomor Toko sudah tersedia
      if (!tokoWhatsapp) {
        alert(
          'Nomor WhatsApp Toko belum tersedia. Silakan hubungi administrator.'
        );
        return;
      }

      let message =
        `*PESANAN BARU - LATAR BALE MULYOARJO*\n\n`;

      message += `*Detail Pelanggan:*\n`;
      message += `- Nama: ${name}\n`;
      message += `- Alamat: ${address}\n`;
      message += `- Tipe Pengiriman: ${
        orderType === 'delivery'
          ? 'Kirim ke Alamat'
          : 'Ambil Sendiri'
      }\n\n`;

      message += `*Daftar Belanja:*\n`;

      cartItems.forEach((item, index) => {
        const itemTotal =
          item.price * item.quantity;

        message += `${index + 1}. ${
          item.name
        } (${item.quantity}x) - Rp ${itemTotal.toLocaleString(
          'id-ID'
        )}\n`;
      });

      message += `\n*Total Pembayaran:* Rp ${getSubtotal().toLocaleString(
        'id-ID'
      )}\n\n`;

      message +=
        `Mohon segera diproses ya admin. Terima kasih!`;

      // ========================================================
      // SIMPAN ORDER KE FIREBASE
      // ========================================================
      await createOrder({
        customerName: name,
        customerAddress: address,
        customerPhone: '',
        orderType,
        items: cartItems,
        total: getSubtotal(),
      });

      // ========================================================
      // KIRIM KE WHATSAPP TOKO
      // ========================================================
      const encodedMessage =
        encodeURIComponent(message);

      const whatsappUrl =
        `https://wa.me/${tokoWhatsapp}?text=${encodedMessage}`;

      console.log(
        'Checkout dikirim ke WhatsApp Toko:',
        tokoWhatsapp
      );

      window.open(
        whatsappUrl,
        '_blank'
      );

      // ========================================================
      // BERSIHKAN KERANJANG
      // ========================================================
      clearCart();
      setCartOpen(false);

    } catch (error) {
      console.error(
        'Checkout gagal:',
        error
      );

      alert(
        'Checkout gagal, dikarenakan stock habis. Silakan coba lagi.'
      );
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartOpen,
        setCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getSubtotal,
        getCartCount,
        sendWhatsAppCheckout,
        tokoWhatsapp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart must be used within a CartProvider'
    );
  }

  return context;
}