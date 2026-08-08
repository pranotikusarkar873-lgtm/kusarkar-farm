import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Gallery = () => {
  const { t } = useLanguage();
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
    { src: '/gallery_mango_sliced.jpg', alt: 'Juicy Alphonso Mango Slices', span: 'tall' },
    { src: '/gallery_guava_farm.jpg',   alt: 'Guava from the Farm',         span: 'tall' },
    { src: '/gallery_grapes_box.jpg',   alt: 'Grapes Ready for Export',     span: 'square' },
    { src: '/gallery_mango_harvest.jpg',alt: 'Mango Harvest from Farm',     span: 'tall' },
    { src: '/gallery_guava_fresh.jpg',  alt: 'Fresh Farm Guavas',           span: 'square' },
    { src: '/gallery_grapes.png',       alt: 'Fresh Black Grapes',          span: 'square' },
    { src: '/gallery_mango_box.jpg',    alt: 'Mango Box Ready for Delivery',span: 'wide' },
    { src: '/guava.png',                alt: 'Fresh Guavas',                span: 'square' },
    { src: '/gallery_vineyard.png',     alt: 'Kusarkar Vineyard',           span: 'wide' },
    { src: '/gallery_farmer.png',       alt: 'Farmer Harvesting Mangoes',   span: 'tall' },
    { src: '/farm.png',                 alt: 'Kusarkar Farm Field',          span: 'wide' },
    { src: '/hero_fruits.png',          alt: 'Farm Fresh Fruits',           span: 'square' },
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
          <span className="shb-eyebrow">📸 FARM GALLERY</span>
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
