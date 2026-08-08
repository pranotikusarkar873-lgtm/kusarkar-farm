import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { AnimatedTitle } from './AnimatedTitle';

// Hook — fires once when element enters viewport
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
};

export const Products = () => {
  const { lang, t } = useLanguage();
  const { quantities, changeQty, addToCart } = useCart();
  const [productList, setProductList] = useState([]);
  const [sectionRef, sectionVisible] = useReveal();

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => { if (data.success) setProductList(data.products); })
      .catch(() => {
        setProductList([
          {
            id: 'grapes', name: 'Grapes', marathiName: 'द्राक्षे', emoji: '🍇',
            image: '/grapes_farm.png', price: 60, unit: 'kg',
            bgClass: 'card-grapes-bg', titleClass: 'green-t', btnClass: 'green-btn',
            featuresEn: ['Sweet & Crunchy', 'Export Quality', 'Naturally Grown', 'Rich in Antioxidants'],
            featuresMr: ['गोड व कुरकुरीत', 'एक्सपोर्ट क्वालिटी', 'नैसर्गिकरीत्या पिकवलेली', 'अँटीऑक्सिडंट्सने समृद्ध']
          },
          {
            id: 'mango', name: 'Mango', marathiName: 'आंबा', emoji: '🥭',
            image: '/mango_farm.png', price: 80, unit: 'dozen',
            bgClass: 'card-mango-bg', titleClass: 'orange-t', btnClass: 'orange-btn',
            featuresEn: ['Naturally Ripened', 'Juicy & Sweet', 'Premium Quality', 'Seasonal Delight'],
            featuresMr: ['नैसर्गिक रीतीने पिकवलेले', 'रसाळ व गोड', 'प्रीमियम गुणवत्ता', 'हंगामातील मेजवानी']
          },
          {
            id: 'guava', name: 'Guava', marathiName: 'पेरू', emoji: '🍈',
            image: '/guava_farm.png', price: 40, unit: 'kg',
            bgClass: 'card-guava-bg', titleClass: 'bright-green-t', btnClass: 'bright-green-btn',
            featuresEn: ['Vitamin C Rich', 'Chemical Free', 'Organic Farming', 'Fresh Harvest'],
            featuresMr: ['व्हिटॅमिन सी ने समृद्ध', 'केमिकल फ्री', 'सेंद्रिय शेती', 'ताजी काढणी']
          }
        ]);
      });
  }, []);

  return (
    <section className="products-section" id="products" ref={sectionRef}>
      <div className="container">

        {/* Title */}
        <div className={`section-heading-block ${sectionVisible ? 'section-heading-block--in' : ''}`}>
          <span className="shb-eyebrow">{t('prod.eyebrow')}</span>
          <h2 className="shb-title">{t('prod.sectionTitle')}</h2>
          <div className="shb-underline" />
          <p className="shb-subtitle">{t('prod.sectionSub')}</p>
        </div>

        {/* Cards — each slides up with stagger */}
        <div className="products-grid-h">
          {productList.map((item, idx) => {
            const isMr = lang === 'mr';
            const features = isMr ? item.featuresMr : item.featuresEn;
            const title = isMr ? item.marathiName : item.name;
            const unitLabel = isMr ? (item.unit === 'kg' ? 'किलो' : item.unit === 'dozen' ? 'डझन' : item.unit) : item.unit;

            return (
              <div
                key={item.id}
                className={`product-h-card ${item.bgClass} prod-anim-up ${sectionVisible ? 'prod-anim-up--visible' : ''}`}
                style={{ animationDelay: sectionVisible ? `${0.15 + idx * 0.18}s` : '0s' }}
              >
                <div className="product-h-img-col">
                  <img src={item.image} alt={item.name} className="product-h-img" />
                </div>
                <div className="product-h-info-col">
                  <div className="product-h-title-row">
                    <span className="product-h-icon">{item.emoji}</span>
                    <h3 className={`product-h-title ${item.titleClass}`}>{title}</h3>
                  </div>

                  <ul className="product-h-features">
                    {features.map((feat, i) => (
                      <li key={i}>
                        <span className={`chk ${item.id === 'mango' ? 'gold' : ''}`}>✓</span> {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="product-h-price-row">
                    <span className="product-h-price">₹{item.price} <small>/ {unitLabel}</small></span>
                    <div className="qty-selector-sm">
                      <button onClick={() => changeQty(item.id, -1)}>-</button>
                      <span>{quantities[item.id] || 1}</span>
                      <button onClick={() => changeQty(item.id, 1)}>+</button>
                    </div>
                  </div>

                  <div className="product-h-btn-row">
                    <button
                      className={`btn-learn-h ${item.btnClass} full-w-btn`}
                      onClick={() => addToCart(item.id)}
                    >
                      {t('prod.addCart')}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
