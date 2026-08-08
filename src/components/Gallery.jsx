import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Gallery = () => {
  const { lang, t } = useLanguage();
  const isMr = lang === 'mr';
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Lightbox state
  const [lightbox, setLightbox] = useState(null); // { src, alt, idx }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const galleryImages = [
    { src: '/gallery_mango_sliced.jpg', alt: 'Juicy Alphonso Mango Slices', span: 'tall', tag: '🥭 Alphonso', tagMr: '🥭 हापूस' },
    { src: '/gallery_guava_farm.jpg',   alt: 'Guava from the Farm',         span: 'tall', tag: '🍈 Farm Fresh', tagMr: '🍈 ताजे पेरू' },
    { src: '/gallery_grapes_box.jpg',   alt: 'Grapes Ready for Export',     span: 'square', tag: '🍇 Exports', tagMr: '🍇 निर्यात' },
    { src: '/gallery_mango_harvest.jpg',alt: 'Mango Harvest from Farm',     span: 'tall', tag: '🥭 Harvest', tagMr: '🥭 फळकाढणी' },
    { src: '/gallery_guava_fresh.jpg',  alt: 'Fresh Farm Guavas',           span: 'square', tag: '🍈 Guava', tagMr: '🍈 पेरू' },
    { src: '/gallery_grapes.png',       alt: 'Fresh Black Grapes',          span: 'square', tag: '🍇 Grapes', tagMr: '🍇 काळी द्राक्षे' },
    { src: '/gallery_mango_box.jpg',    alt: 'Mango Box Ready for Delivery',span: 'wide', tag: '📦 Export Box', tagMr: '📦 पॅक बॉक्स' },
    { src: '/guava.png',                alt: 'Fresh Guavas',                span: 'square', tag: '🍃 Organic', tagMr: '🍃 सेंद्रिय' },
    { src: '/gallery_vineyard.png',     alt: 'Kusarkar Farm',               span: 'wide', tag: '🌾 Farm', tagMr: '🌾 फार्म' },
    { src: '/gallery_farmer.png',       alt: 'Farmer Harvesting Mangoes',   span: 'tall', tag: '👨‍🌾 Harvesting', tagMr: '👨‍🌾 फळकाढणी' },
    { src: '/hero_fruits.png',          alt: 'Farm Fresh Fruits',           span: 'square', tag: '✨ Quality', tagMr: '✨ गुणवत्ता' },
    { src: '/gallery_green_grapes.jpg', alt: 'Fresh Green Grapes',          span: 'square', tag: '🍇 Green Grapes', tagMr: '🍇 हिरवी द्राक्षे' },
    { src: '/farm.png',                 alt: 'Kusarkar Farm Field',          span: 'wide', tag: '🌿 50+ Acres', tagMr: '🌿 ५०+ एकर' },
  ];

  // Open lightbox
  const openLightbox = useCallback((img, idx) => {
    setLightbox({ ...img, idx });
    document.body.style.overflow = 'hidden';
  }, []);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = '';
  }, []);

  // Navigate prev/next
  const navigate = useCallback((dir) => {
    setLightbox(prev => {
      const next = (prev.idx + dir + galleryImages.length) % galleryImages.length;
      return { ...galleryImages[next], idx: next };
    });
  }, [galleryImages]);

  // Keyboard listener
  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowRight')  navigate(1);
      if (e.key === 'ArrowLeft')   navigate(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, closeLightbox, navigate]);

  return (
    <section className="gallery-section" id="gallery" ref={sectionRef}>
      <div className="container">

        <div className={`section-heading-block ${visible ? 'section-heading-block--in' : ''}`}>
          <span className="shb-eyebrow">{t('gallery.eyebrow')}</span>
          <h2 className="shb-title">{t('gallery.title')}</h2>
          <div className="shb-underline" />
        </div>

        <div className="gallery-masonry">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className={`gallery-tile gallery-tile--${img.span} gal-tile-anim ${visible ? 'gal-tile-anim--in' : ''}`}
              style={{ transitionDelay: visible ? `${idx * 0.07}s` : '0s' }}
              onClick={() => openLightbox(img, idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openLightbox(img, idx)}
              aria-label={`View ${img.alt}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              {img.tag && <span className="gallery-tile-tag">{isMr ? img.tagMr : img.tag}</span>}
              {/* Hover overlay hint */}
              <div className="gallery-tile-overlay">
                <span className="gallery-tile-zoom">🔍</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox Modal ── */}
      {lightbox && (
        <div
          className="lb-backdrop"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image Lightbox"
        >
          {/* Inner — stop click propagation so clicking image doesn't close */}
          <div className="lb-inner" onClick={(e) => e.stopPropagation()}>

            {/* Close button */}
            <button className="lb-close" onClick={closeLightbox} aria-label="Close">
              ✕
            </button>

            {/* Prev arrow */}
            <button className="lb-nav lb-prev" onClick={() => navigate(-1)} aria-label="Previous">
              ‹
            </button>

            {/* Image */}
            <img
              key={lightbox.src}
              src={lightbox.src}
              alt={lightbox.alt}
              className="lb-img"
            />

            {/* Next arrow */}
            <button className="lb-nav lb-next" onClick={() => navigate(1)} aria-label="Next">
              ›
            </button>

            {/* Caption */}
            <div className="lb-caption">{lightbox.alt}</div>

            {/* Dots */}
            <div className="lb-dots">
              {galleryImages.map((_, i) => (
                <span
                  key={i}
                  className={`lb-dot ${i === lightbox.idx ? 'lb-dot--active' : ''}`}
                  onClick={() => setLightbox({ ...galleryImages[i], idx: i })}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
