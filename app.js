/* ===============================================
   KUSARKAR FRUITS – App JavaScript
   =============================================== */

// ---- CART STATE ----
const products = {
  mango: { name: 'Alphonso Mango', emoji: '🥭', price: 80, unit: 'dozen' },
  grapes: { name: 'Black Grapes', emoji: '🍇', price: 60, unit: 'kg' },
  guava: { name: 'Fresh Guava', emoji: '🍈', price: 40, unit: 'kg' },
};

let cart = JSON.parse(localStorage.getItem('kf-cart') || '{}');
let quantities = { mango: 1, grapes: 1, guava: 1 };

// ---- TRANSLATION (i18n) STATE ----
let currentLang = localStorage.getItem('kf-lang') || 'en';

const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.products": "Products",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "nav.orderNow": "Order Now 🛒",
    "hero.tag": "🍃 100% NATURAL & FARM FRESH · TASGAON",
    "hero.title1": "From Our Farm,",
    "hero.title2": "To Your Family",
    "hero.desc": "Premium quality Grapes, Mangoes & Guavas grown naturally with love and care at Kusarkar Farm.",
    "hero.btnExplore": "Explore Products ➔",
    "hero.btnContact": "Contact Us 📞",
    "hero.rating": "500+ Direct Orders",
    "hero.f1Title": "Natural Farming",
    "hero.f1Sub": "Chemical Free",
    "hero.f2Title": "Farm Fresh",
    "hero.f2Sub": "Daily Harvest",
    "hero.f3Title": "Premium Quality",
    "hero.f3Sub": "Best Selection",
    "ff.grapesTitle": "Grapes",
    "ff.grapesSub": "Sweet & Fresh",
    "ff.mangoTitle": "Mango",
    "ff.mangoSub": "Juicy & Natural",
    "ff.guavaTitle": "Guava",
    "ff.guavaSub": "Fresh & Healthy",
    "ff.viewMore": "View More ➔",
    "prod.sectionTitle": "🍃 Our Premium Fruits 🍃",
    "prod.sectionSub": "Handpicked with care, delivered with love",
    "prod.grapes1": "Sweet & Crunchy",
    "prod.grapes2": "Export Quality",
    "prod.grapes3": "Naturally Grown",
    "prod.grapes4": "Rich in Antioxidants",
    "prod.mangoTitle": "Mango",
    "prod.mango1": "Naturally Ripened",
    "prod.mango2": "Juicy & Sweet",
    "prod.mango3": "Premium Quality",
    "prod.mango4": "Seasonal Delight",
    "prod.guavaTitle": "Guava",
    "prod.guava1": "Vitamin C Rich",
    "prod.guava2": "Chemical Free",
    "prod.guava3": "Organic Farming",
    "prod.guava4": "Fresh Harvest",
    "prod.addCart": "Add to Cart 🛒",
    "about.tag": "🍃 ABOUT KUSARKAR FARM",
    "about.title1": "Growing Nature",
    "about.title2": "With Passion",
    "about.desc": "For over 15 years, we have been dedicated to natural farming, producing high-quality fruits with care and love. Our fruits are freshly harvested and delivered straight from our farm to your family.",
    "about.btn": "Know More About Us ➔",
    "about.stat1": "Years Experience",
    "about.stat2": "Happy Customers",
    "about.stat3": "Acres of Farm",
    "about.stat4": "Fruits Delivered",
    "gallery.title": "Our Farm Gallery 🍃",
    "gallery.btn": "View More Photos",
    "why.title": "Why Choose Kusarkar Farm?",
    "why.c1Title": "100% Farm Fresh",
    "why.c1Sub": "Direct From Farm",
    "why.c2Title": "Naturally Grown",
    "why.c2Sub": "Chemical Free",
    "why.c3Title": "Handpicked Fruits",
    "why.c3Sub": "Carefully Selected",
    "why.c4Title": "Premium Quality",
    "why.c4Sub": "Best in Taste",
    "why.c5Title": "Hygienic Packaging",
    "why.c5Sub": "Safe & Clean",
    "why.c6Title": "Direct From Farm",
    "why.c6Sub": "No Middlemen",
    "why.c7Title": "Affordable Price",
    "why.c7Sub": "Best Value",
    "why.c8Title": "Rich Taste",
    "why.c8Sub": "Naturally Sweet",
    "contact.badge": "📍 Get In Touch",
    "contact.title1": "Visit",
    "contact.title2": "Kusarkar Farm – Krushi Samrajya",
    "contact.sub": "Connect with us for farm visits, fresh orders, or bulk inquiries",
    "contact.formTitle": "Send Us A Message",
    "contact.nameLabel": "Your Name *",
    "contact.phoneLabel": "Phone Number *",
    "contact.emailLabel": "Email Address",
    "contact.msgLabel": "Your Requirement / Message",
    "contact.btnSend": "Send Message 💬",
    "contact.farmTag": "तासगाव, जि. सांगली | Direct From Farm",
    "contact.addrTitle": "Farm Address",
    "contact.addrDesc": "Kusarkar Farm – Krushi Samrajya, Tasgaon, Taluka Tasgaon, District Sangli, Maharashtra – 416312",
    "contact.timeTitle": "Visiting & Order Hours",
    "contact.timeDesc": "Mon – Sun: 6:00 AM – 9:00 PM",
    "contact.specTitle": "Farm Specialties",
    "contact.specDesc": "Alphonso Mangoes, Black Grapes & Fresh Guavas",
    "contact.quickConnect": "Quick Connect:",
    "contact.btnCall": "📞 Call Us",
    "contact.btnWa": "💬 WhatsApp",
    "contact.openMaps": "Open Location in Google Maps 📍",
    "footer.tagline": "From Our Farm, To Your Family",
    "footer.quickLinks": "Quick Links",
    "footer.ourProducts": "Our Products",
    "footer.followUs": "Follow Us",
    "footer.rights": "© 2025 Kusarkar Farm. All rights reserved.",
    "cart.title": "🛒 Your Cart",
    "cart.empty": "Your cart is empty",
    "cart.emptySub": "Add some fresh fruits!",
    "cart.subtotal": "Subtotal",
    "cart.delivery": "Delivery",
    "cart.free": "FREE",
    "cart.total": "Total",
    "cart.btnCheckout": "📦 Place Order via WhatsApp",
    "cart.btnClear": "Clear Cart"
  },
  mr: {
    "nav.home": "मुखपृष्ठ",
    "nav.about": "आमच्याबद्दल",
    "nav.products": "उत्पादने",
    "nav.gallery": "गॅलरी",
    "nav.contact": "संपर्क",
    "nav.orderNow": "ऑर्डर करा 🛒",
    "hero.tag": "🍃 १००% नैसर्गिक व फार्म फ्रेश · तासगाव",
    "hero.title1": "आमच्या शेतातून,",
    "hero.title2": "थेट तुमच्या कुटुंबापर्यंत",
    "hero.desc": "कुसरकर फार्ममध्ये प्रेमाने व काळजीने नैसर्गिकरीत्या पिकवलेली उत्तम दर्जाची द्राक्षे, आंबे आणि पेरू.",
    "hero.btnExplore": "उत्पादने पहा ➔",
    "hero.btnContact": "संपर्क साधा 📞",
    "hero.rating": "५००+ थेट ऑर्डर्स",
    "hero.f1Title": "नैसर्गिक शेती",
    "hero.f1Sub": "रासायनिक खतमुक्त",
    "hero.f2Title": "फार्म फ्रेश",
    "hero.f2Sub": "दररोजची काढणी",
    "hero.f3Title": "प्रीमियम गुणवत्ता",
    "hero.f3Sub": "उत्कृष्ट निवड",
    "ff.grapesTitle": "द्राक्षे",
    "ff.grapesSub": "गोड व ताजी",
    "ff.mangoTitle": "आंबा",
    "ff.mangoSub": "रसाळ व नैसर्गिक",
    "ff.guavaTitle": "पेरू",
    "ff.guavaSub": "ताजे व पौष्टिक",
    "ff.viewMore": "अधिक पहा ➔",
    "prod.sectionTitle": "🍃 आमची खास फळे 🍃",
    "prod.sectionSub": "काळजीपूर्वक निवडलेली, प्रेमाने पोहोचवलेली",
    "prod.grapes1": "गोड व कुरकुरीत",
    "prod.grapes2": "एक्सपोर्ट क्वालिटी",
    "prod.grapes3": "नैसर्गिकरीत्या पिकवलेली",
    "prod.grapes4": "अँटीऑक्सिडंट्सने समृद्ध",
    "prod.mangoTitle": "आंबा",
    "prod.mango1": "नैसर्गिक रीतीने पिकवलेले",
    "prod.mango2": "रसाळ व गोड",
    "prod.mango3": "प्रीमियम गुणवत्ता",
    "prod.mango4": "हंगामातील मेजवानी",
    "prod.guavaTitle": "पेरू",
    "prod.guava1": "व्हिटॅमिन सी ने समृद्ध",
    "prod.guava2": "केमिकल फ्री",
    "prod.guava3": "सेंद्रिय शेती",
    "prod.guava4": "ताजी काढणी",
    "prod.addCart": "कार्टमध्ये जोडा 🛒",
    "about.tag": "🍃 कुसरकर फार्मबद्दल",
    "about.title1": "निसर्गाची जपणूक",
    "about.title2": "प्रेमाने व निष्ठेने",
    "about.desc": "गेल्या १५ वर्षांहून अधिक काळ आम्ही नैसर्गिक शेतीसाठी समर्पित आहोत, प्रेमाने व काळजीने उच्च दर्जाची फळे पिकवत आहोत. आमची फळे ताज्या स्वरूपात थेट आमच्या शेतातून तुमच्या घरापर्यंत पोहोचवली जातात.",
    "about.btn": "आमच्याबद्दल अधिक जाणा ➔",
    "about.stat1": "वर्षांचा अनुभव",
    "about.stat2": "आनंदी ग्राहक",
    "about.stat3": "एकरांचे फार्म",
    "about.stat4": "फळांची डिलिव्हरी",
    "gallery.title": "आमची फार्म गॅलरी 🍃",
    "gallery.btn": "अधिक फोटो पहा",
    "why.title": "कुसरकर फार्म का निवडावे?",
    "why.c1Title": "१००% फार्म फ्रेश",
    "why.c1Sub": "थेट शेतातून",
    "why.c2Title": "नैसर्गिकरीत्या पिकवलेले",
    "why.c2Sub": "रसायनमुक्त",
    "why.c3Title": "हाताने निवडलेली फळे",
    "why.c3Sub": "काळजीपूर्वक निवडलेली",
    "why.c4Title": "प्रीमियम गुणवत्ता",
    "why.c4Sub": "उत्कृष्ट चव",
    "why.c5Title": "हायजिनिक पॅकेजिंग",
    "why.c5Sub": "सुरक्षित व स्वच्छ",
    "why.c6Title": "थेट फार्ममधून",
    "why.c6Sub": "मध्यस्थ नाही",
    "why.c7Title": "परवडणारी किंमत",
    "why.c7Sub": "उत्तम मूल्य",
    "why.c8Title": "उत्कृष्ट चव",
    "why.c8Sub": "नैसर्गिकरीत्या गोड",
    "contact.badge": "📍 संपर्क साधा",
    "contact.title1": "भेट द्या",
    "contact.title2": "कुसरकर फार्म - कृषी साम्राज्य",
    "contact.sub": "शेताला भेट देण्यासाठी, ताज्या ऑर्डर्ससाठी किंवा मोठ्या प्रमाणात चौकशीसाठी आमच्याशी संपर्क साधा",
    "contact.formTitle": "आम्हाला मेसेज पाठवा",
    "contact.nameLabel": "तुमचे नाव *",
    "contact.phoneLabel": "मोबाईल नंबर *",
    "contact.emailLabel": "ईमेल पत्ता",
    "contact.msgLabel": "तुमची गरज / मेसेज",
    "contact.btnSend": "मेसेज पाठवा 💬",
    "contact.farmTag": "तासगाव, जि. सांगली | थेट शेतातून",
    "contact.addrTitle": "फार्मचा पत्ता",
    "contact.addrDesc": "कुसरकर फार्म - कृषी साम्राज्य, तासगाव, ता. तासगाव, जि. सांगली, महाराष्ट्र - ४१६३१२",
    "contact.timeTitle": "भेट व ऑर्डर वेळ",
    "contact.timeDesc": "सोम - रवि: सकाळी ६:०० - रात्री ९:००",
    "contact.specTitle": "फार्मची वैशिष्ट्ये",
    "contact.specDesc": "हापूस आंबे, काळी द्राक्षे आणि ताजे पेरू",
    "contact.quickConnect": "झटपट संपर्क:",
    "contact.btnCall": "📞 कॉल करा",
    "contact.btnWa": "💬 व्हॉट्सअ‍ॅप",
    "contact.openMaps": "गूगल मॅप्सवर लोकेशन पहा 📍",
    "footer.tagline": "आमच्या शेतातून, थेट तुमच्या कुटुंबापर्यंत",
    "footer.quickLinks": "जलद लिंक्स",
    "footer.ourProducts": "आमची उत्पादने",
    "footer.followUs": "आम्हाला फॉलो करा",
    "footer.rights": "© २०२५ कुसरकर फार्म. सर्व हक्क राखीव.",
    "cart.title": "🛒 तुमची कार्ट",
    "cart.empty": "तुमची कार्ट रिकामी आहे",
    "cart.emptySub": "काही ताजी फळे जोडा!",
    "cart.subtotal": "सबटोटल",
    "cart.delivery": "डिलिव्हरी",
    "cart.free": "मोफत",
    "cart.total": "एकूण",
    "cart.btnCheckout": "📦 व्हॉट्सअ‍ॅपद्वारे ऑर्डर द्या",
    "cart.btnClear": "कार्ट रिकामी करा"
  }
};

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('kf-lang', lang);

  const langTextBtn = document.getElementById('langText');
  if (langTextBtn) {
    langTextBtn.textContent = lang === 'en' ? 'मराठी' : 'English';
  }

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (key === 'hero.tag') {
        el.innerHTML = `<span class="pulse-dot-live"></span> ${translations[lang][key]}`;
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });
}

