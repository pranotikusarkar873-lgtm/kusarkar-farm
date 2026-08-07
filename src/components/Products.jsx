import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export const Products = () => {
  const { lang, t } = useLanguage();
  const { quantities, changeQty, addToCart } = useCart();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Fetch products from Node.js Backend API
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProductList(data.products);
        }
      })
      .catch(() => {
        // Local fallback if server loading
        setProductList([
          {
            id: 'grapes',
            name: 'Grapes',
            marathiName: 'द्राक्षे',
            emoji: '🍇',
            image: '/grapes.png',
            price: 60,
            unit: 'kg',
            bgClass: 'card-grapes-bg',
            titleClass: 'green-t',
            btnClass: 'green-btn',
            featuresEn: ['Sweet & Crunchy', 'Export Quality', 'Naturally Grown', 'Rich in Antioxidants'],
            featuresMr: ['गोड व कुरकुरीत', 'एक्सपोर्ट क्वालिटी', 'नैसर्गिकरीत्या पिकवलेली', 'अँटीऑक्सिडंट्सने समृद्ध']
          },
          {
            id: 'mango',
            name: 'Mango',
            marathiName: 'आंबा',
            emoji: '🥭',
            image: '/mango.png',
            price: 80,
            unit: 'dozen',
            bgClass: 'card-mango-bg',
            titleClass: 'orange-t',
            btnClass: 'orange-btn',
            featuresEn: ['Naturally Ripened', 'Juicy & Sweet', 'Premium Quality', 'Seasonal Delight'],
            featuresMr: ['नैसर्गिक रीतीने पिकवलेले', 'रसाळ व गोड', 'प्रीमियम गुणवत्ता', 'हंगामातील मेजवानी']
          },
          {
            id: 'guava',
            name: 'Guava',
            marathiName: 'पेरू',
            emoji: '🍈',
            image: '/guava.png',
            price: 40,
            unit: 'kg',
            bgClass: 'card-guava-bg',
            titleClass: 'bright-green-t',
            btnClass: 'bright-green-btn',
            featuresEn: ['Vitamin C Rich', 'Chemical Free', 'Organic Farming', 'Fresh Harvest'],
            featuresMr: ['व्हिटॅमिन सी ने समृद्ध', 'केमिकल फ्री', 'सेंद्रिय शेती', 'ताजी काढणी']
          }
        ]);
      });
  }, []);

  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="section-header center">
          <h2 className="section-title-serif">{t('prod.sectionTitle')}</h2>
          <p className="section-subtitle-main">{t('prod.sectionSub')}</p>
        </div>

        <div className="products-grid-h">
          {productList.map(item => {
            const isMr = lang === 'mr';
            const features = isMr ? item.featuresMr : item.featuresEn;
            const title = isMr ? item.marathiName : item.name;

            return (
              <div key={item.id} className={`product-h-card ${item.bgClass}`}>
                <div className="product-h-img-col">
                  <img src={item.image} alt={item.name} className="product-h-img" />
                </div>
                <div className="product-h-info-col">
                  <div className="product-h-title-row">
                    <span className="product-h-icon">{item.emoji}</span>
                    <h3 className={`product-h-title ${item.titleClass}`}>{title}</h3>
                  </div>

                  <ul className="product-h-features">
                    {features.map((feat, idx) => (
                      <li key={idx}>
                        <span className={`chk ${item.id === 'mango' ? 'gold' : ''}`}>✓</span> {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="product-h-price-row">
                    <span className="product-h-price">₹{item.price} <small>/ {item.unit}</small></span>
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
