import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { AnimatedTitle } from './AnimatedTitle';

export const Contact = () => {
  const { lang, t } = useLanguage();
  const { showToast } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isMr = lang === 'mr';

  const validateField = (field, value) => {
    let err = '';
    const trimmed = (value || '').trim();

    if (field === 'name') {
      if (!trimmed) {
        err = isMr ? 'कृपया तुमचे नाव प्रविष्ट करा' : 'Please enter your name';
      } else if (trimmed.length < 2) {
        err = isMr ? 'नाव किमान २ अक्षरांचे असावे' : 'Name must be at least 2 characters';
      } else if (/^\d+$/.test(trimmed)) {
        err = isMr ? 'नावात फक्त अंक नसावेत' : 'Name cannot be numbers only';
      }
    }

    if (field === 'phone') {
      const cleanPhone = trimmed.replace(/[\s\-\+\(\)]/g, '');
      if (!cleanPhone) {
        err = isMr ? 'कृपया मोबाईल नंबर प्रविष्ट करा' : 'Please enter mobile number';
      } else if (!/^[6-9]\d{9}$/.test(cleanPhone) && !/^\d{10}$/.test(cleanPhone)) {
        err = isMr ? 'कृपया १०-अंकी वैध मोबाईल नंबर प्रविष्ट करा (उदा. 9823456789)' : 'Please enter a valid 10-digit mobile number';
      }
    }

    if (field === 'email' && trimmed) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) {
        err = isMr ? 'कृपया वैध ईमेल पत्ता प्रविष्ट करा (उदा. name@gmail.com)' : 'Please enter a valid email address';
      }
    }

    if (field === 'message') {
      if (!trimmed) {
        err = isMr ? 'कृपया तुमचा मेसेज प्रविष्ट करा' : 'Please enter your message';
      } else if (trimmed.length < 5) {
        err = isMr ? 'मेसेज किमान ५ अक्षरांचा असावा' : 'Message must be at least 5 characters';
      }
    }

    return err;
  };

  const validateAll = () => {
    const newErrors = {};
    ['name', 'phone', 'email', 'message'].forEach(f => {
      const err = validateField(f, formData[f]);
      if (err) newErrors[f] = err;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    if (touched[id]) {
      const err = validateField(id, value);
      setErrors(prev => ({ ...prev, [id]: err }));
    }
  };

  const handleBlur = (e) => {
    const { id, value } = e.target;
    setTouched(prev => ({ ...prev, [id]: true }));
    const err = validateField(id, value);
    setErrors(prev => ({ ...prev, [id]: err }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({ name: true, phone: true, email: true, message: true });

    if (!validateAll()) {
      showToast(isMr ? '⚠️ फॉर्ममध्ये काही चुका आहेत. कृपया त्या दुरुस्त करा.' : '⚠️ Please correct the errors in the form', 'warn');
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
        showToast(isMr ? '✅ मेसेज पाठवला! व्हॉट्सअ‍ॅप उघडत आहे...' : '✅ Message sent! Opening WhatsApp...');
        setFormData({ name: '', phone: '', email: '', message: '' });
        setErrors({});
        setTouched({});
      } else {
        throw new Error(data.error || 'Failed to submit form');
      }
    } catch (err) {
      // Direct Fallback
      const farmerPhone = '919421311949';
      const waMsg = `🌿 *New Website Enquiry*\n\n👤 Name: ${formData.name}\n📞 Phone: ${formData.phone}\n✉️ Email: ${formData.email || 'None'}\n\n💬 Message:\n${formData.message}`;
      window.open(`https://wa.me/${farmerPhone}?text=${encodeURIComponent(waMsg)}`, '_blank');
      showToast(isMr ? '✅ मेसेज पाठवण्यासाठी व्हॉट्सअ‍ॅप उघडत आहे!' : '✅ Opening WhatsApp to send your enquiry!');
      setFormData({ name: '', phone: '', email: '', message: '' });
      setErrors({});
      setTouched({});
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

            <form onSubmit={handleSubmit} noValidate>
              <div className={`form-field ${errors.name && touched.name ? 'form-field-invalid' : ''}`}>
                <label htmlFor="name">{t('contact.nameLabel')}</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Ramesh Shinde"
                  className={errors.name && touched.name ? 'input-error' : ''}
                />
                {errors.name && touched.name && (
                  <span className="form-error-msg">⚠️ {errors.name}</span>
                )}
              </div>

              <div className={`form-field ${errors.phone && touched.phone ? 'form-field-invalid' : ''}`}>
                <label htmlFor="phone">{t('contact.phoneLabel')}</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+91 94213 11949"
                  className={errors.phone && touched.phone ? 'input-error' : ''}
                />
                {errors.phone && touched.phone && (
                  <span className="form-error-msg">⚠️ {errors.phone}</span>
                )}
              </div>

              <div className={`form-field ${errors.email && touched.email ? 'form-field-invalid' : ''}`}>
                <label htmlFor="email">{t('contact.emailLabel')}</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="yourname@gmail.com"
                  className={errors.email && touched.email ? 'input-error' : ''}
                />
                {errors.email && touched.email && (
                  <span className="form-error-msg">⚠️ {errors.email}</span>
                )}
              </div>

              <div className={`form-field ${errors.message && touched.message ? 'form-field-invalid' : ''}`}>
                <label htmlFor="message">{t('contact.msgLabel')}</label>
                <textarea
                  id="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={t('contact.msgPlaceholder')}
                  className={errors.message && touched.message ? 'input-error' : ''}
                ></textarea>
                {errors.message && touched.message && (
                  <span className="form-error-msg">⚠️ {errors.message}</span>
                )}
              </div>

              <button type="submit" className="btn-send-msg" disabled={isSubmitting}>
                {isSubmitting ? (isMr ? 'पाठवत आहे...' : 'Sending...') : t('contact.btnSend')}
              </button>
            </form>
          </div>

          {/* Middle: Farm Details Card */}
          <div className="visit-info-card">
            <div className="farm-brand-header">
              <span className="fb-badge">{t('contact.krushiBadge')}</span>
              <h3 className="farm-name-heading">{t('contact.farmHeading')}</h3>
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
                <strong>{t('contact.mapHeading')}</strong>
                <small>{t('contact.mapSub')}</small>
              </div>
            </div>

            <iframe
              title="Kusarkar Farm Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3814.360155554668!2d74.5695794760205!3d17.057054912282216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1150007cefb27%3A0xd794cba396dbc17!2sKusarkar%20Krushi%20Samrajya!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px', borderRadius: '0 0 20px 20px' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>

            <div className="map-btn-row">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=17.0570549,74.5695794"
                target="_blank"
                rel="noreferrer"
                className="btn-get-directions"
              >
                {t('contact.getDirections')}
              </a>
              <a
                href="https://www.google.com/maps/place/Kusarkar+Krushi+Samrajya/@17.0570549,74.5695794,17z"
                target="_blank"
                rel="noreferrer"
                className="btn-open-maps"
              >
                {t('contact.openMaps')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
