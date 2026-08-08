import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { AnimatedTitle } from './AnimatedTitle';

export const Contact = () => {
  const { t } = useLanguage();
  const { showToast } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      showToast('⚠️ Please fill name and phone number', 'warn');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send message via Node.js Backend API
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success && data.whatsappUrl) {
        window.open(data.whatsappUrl, '_blank');
        showToast('✅ Message sent! Opening WhatsApp...');
        setFormData({ name: '', phone: '', email: '', message: '' });
      } else {
        throw new Error(data.error || 'Failed to submit form');
      }
    } catch (err) {
      // Direct Fallback
      const farmerPhone = '919421311949';
      const waMsg = `🌿 *New Website Enquiry*\n\n👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}\n✉️ Email: ${formData.email || 'None'}\n\n💬 Message:\n${formData.message || 'No message'}`;
      window.open(`https://wa.me/${farmerPhone}?text=${encodeURIComponent(waMsg)}`, '_blank');
      showToast('✅ Opening WhatsApp to send your enquiry!');
      setFormData({ name: '', phone: '', email: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-heading-block section-heading-block--in">
          <span className="shb-eyebrow">{t('contact.badge')}</span>
          <h2 className="shb-title">
            {t('contact.title1')} <span className="text-green-hero">{t('contact.title2')}</span>
          </h2>
          <div className="shb-underline" />
          <p className="shb-subtitle">{t('contact.sub')}</p>
        </div>

        <div className="contact-grid">
          {/* Left: Form Card */}
          <div className="contact-form-card">
            <div className="form-header">
              <span className="form-icon-header">📩</span>
              <h3 className="contact-form-title">{t('contact.formTitle')}</h3>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label htmlFor="name">{t('contact.nameLabel')}</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Ramesh Shinde"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="phone">{t('contact.phoneLabel')}</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 94213 11949"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">{t('contact.emailLabel')}</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="yourname@gmail.com"
                />
              </div>

              <div className="form-field">
                <label htmlFor="message">{t('contact.msgLabel')}</label>
                <textarea
                  id="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what fruits or quantity you need..."
                ></textarea>
              </div>

              <button type="submit" className="btn-send-msg" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : t('contact.btnSend')}
              </button>
            </form>
          </div>

          {/* Middle: Farm Details Card */}
          <div className="visit-info-card">
            <div className="farm-brand-header">
              <span className="fb-badge">🍇 Krushi Samrajya</span>
              <h3 className="farm-name-heading">Kusarkar Farm</h3>
              <p className="farm-tagline">{t('contact.farmTag')}</p>
            </div>

            <div className="farm-details-list">
              <div className="farm-detail-item">
                <div className="fd-icon-box">📍</div>
                <div className="fd-text">
                  <strong>{t('contact.addrTitle')}</strong>
                  <p>{t('contact.addrDesc')}</p>
                </div>
              </div>

              <div className="farm-detail-item">
                <div className="fd-icon-box">⏰</div>
                <div className="fd-text">
                  <strong>{t('contact.timeTitle')}</strong>
                  <p>{t('contact.timeDesc')}</p>
                </div>
              </div>

              <div className="farm-detail-item">
                <div className="fd-icon-box">🍇</div>
                <div className="fd-text">
                  <strong>{t('contact.specTitle')}</strong>
                  <p>{t('contact.specDesc')}</p>
                </div>
              </div>
            </div>

            <div className="connect-box">
              <p className="connect-label">{t('contact.quickConnect')}</p>
              <div className="connect-btns">
                <a href="tel:+919421311949" className="btn-connect call">{t('contact.btnCall')}</a>
                <a href="https://wa.me/919421311949" target="_blank" rel="noreferrer" className="btn-connect whatsapp">{t('contact.btnWa')}</a>
              </div>
            </div>
          </div>

          {/* Right: Map Card */}
          <div className="map-card-wrapper">
            <div className="map-top-banner">
              <span className="live-pin-pulse"></span>
              <div className="map-banner-text">
                <strong>Kusarkar Farm – Krushi Samrajya</strong>
                <small>📍 Tasgaon, Taluka Tasgaon, Dist. Sangli</small>
              </div>
            </div>

            <iframe
              title="Kusarkar Krushi Samrajya Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3814.360155554668!2d74.5695794760205!3d17.057054912282216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1150007cefb27%3A0xd794cba396dbc17!2sKusarkar%20Krushi%20Samrajya!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px', borderRadius: '0 0 20px 20px' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>

            <a
              href="https://www.google.com/maps/place/Kusarkar+Krushi+Samrajya/@17.05705,74.5721544,833m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3bc1150007cefb27:0xd794cba396dbc17!8m2!3d17.05705!4d74.5721544"
              target="_blank"
              rel="noreferrer"
              className="btn-open-maps"
            >
              {t('contact.openMaps')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
