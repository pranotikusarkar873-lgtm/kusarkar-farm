import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

const initialProducts = {
  mango: { id: 'mango', name: 'Alphonso Mango', marathiName: 'हापूस आंबा', emoji: '🥭', price: 80, unit: 'dozen' },
  grapes: { id: 'grapes', name: 'Grapes', marathiName: 'द्राक्षे', emoji: '🍇', price: 60, unit: 'kg' },
  guava: { id: 'guava', name: 'Fresh Guava', marathiName: 'ताजे पेरू', emoji: '🍈', price: 40, unit: 'kg' },
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kf-cart')) || {}; }
    catch (e) { return {}; }
  });

  const [quantities, setQuantities] = useState({ mango: 1, grapes: 1, guava: 1 });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // User info — persisted in localStorage
  const [userInfo, setUserInfo] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kf-user')) || null; }
    catch (e) { return null; }
  });

  // Order history — persisted in localStorage
  const [orderHistory, setOrderHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kf-history')) || []; }
    catch (e) { return []; }
  });

  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('kf-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('kf-user', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('kf-user');
    }
  }, [userInfo]);

  useEffect(() => {
    localStorage.setItem('kf-history', JSON.stringify(orderHistory));
  }, [orderHistory]);

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

  // Direct Add to Cart — NO login/details popup on Add to Cart
  const addToCart = (id) => {
    const qtyToAdd = quantities[id] || 1;
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + qtyToAdd }));
    const product = initialProducts[id];
    showToast(`🛒 ${product ? product.name : 'Fruit'} × ${qtyToAdd} added to cart!`);
  };

  const updateCartItemQty = (id, qty) => {
    if (qty <= 0) removeFromCart(id);
    else setCart(prev => ({ ...prev, [id]: qty }));
  };

  const removeFromCart = (id) => {
    setCart(prev => { const n = { ...prev }; delete n[id]; return n; });
  };

  const clearCart = () => {
    setCart({});
    showToast('🗑️ Cart cleared');
  };

  const toggleCart = () => setIsCartOpen(prev => !prev);

  // Helper — build history entry snapshot
  const _buildHistoryEntry = (cartSnapshot) => {
    const activeKeys = Object.keys(cartSnapshot).filter(k => cartSnapshot[k] > 0);
    let total = 0;
    const items = activeKeys.map(id => {
      const p = initialProducts[id];
      const qty = cartSnapshot[id];
      const lineTotal = p.price * qty;
      total += lineTotal;
      return { id, emoji: p.emoji, name: p.name, marathiName: p.marathiName, qty, unit: p.unit, lineTotal };
    });
    return {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      items,
      total,
    };
  };

  // Core order execution via API or WhatsApp redirect
  const _executeOrder = async (currentUserInfo = userInfo) => {
    const activeKeys = Object.keys(cart).filter(k => cart[k] > 0);
    if (activeKeys.length === 0) return;

    const cartSnapshot = { ...cart };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, user: currentUserInfo })
      });
      const data = await res.json();

      if (data.success && data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank');
        setOrderHistory(prev => [_buildHistoryEntry(cartSnapshot), ...prev].slice(0, 10));
        setCart({});
        setIsCartOpen(false);
        showToast('✅ Order placed! Cart cleared.');
      } else {
        throw new Error(data.error || 'Failed to generate WhatsApp link');
      }
    } catch (err) {
      // Fallback direct WhatsApp redirect
      let msg = '🌿 *Kusarkar Fruits Order*\n\n';
      if (currentUserInfo) {
        msg += `👤 *Customer:* ${currentUserInfo.name}\n`;
        msg += `📞 *Mobile:* ${currentUserInfo.mobile}\n\n`;
      }
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
      setOrderHistory(prev => [_buildHistoryEntry(cartSnapshot), ...prev].slice(0, 10));
      setCart({});
      setIsCartOpen(false);
      showToast('✅ Order placed! Cart cleared.');
    }
  };

  // Triggered when user clicks "Place Order via WhatsApp" inside cart
  const placeOrder = () => {
    const activeKeys = Object.keys(cart).filter(k => cart[k] > 0);
    if (activeKeys.length === 0) return;

    // If user info is not saved yet, prompt user details modal first!
    if (!userInfo) {
      setShowUserModal(true);
      return;
    }

    // User is already logged in / info exists — directly place order!
    _executeOrder(userInfo);
  };

  // Saved user info from modal — save in localStorage and immediately place order
  const saveUserInfo = (info) => {
    setUserInfo(info);
    setShowUserModal(false);
    setTimeout(() => {
      _executeOrder(info);
    }, 50);
  };

  const clearUserInfo = () => {
    setUserInfo(null);
    showToast('👋 Details cleared. You can enter new details next time.');
  };

  const cartItemCount = Object.values(cart).reduce((sum, q) => sum + q, 0);

  return (
    <CartContext.Provider value={{
      cart,
      products: initialProducts,
      quantities,
      isCartOpen,
      toast,
      userInfo,
      showUserModal,
      orderHistory,
      changeQty,
      addToCart,
      saveUserInfo,
      clearUserInfo,
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
