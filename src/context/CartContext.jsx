import { createContext, useContext, useState, useEffect } from 'react';
import { createOrder } from "../services/orderService";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('mulyoarjo_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('mulyoarjo_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true); // Open cart sidebar when item is added
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const sendWhatsAppCheckout = async (formData) => {
  try {
    const { name, address, orderType } = formData;
    const adminWhatsApp = "6285808805840";

    let message = `*PESANAN BARU - LATAR BALE MULYOARJO*\n\n`;
    message += `*Detail Pelanggan:*\n`;
    message += `- Nama: ${name}\n`;
    message += `- Alamat: ${address}\n`;
    message += `- Tipe Pengiriman: ${
      orderType === "delivery" ? "Kirim ke Alamat" : "Ambil Sendiri"
    }\n\n`;

    message += `*Daftar Belanja:*\n`;
    cartItems.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      message += `${index + 1}. ${item.name} (${item.quantity}x) - Rp ${itemTotal.toLocaleString("id-ID")}\n`;
    });

    message += `\n*Total Pembayaran:* Rp ${getSubtotal().toLocaleString("id-ID")}\n\n`;
    message += `Mohon segera diproses ya admin. Terima kasih!`;

    // Simpan order ke Firebase
    await createOrder({
      customerName: name,
      customerAddress: address,
      customerPhone: "",
      orderType,
      items: cartItems,
      total: getSubtotal(),
    });

    // Kirim ke WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    // Bersihkan keranjang
    clearCart();
    setCartOpen(false);

  } catch (error) {
    console.error(error);
    alert("Checkout gagal, dikarenakan stock habis. Silakan coba lagi.");
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
