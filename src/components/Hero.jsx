import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero" id="home">
      <div className="hero-bg-split">
        <div className="hero-bg-left"></div>
        <div className="hero-bg-right">
          <img src="/hero_mockup.png" alt="Kusarkar Farm Vineyard Mockup" className="hero-right-bg-img" />
          <div className="hero-right-overlay"></div>
        </div>
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
        {/* Left Content */}
        <div className="hero-left-content">
          <div className="hero-tag">
            🍃 {t('hero.tag')}
          </div>

          <h1 className="hero-main-title">
            {t('hero.title1')}<br />
            <span className="text-green-hero">{t('hero.title2')}</span>
          </h1>

          <p className="hero-desc">{t('hero.desc')}</p>

          <div className="hero-btn-row">
            <a href="#products" className="btn-explore-hero">
              {t('hero.btnExplore')}
            </a>
            <a href="#contact" className="btn-contact-hero">
              {t('hero.btnContact')}
            </a>
          </div>

          {/* 3 Feature Highlights Row */}
          <div className="hero-features-row">
            <div className="h-feature">
              <div className="hf-icon">🌱</div>
              <div className="hf-text">
                <strong>{t('hero.f1Title')}</strong>
                <small>{t('hero.f1Sub')}</small>
              </div>
            </div>

            <div className="h-feature">
              <div className="hf-icon">🌿</div>
              <div className="hf-text">
                <strong>{t('hero.f2Title')}</strong>
                <small>{t('hero.f2Sub')}</small>
              </div>
            </div>

            <div className="h-feature">
              <div className="hf-icon">🏵️</div>
              <div className="hf-text">
                <strong>{t('hero.f3Title')}</strong>
                <small>{t('hero.f3Sub')}</small>
              </div>
            </div>
          </div>

          <div className="deco-leaf">🍃</div>
        </div>

        {/* Right Visual Floating Fruit Bar */}
        <div className="hero-right-visual">
          <div className="hero-floating-fruit-bar">
            <a href="#products" className="ff-item ff-grapes">
              <div className="ff-img-wrap grapes-wrap">
                <img src="/grapes.png" alt="Grapes" />
              </div>
              <div className="ff-info">
                <h4>{t('ff.grapesTitle')}</h4>
                <p>{t('ff.grapesSub')}</p>
                <span className="ff-link">{t('ff.viewMore')}</span>
              </div>
            </a>

            <a href="#products" className="ff-item ff-mango">
              <div className="ff-img-wrap mango-wrap">
                <img src="/mango.png" alt="Mango" />
              </div>
              <div className="ff-info">
                <h4>{t('ff.mangoTitle')}</h4>
                <p>{t('ff.mangoSub')}</p>
                <span className="ff-link">{t('ff.viewMore')}</span>
              </div>
            </a>

            <a href="#products" className="ff-item ff-guava">
              <div className="ff-img-wrap guava-wrap">
                <img src="/guava.png" alt="Guava" />
              </div>
              <div className="ff-info">
                <h4>{t('ff.guavaTitle')}</h4>
                <p>{t('ff.guavaSub')}</p>
                <span className="ff-link">{t('ff.viewMore')}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
