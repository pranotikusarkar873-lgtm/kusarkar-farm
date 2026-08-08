import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <img src="/logo.png" alt="Kusarkar Farm Logo" className="footer-logo-img" />
            <strong>{t('footer.brandName')}</strong>
          </div>
          <p className="footer-tagline">{t('footer.tagline')}</p>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">{t('footer.quickLinks')}</h4>
          <ul className="footer-links">
            <li><a href="#home">{t('nav.home')}</a></li>
            <li><a href="#about">{t('nav.about')}</a></li>
            <li><a href="#products">{t('nav.products')}</a></li>
            <li><a href="#gallery">{t('nav.gallery')}</a></li>
            <li><a href="#contact">{t('nav.contact')}</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">{t('footer.ourProducts')}</h4>
          <ul className="footer-links">
            <li><a href="#products">🥭 {t('prod.mangoTitle')}</a></li>
            <li><a href="#products">🍇 {t('prod.grapesTitle')}</a></li>
            <li><a href="#products">🍈 {t('prod.guavaTitle')}</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">{t('footer.followUs')}</h4>
          <div className="footer-socials">
            <a href="#" className="social-circle">🔵</a>
            <a href="#" className="social-circle">📸</a>
            <a href="#" className="social-circle">▶️</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t('footer.rights')}</p>
      </div>
    </footer>
  );
};
