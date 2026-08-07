import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const WhyChooseUs = () => {
  const { t } = useLanguage();

  const features = [
    { icon: '🌿', titleKey: 'why.c1Title', subKey: 'why.c1Sub' },
    { icon: '🍃', titleKey: 'why.c2Title', subKey: 'why.c2Sub' },
    { icon: '🍇', titleKey: 'why.c3Title', subKey: 'why.c3Sub' },
    { icon: '🏵️', titleKey: 'why.c4Title', subKey: 'why.c4Sub' },
    { icon: '📦', titleKey: 'why.c5Title', subKey: 'why.c5Sub' },
    { icon: '👨‍🌾', titleKey: 'why.c6Title', subKey: 'why.c6Sub' },
    { icon: '🏷️', titleKey: 'why.c7Title', subKey: 'why.c7Sub' },
    { icon: '✨', titleKey: 'why.c8Title', subKey: 'why.c8Sub' }
  ];

  return (
    <section className="why-choose-section" id="why-us">
      <div className="container">
        <div className="why-choose-header">
          <span className="header-line"></span>
          <h2 className="why-choose-title">{t('why.title')}</h2>
          <span className="header-line"></span>
        </div>

        <div className="why-choose-grid">
          {features.map((feat, idx) => (
            <div key={idx} className="why-choose-card">
              <div className="w-icon">{feat.icon}</div>
              <strong className="w-title">{t(feat.titleKey)}</strong>
              <span className="w-sub">{t(feat.subKey)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
