import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export const StickyMobileOrderBtn = () => {
  const { t } = useLanguage();
  const { cartItemCount, toggleCart } = useCart();

  return (
    <div className="sticky-mobile-bar-wrap">
      <button className="sticky-mobile-order-btn" onClick={toggleCart}>
        <span className="smob-pulse-ring"></span>
        <span className="smob-content">
          <span className="smob-title">{t('nav.orderNow')}</span>
          <span className="smob-badge">{cartItemCount}</span>
        </span>
      </button>
    </div>
  );
};
