import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

const initialProducts = {
  mango: { id: 'mango', name: 'Alphonso Mango', marathiName: 'हापूस आंबा', emoji: '🥭', price: 80, unit: 'dozen' },
  grapes: { id: 'grapes', name: 'Black Grapes', marathiName: 'काळी द्राक्षे', emoji: '🍇', price: 60, unit: 'kg' },
  guava: { id: 'guava', name: 'Fresh Guava', marathiName: 'ताजे पेरू', emoji: '🍈', price: 40, unit: 'kg' },
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('kf-cart')) || {};
    } catch (e) {
      return {};
    }
  });

  const [quantities, setQuantities] = useState({ mango: 1, grapes: 1, guava: 1 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('kf-cart', JSON.stringify(cart));
  }, [cart]);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const changeQty = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const addToCart = (id) => {
    const qtyToAdd = quantities[id] || 1;
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + qtyToAdd
    }));
    const product = initialProducts[id];
    showToast(`🛒 ${product.name} × ${qtyToAdd} added to cart!`);
  };

  const updateCartItemQty = (id, qty) => {
    if (qty <= 0) {
      removeFromCart(id);
    } else {
      setCart(prev => ({ ...prev, [id]: qty }));
    }
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const clearCart = () => {
    setCart({});
    showToast('🗑️ Cart cleared');
  };

  const toggleCart = () => setIsCartOpen(prev => !prev);

  const placeOrder = async () => {
    const activeKeys = Object.keys(cart).filter(k => cart[k] > 0);
    if (activeKeys.length === 0) return;

    try {
      // Call Node.js Backend API
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart })
      });
      const data = await res.json();

      if (data.success && data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank');
        showToast('📦 Opening WhatsApp for checkout!');
      } else {
        throw new Error(data.error || 'Failed to generate WhatsApp link');
      }
    } catch (err) {
      // Fallback direct WhatsApp redirect
      let msg = '🌿 *Kusarkar Fruits Order*\n\n';
      let total = 0;
      activeKeys.forEach(id => {
        const p = initialProducts[id];
        const qty = cart[id];
        const line = p.price * qty;
        total += line;
        msg += `${p.emoji} ${p.name} × ${qty} = ₹${line}\n`;
      });
      msg += `\n💰 *Total: ₹${total}*\n\nPlease confirm my order. Thank you!`;
      const url = `https://wa.me/919421311949?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank');
    }
  };

  const cartItemCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  return (
    <CartContext.Provider value={{
      cart,
      products: initialProducts,
      quantities,
      isCartOpen,
      toast,
      changeQty,
      addToCart,
      updateCartItemQty,
      removeFromCart,
      clearCart,
      toggleCart,
      placeOrder,
      cartItemCount,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
