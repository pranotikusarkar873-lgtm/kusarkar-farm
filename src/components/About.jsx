import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Animated counter
const CountUp = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 1800, stepTime = 16;
    const steps = Math.ceil(duration / stepTime);
    const increment = target / steps;
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const current = Math.min(Math.round(increment * frame), target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [started, target]);

  const display = target >= 1000
    ? `${(count / 1000).toFixed(count < target ? 1 : 0).replace('.0', '')}K`
    : count;

  return <span ref={ref}>{display}{suffix}</span>;
};

export const About = () => {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: '🌱', target: 15, suffix: '+', labelKey: 'about.stat1' },
    { icon: '🏵️', target: 500, suffix: '+', labelKey: 'about.stat2' },
    { icon: '👨‍🌾', target: 50, suffix: '+', labelKey: 'about.stat3' },
    { icon: '🚚', target: 10000, suffix: '+', labelKey: 'about.stat4' },
  ];

  return (
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="container">

        {/* ── Centred Section Heading ── */}
        <div className={`section-heading-block ${visible ? 'section-heading-block--in' : ''}`}>
          <span className="shb-eyebrow">{t('about.eyebrow')}</span>
          <h2 className="shb-title">{t('about.titleMain1')} <span className="text-green-hero">{t('about.titleMain2')}</span></h2>
          <div className="shb-underline" />
        </div>

        {/* ── Two-column body ── */}
        <div className="about-grid-2col">

          {/* LEFT — text content */}
          <div className="about-left">

            <p
              className={`about-desc-para about-anim-left ${visible ? 'about-anim--in' : ''}`}
              style={{ transitionDelay: '0.25s' }}
            >
              {t('about.desc')}
            </p>

            <p
              className={`about-desc-para about-anim-left ${visible ? 'about-anim--in' : ''}`}
              style={{ transitionDelay: '0.4s', marginTop: '0.85rem' }}
            >
              {t('about.desc2')}
            </p>

            <div
              className={`about-highlights-list about-anim-left ${visible ? 'about-anim--in' : ''}`}
              style={{ transitionDelay: '0.55s', marginTop: '1.2rem' }}
            >
              <div className="about-hl-item">
                <span className="hl-icon">🌿</span>
                <span>{t('about.hl1')}</span>
              </div>
              <div className="about-hl-item">
                <span className="hl-icon">🍇</span>
                <span>{t('about.hl2')}</span>
              </div>
              <div className="about-hl-item">
                <span className="hl-icon">🚚</span>
                <span>{t('about.hl3')}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — stats cards */}
          <div className="about-right">
            <div className="about-stats-creative">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className={`stat-creative-card stat-card-${idx} ${visible ? 'stat-card--visible' : ''}`}
                  style={{ transitionDelay: `${0.65 + idx * 0.15}s` }}
                >
                  <div className="stat-card-glow" />
                  <div className="stat-card-inner">
                    <div className="stat-icon-ring">
                      <span className="stat-icon-emoji">{s.icon}</span>
                      <div className="stat-icon-pulse" />
                    </div>
                    <div className="stat-card-content">
                      <div className="stat-big-num">
                        <CountUp target={s.target} suffix={s.suffix} />
                      </div>
                      <div className="stat-card-label">{t(s.labelKey)}</div>
                      <div className="stat-shimmer-bar" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