function toggleLanguage() {
  const nextLang = currentLang === 'en' ? 'mr' : 'en';
  applyLanguage(nextLang);
  showToast(nextLang === 'mr' ? 'भाषा बदलली: मराठी 🇮🇳' : 'Language Switched: English 🇬🇧');
}

// ---- ON LOAD ----
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAOS();
  initCounters();
  renderCart();
  updateCartBadge();
  applyLanguage(currentLang);
});

// ---- NAVBAR SCROLL ----
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    // active link highlight
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    links.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }, { passive: true });
}

// ---- HAMBURGER ----
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const ham = document.getElementById('hamburger');
  links.classList.toggle('open');
  ham.classList.toggle('open');
}
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}));

// ---- AOS (scroll animations) ----
function initAOS() {
  const items = document.querySelectorAll('[data-aos], .fruit-card, .feature-card, .testimonial-card');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('visible'), delay);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => obs.observe(el));
}

// ---- COUNTER ANIMATION ----
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const dur = 1800;
      const step = Math.ceil(target / (dur / 30));
      let cur = 0;
      const timer = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = cur;
        if (cur >= target) clearInterval(timer);
      }, 30);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(c => obs.observe(c));
}

// ---- QUANTITY CONTROLS ----
function changeQty(id, delta) {
  quantities[id] = Math.max(1, (quantities[id] || 1) + delta);
  const el = document.getElementById('qty-' + id);
  if (el) el.textContent = quantities[id];
}

