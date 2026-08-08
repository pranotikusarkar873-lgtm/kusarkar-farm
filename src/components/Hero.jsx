import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero hero-wide-banner hero-light-shade" id="home">
      <div className="hero-full-bg">
        <img
          src="/kusarkar_wide_banner.jpg"
          alt="Kusarkar Farm Golden Sunset Vineyard Banner"
          className="hero-banner-img"
        />
        <div className="hero-banner-overlay hero-white-shade-overlay"></div>
      </div>

      {/* Floating Fruits Overlay */}
      <div className="floating-fruits" aria-hidden="true">
        <span className="float-item float-1" style={{ '--delay': '0s', '--x': '4%', '--size': '2.4rem' }}>🥭</span>
        <span className="float-item float-2" style={{ '--delay': '1.8s', '--x': '91%', '--size': '2.7rem' }}>🍇</span>
        <span className="float-item float-3" style={{ '--delay': '3.2s', '--x': '48%', '--size': '1.9rem' }}>🍈</span>
        <span className="float-item float-4" style={{ '--delay': '0.9s', '--x': '26%', '--size': '1.6rem' }}>🍃</span>
        <span className="float-item float-5" style={{ '--delay': '2.5s', '--x': '76%', '--size': '2.3rem' }}>🥭</span>
        <span className="float-item float-6" style={{ '--delay': '4.2s', '--x': '14%', '--size': '2.5rem' }}>🍇</span>
      </div>

      <div className="container hero-container">
        {/* Left Content — slides in from left, staggered */}
        <div className="hero-left-content">

          <div className="hero-tag hero-anim-left" style={{ animationDelay: '0.1s' }}>
            🍃 {t('hero.tag')}
          </div>

          <h1 className="hero-main-title hero-anim-left" style={{ animationDelay: '0.3s' }}>
            {t('hero.title1')}<br />
            <span className="text-green-hero">{t('hero.title2')}</span>
          </h1>

          <p className="hero-desc hero-anim-left" style={{ animationDelay: '0.55s' }}>
            {t('hero.desc')}
          </p>

          <div className="hero-btn-row hero-anim-left" style={{ animationDelay: '0.75s' }}>
            <a href="#products" className="btn-explore-hero">
              {t('hero.btnExplore')}
            </a>
            <a href="#contact" className="btn-contact-hero">
              {t('hero.btnContact')}
            </a>
          </div>

          {/* Feature cards — slide in from right, staggered */}
          <div className="hero-features-creative">
            <div className="hf-creative-card hero-anim-right" style={{ animationDelay: '0.9s' }}>
              <div className="hf-creative-icon-wrap icon-sprout">
                <span>🌱</span>
              </div>
              <div className="hf-creative-text">
                <strong>{t('hero.f1Title')}</strong>
                <small>{t('hero.f1Sub')}</small>
              </div>
            </div>

            <div className="hf-creative-card hero-anim-right" style={{ animationDelay: '1.1s' }}>
              <div className="hf-creative-icon-wrap icon-badge">
                <span>🏵️</span>
              </div>
              <div className="hf-creative-text">
                <strong>{t('hero.f3Title')}</strong>
                <small>{t('hero.f3Sub')}</small>
              </div>
            </div>
          </div>

          <div className="deco-leaf">🍃</div>
        </div>
      </div>
    </section>
  );
};
