import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero hero-wide-banner" id="home">
      <div className="hero-full-bg">
        <img
          src="/kusarkar_wide_banner.jpg"
          alt="Kusarkar Farm Golden Sunset Vineyard Banner"
          className="hero-banner-img"
        />
        <div className="hero-banner-overlay"></div>
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
        {/* Left Content with Crisp White Text */}
        <div className="hero-left-content hero-white-text">
          <div className="hero-tag hero-tag-glass">
            🍃 {t('hero.tag')}
          </div>

          <h1 className="hero-main-title hero-title-white">
            {t('hero.title1')}<br />
            <span className="text-lime-gold">{t('hero.title2')}</span>
          </h1>

          <p className="hero-desc hero-desc-white">{t('hero.desc')}</p>

          <div className="hero-btn-row">
            <a href="#products" className="btn-explore-hero">
              {t('hero.btnExplore')}
            </a>
            <a href="#contact" className="btn-contact-hero btn-contact-white">
              {t('hero.btnContact')}
            </a>
          </div>

          {/* 3 Feature Highlights Row (White Theme) */}
          <div className="hero-features-row hero-features-white">
            <div className="h-feature">
              <div className="hf-icon hf-icon-glass">🌱</div>
              <div className="hf-text hf-text-white">
                <strong>{t('hero.f1Title')}</strong>
                <small>{t('hero.f1Sub')}</small>
              </div>
            </div>

            <div className="h-feature">
              <div className="hf-icon hf-icon-glass">🌿</div>
              <div className="hf-text hf-text-white">
                <strong>{t('hero.f2Title')}</strong>
                <small>{t('hero.f2Sub')}</small>
              </div>
            </div>

            <div className="h-feature">
              <div className="hf-icon hf-icon-glass">🏵️</div>
              <div className="hf-text hf-text-white">
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
