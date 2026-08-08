import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export const CartSidebar = () => {
  const { lang, t } = useLanguage();
  const {
    cart, products, isCartOpen, toggleCart,
    updateCartItemQty, clearCart, placeOrder,
    userInfo, clearUserInfo, orderHistory
  } = useCart();

  const [showHistory, setShowHistory] = useState(false);

  const cartKeys = Object.keys(cart).filter(k => cart[k] > 0);
  const subtotal = cartKeys.reduce((sum, id) => {
    const p = products[id];
    return sum + (p ? p.price * cart[id] : 0);
  }, 0);

  return (
    <>
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`} id="cartSidebar">
        <div className="cart-header">
          <h2>{t('cart.title')}</h2>
          <button className="cart-close-btn" onClick={toggleCart}>✕</button>
        </div>

        {/* ── User info strip ── */}
        {userInfo && (
          <div className="cart-user-strip">
            <div className="cart-user-info">
              <span className="cart-user-avatar">👤</span>
              <div>
                <strong>{userInfo.name}</strong>
                <small>📞 {userInfo.mobile}</small>
              </div>
            </div>
            <button
              className="cart-user-logout"
              onClick={clearUserInfo}
              title={lang === 'mr' ? 'लॉगआउट' : 'Logout'}
            >
              {lang === 'mr' ? 'बदला' : 'Change'}
            </button>
          </div>
        )}

        {/* ── Order History toggle ── */}
        {orderHistory.length > 0 && (
          <div className="cart-history-section">
            <button
              className="cart-history-toggle"
              onClick={() => setShowHistory(prev => !prev)}
            >
              <span>
                🕒 {lang === 'mr' ? 'मागील ऑर्डर्स' : 'Order History'}
                <span className="history-badge">{orderHistory.length}</span>
              </span>
              <span className="history-chevron">{showHistory ? '▲' : '▼'}</span>
            </button>

            {showHistory && (
              <div className="cart-history-list">
                {orderHistory.map(order => (
                  <div key={order.id} className="history-entry">
                    <div className="history-entry-header">
                      <span className="history-date">📅 {order.date} · {order.time}</span>
                      <span className="history-total">₹{order.total}</span>
                    </div>
                    <div className="history-items-row">
                      {order.items.map(item => (
                        <span key={item.id} className="history-item-pill">
                          {item.emoji} {lang === 'mr' ? item.marathiName : item.name} × {item.qty}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Cart items ── */}
        <div className="cart-items" id="cartItems">
          {cartKeys.length === 0 ? (
            <div className="cart-empty" id="cartEmpty">
              <div className="empty-icon">🛒</div>
              <p>{t('cart.empty')}</p>
              <small>{t('cart.emptySub')}</small>
            </div>
          ) : (
            cartKeys.map(id => {
              const p = products[id];
              if (!p) return null;
              const title = lang === 'mr' ? p.marathiName : p.name;
              const qty = cart[id];
              const lineTotal = p.price * qty;

              return (
                <div key={id} className="cart-item-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <span style={{ fontSize: '1.8rem' }}>{p.emoji}</span>
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: '#111' }}>{title}</strong>
                      <small style={{ color: '#666' }}>₹{p.price} / {p.unit}</small>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <div className="qty-selector-sm">
                      <button onClick={() => updateCartItemQty(id, qty - 1)}>-</button>
                      <span>{qty}</span>
                      <button onClick={() => updateCartItemQty(id, qty + 1)}>+</button>
                    </div>
                    <strong style={{ fontSize: '0.95rem', color: '#1f4823', minWidth: '45px', textAlign: 'right' }}>₹{lineTotal}</strong>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ── Cart footer ── */}
        {cartKeys.length > 0 && (
          <div className="cart-footer" id="cartFooter">
            <div className="cart-total-row">
              <span>{t('cart.subtotal')}</span>
              <span id="cartSubtotal">₹{subtotal}</span>
            </div>
            <div className="cart-total-row">
              <span>{t('cart.delivery')}</span>
              <span className="free-delivery">{t('cart.free')}</span>
            </div>
            <div className="cart-total-row grand">
              <span>{t('cart.total')}</span>
              <span id="cartTotal">₹{subtotal}</span>
            </div>
            <button className="btn-primary full-btn checkout-btn" onClick={placeOrder}>
              {t('cart.btnCheckout')}
            </button>
            <button className="btn-outline full-btn" onClick={clearCart} style={{ marginTop: '0.5rem' }}>
              {t('cart.btnClear')}
            </button>
          </div>
        )}
      </div>

      <div
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`}
        id="cartOverlay"
        onClick={toggleCart}
      ></div>
    </>
  );
};