// ---- ADD TO CART ----
function addToCart(id) {
  const qty = quantities[id] || 1;
  if (!cart[id]) cart[id] = 0;
  cart[id] += qty;
  saveCart();
  renderCart();
  updateCartBadge();
  showToast(`${products[id].emoji} ${products[id].name} × ${qty} added!`);
}

function removeFromCart(id) {
  delete cart[id];
  saveCart();
  renderCart();
  updateCartBadge();
  showToast(`Removed from cart`);
}

function clearCart() {
  cart = {};
  saveCart();
  renderCart();
  updateCartBadge();
  showToast('Cart cleared 🗑️');
}

function saveCart() {
  localStorage.setItem('kf-cart', JSON.stringify(cart));
}

// ---- RENDER CART ----
function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const emptyEl = document.getElementById('cartEmpty');
  const footerEl = document.getElementById('cartFooter');
  const subtotEl = document.getElementById('cartSubtotal');
  const totalEl = document.getElementById('cartTotal');

  const keys = Object.keys(cart).filter(k => cart[k] > 0);

  if (keys.length === 0) {
    emptyEl.style.display = 'block';
    footerEl.style.display = 'none';
    // Remove all cart-item divs
    itemsEl.querySelectorAll('.cart-item').forEach(e => e.remove());
    return;
  }

  emptyEl.style.display = 'none';
  footerEl.style.display = 'flex';

  // rebuild items
  itemsEl.querySelectorAll('.cart-item').forEach(e => e.remove());
  let subtotal = 0;

  keys.forEach(id => {
    const p = products[id];
    const qty = cart[id];
    const lineTotal = p.price * qty;
    subtotal += lineTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.id = 'cart-item-' + id;
    div.innerHTML = `
      <span class="cart-item-emoji">${p.emoji}</span>
      <div class="cart-item-info">
        <strong>${p.name}</strong>
        <small>${qty} × ₹${p.price}/${p.unit}</small>
      </div>
      <span class="cart-item-price">₹${lineTotal}</span>
      <button class="cart-item-remove" onclick="removeFromCart('${id}')" title="Remove">✕</button>
    `;
    itemsEl.appendChild(div);
  });

  subtotEl.textContent = '₹' + subtotal;
  totalEl.textContent = '₹' + subtotal;
}

