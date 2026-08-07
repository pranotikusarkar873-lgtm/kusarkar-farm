import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Gallery = () => {
  const { t } = useLanguage();

  const galleryImages = [
    { src: '/gallery_vineyard.png', alt: 'Kusarkar Vineyard' },
    { src: '/gallery_grapes.png', alt: 'Fresh Black Grapes' },
    { src: '/gallery_farmer.png', alt: 'Farmer Harvesting Mangoes' },
    { src: '/guava.png', alt: 'Fresh Guavas' },
    { src: '/farm.png', alt: 'Kusarkar Farm Field' },
    { src: '/hero_fruits.png', alt: 'Farm Sunset View' }
  ];

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="section-header flex-between">
          <h2 className="gallery-heading">{t('gallery.title')}</h2>
          <a href="#contact" className="btn-gallery-more">
            {t('gallery.btn')}
          </a>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="gallery-item">
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
