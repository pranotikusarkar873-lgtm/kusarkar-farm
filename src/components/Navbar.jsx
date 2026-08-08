import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const { lang, toggleLanguage, t } = useLanguage();
  const { cartItemCount, toggleCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ['home', 'products', 'about', 'why-us', 'gallery', 'contact'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(sec);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={closeMenu}>
          <img src="/logo.png" alt="Kusarkar Farm Logo" className="nav-logo-img" />
        </a>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
          <li>
            <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={closeMenu}>
              {t('nav.home')} <span className="nav-dot">.</span>
            </a>
          </li>
          <li>
            <a href="#products" className={`nav-link ${activeSection === 'products' ? 'active' : ''}`} onClick={closeMenu}>
              {t('nav.products')}
            </a>
          </li>
          <li>
            <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={closeMenu}>
              {t('nav.about')}
            </a>
          </li>
          <li>
            <a href="#why-us" className={`nav-link ${activeSection === 'why-us' ? 'active' : ''}`} onClick={closeMenu}>
              {t('nav.whyUs')}
            </a>
          </li>
          <li>
            <a href="#gallery" className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`} onClick={closeMenu}>
              {t('nav.gallery')}
            </a>
          </li>
          <li>
            <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={closeMenu}>
              {t('nav.contact')}
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          <button
            className="btn-lang-toggle"
            onClick={toggleLanguage}
            title="Switch Language / भाषा बदला"
          >
            🌐 <span>{lang === 'en' ? 'मराठी' : 'English'}</span>
          </button>

          <button className="btn-order-now" onClick={toggleCart}>
            <span>{t('nav.orderNow')}</span>
            <span className="cart-badge" id="cartBadge">{cartItemCount}</span>
          </button>

          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};
