import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const WhyChooseUs = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: '🌿', titleKey: 'why.c1Title', subKey: 'why.c1Sub', color: '#2d6a4f', bg: 'rgba(45,106,79,0.08)' },
    { icon: '🍃', titleKey: 'why.c2Title', subKey: 'why.c2Sub', color: '#40916c', bg: 'rgba(64,145,108,0.08)' },
    { icon: '🍇', titleKey: 'why.c3Title', subKey: 'why.c3Sub', color: '#6f42c1', bg: 'rgba(111,66,193,0.08)' },
    { icon: '🏵️', titleKey: 'why.c4Title', subKey: 'why.c4Sub', color: '#d4a017', bg: 'rgba(212,160,23,0.08)' },
    { icon: '📦', titleKey: 'why.c5Title', subKey: 'why.c5Sub', color: '#e76f51', bg: 'rgba(231,111,81,0.08)' },
    { icon: '👨‍🌾', titleKey: 'why.c6Title', subKey: 'why.c6Sub', color: '#52b788', bg: 'rgba(82,183,136,0.08)' },
    { icon: '🏷️', titleKey: 'why.c7Title', subKey: 'why.c7Sub', color: '#f4a261', bg: 'rgba(244,162,97,0.08)' },
    { icon: '✨', titleKey: 'why.c8Title', subKey: 'why.c8Sub', color: '#74c69d', bg: 'rgba(116,198,157,0.08)' },
  ];

  return (
    <section className="why-choose-section" id="why-us" ref={sectionRef}>

      {/* Background decorative blobs */}
      <div className="why-bg-blob why-blob-1" aria-hidden="true" />
      <div className="why-bg-blob why-blob-2" aria-hidden="true" />

      <div className="container">

        <div className={`section-heading-block ${visible ? 'section-heading-block--in' : ''}`}>
          <span className="shb-eyebrow">🌿 WHY US</span>
          <h2 className="shb-title">{t('why.title')}</h2>
          <div className="shb-underline" />
        </div>

        <div className="why-cards-grid">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className={`why-feat-card ${visible ? 'why-feat-card--in' : ''}`}
              style={{
                transitionDelay: visible ? `${0.08 + idx * 0.09}s` : '0s',
                '--card-color': feat.color,
                '--card-bg': feat.bg,
              }}
            >
              {/* Top accent bar */}
              <div className="why-card-accent-bar" />

              {/* Icon */}
              <div className="why-card-icon-wrap">
                <span className="why-card-icon">{feat.icon}</span>
                <div className="why-card-icon-ring" />
              </div>

              {/* Text */}
              <strong className="why-card-title">{t(feat.titleKey)}</strong>
              <span className="why-card-sub">{t(feat.subKey)}</span>

              {/* Hover glow */}
              <div className="why-card-glow" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
