import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { t } = useLanguage();

  return (
    <section className="about-section" id="about">
      <div className="container about-grid-2col">

        {/* LEFT — text + stats */}
        <div className="about-left">
          <div className="hero-tag tag-about">
            {t('about.tag')}
          </div>
          <h2 className="about-main-heading">
            {t('about.title1')}<br />
            <span className="text-green-hero">{t('about.title2')}</span>
          </h2>
          <p className="about-desc-para">
            {t('about.desc')}
          </p>
          <a href="#contact" className="btn-know-more">
            {t('about.btn')}
          </a>

          {/* Stats row under button */}
          <div className="about-stats-card-2x2">
            <div className="stat-cell">
              <div className="sc-icon">🌱</div>
              <div className="sc-num">15+</div>
              <div className="sc-label">{t('about.stat1')}</div>
            </div>
            <div className="stat-cell">
              <div className="sc-icon">🏵️</div>
              <div className="sc-num">500+</div>
              <div className="sc-label">{t('about.stat2')}</div>
            </div>
            <div className="stat-cell">
              <div className="sc-icon">👨‍🌾</div>
              <div className="sc-num">50+</div>
              <div className="sc-label">{t('about.stat3')}</div>
            </div>
            <div className="stat-cell">
              <div className="sc-icon">🚚</div>
              <div className="sc-num">10K+</div>
              <div className="sc-label">{t('about.stat4')}</div>
            </div>
          </div>
        </div>

        {/* RIGHT — farm image */}
        <div className="about-right">
          <div className="about-video-wrap">
            <img src="/farm.png" alt="Kusarkar Farm View" className="about-video-img" />
            <div className="play-btn-overlay">
              <div className="play-icon-circle">▶</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
