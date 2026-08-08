import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const UserInfoModal = ({ onSave }) => {
  const { lang } = useLanguage();
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = lang === 'mr' ? 'नाव आवश्यक आहे' : 'Name is required';
    }
    if (!mobile.trim()) {
      newErrors.mobile = lang === 'mr' ? 'मोबाईल नंबर आवश्यक आहे' : 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(mobile.trim())) {
      newErrors.mobile = lang === 'mr' ? 'वैध १० अंकी मोबाईल नंबर टाका' : 'Enter a valid 10-digit mobile number';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSave({ name: name.trim(), mobile: mobile.trim() });
  };

  return (
    <div className="user-modal-overlay">
      <div className="user-modal">
        <div className="user-modal-header">
          <span className="user-modal-icon">🌿</span>
          <h2 className="user-modal-title">
            {lang === 'mr' ? 'तुमची माहिती द्या' : 'Your Details'}
          </h2>
          <p className="user-modal-sub">
            {lang === 'mr'
              ? 'ऑर्डर पाठवण्यासाठी नाव व मोबाईल नंबर एकदाच टाका — पुढच्या वेळी आपोआप भरला जाईल.'
              : 'Enter your name & mobile once — it will be remembered for all future orders.'}
          </p>
        </div>

        <form className="user-modal-form" onSubmit={handleSubmit} noValidate>
          <div className="uform-group">
            <label className="uform-label">
              {lang === 'mr' ? '👤 पूर्ण नाव *' : '👤 Full Name *'}
            </label>
            <input
              type="text"
              className={`uform-input ${errors.name ? 'uform-input-error' : ''}`}
              placeholder={lang === 'mr' ? 'उदा. राजेश पाटील' : 'e.g. Rajesh Patil'}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
              }}
              autoFocus
            />
            {errors.name && <span className="uform-error">{errors.name}</span>}
          </div>

          <div className="uform-group">
            <label className="uform-label">
              {lang === 'mr' ? '📞 मोबाईल नंबर *' : '📞 Mobile Number *'}
            </label>
            <input
              type="tel"
              className={`uform-input ${errors.mobile ? 'uform-input-error' : ''}`}
              placeholder={lang === 'mr' ? 'उदा. 9876543210' : 'e.g. 9876543210'}
              value={mobile}
              maxLength={10}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setMobile(val);
                if (errors.mobile) setErrors(prev => ({ ...prev, mobile: '' }));
              }}
            />
            {errors.mobile && <span className="uform-error">{errors.mobile}</span>}
          </div>

          <button type="submit" className="uform-btn">
            {lang === 'mr' ? '✅ जतन करा व पुढे जा' : '✅ Save & Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};