// ---- BADGE ----
function updateCartBadge() {
  const total = Object.values(cart).reduce((a, b) => a + b, 0);
  const badge = document.getElementById('cartBadge');
  badge.textContent = total;
  badge.classList.remove('bump');
  void badge.offsetWidth; // reflow
  badge.classList.add('bump');
}

// ---- CART TOGGLE ----
function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
  document.body.style.overflow = document.getElementById('cartSidebar').classList.contains('open') ? 'hidden' : '';
}

// ---- PLACE ORDER VIA WHATSAPP ----
function placeOrder() {
  const keys = Object.keys(cart).filter(k => cart[k] > 0);
  if (keys.length === 0) return;

  let msg = '🌿 *Kusarkar Fruits Order*\n\n';
  let total = 0;

  keys.forEach(id => {
    const p = products[id];
    const qty = cart[id];
    const line = p.price * qty;
    total += line;
    msg += `${p.emoji} ${p.name} × ${qty} = ₹${line}\n`;
  });

  msg += `\n💰 *Total: ₹${total}*\n\nPlease confirm my order and share delivery details. Thank you!`;

  const phone = '919421311949';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ---- CONTACT FORM ----
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('nameInput').value.trim();
  const phone = document.getElementById('phoneInput').value.trim();
  const fruit = document.getElementById('fruitSelect').value;
  const msg = document.getElementById('msgInput').value.trim();

  if (!name || !phone) { showToast('⚠️ Please fill name and phone', 'warn'); return; }

  const fruitEmojis = { mango: '🥭', grapes: '🍇', guava: '🍈', all: '🌿', '': '🍎' };
  const emoji = fruitEmojis[fruit] || '🍎';
  const fruitLabel = fruit ? fruit.charAt(0).toUpperCase() + fruit.slice(1) : 'Not specified';

  const waMsg = `${emoji} *New Enquiry from Website*\n\n` +
    `👤 Name: ${name}\n📞 Phone: ${phone}\n🍎 Interested in: ${fruitLabel}\n\n💬 Message:\n${msg || 'No message'}`;
  const url = `https://wa.me/919421311949?text=${encodeURIComponent(waMsg)}`;
  window.open(url, '_blank');

  showToast('✅ Opening WhatsApp to send your message!');
  e.target.reset();
}

// ---- TOAST ----
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}
