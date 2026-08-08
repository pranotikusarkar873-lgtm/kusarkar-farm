import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Farm Products Data Store
const products = [
  {
    id: 'grapes',
    name: 'Black Grapes',
    marathiName: 'काळी द्राक्षे',
    emoji: '🍇',
    image: '/grapes.png',
    price: 60,
    unit: 'kg',
    bgClass: 'card-grapes-bg',
    titleClass: 'green-t',
    btnClass: 'green-btn',
    featuresEn: ['Sweet & Crunchy', 'Export Quality', 'Naturally Grown', 'Rich in Antioxidants'],
    featuresMr: ['गोड व कुरकुरीत', 'एक्सपोर्ट क्वालिटी', 'नैसर्गिकरीत्या पिकवलेली', 'अँटीऑक्सिडंट्सने समृद्ध']
  },
  {
    id: 'mango',
    name: 'Alphonso Mango',
    marathiName: 'हापूस आंबा',
    emoji: '🥭',
    image: '/mango.png',
    price: 80,
    unit: 'dozen',
    bgClass: 'card-mango-bg',
    titleClass: 'orange-t',
    btnClass: 'orange-btn',
    featuresEn: ['Naturally Ripened', 'Juicy & Sweet', 'Premium Quality', 'Seasonal Delight'],
    featuresMr: ['नैसर्गिक रीतीने पिकवलेले', 'रसाळ व गोड', 'प्रीमियम गुणवत्ता', 'हंगामातील मेजवानी']
  },
  {
    id: 'guava',
    name: 'Fresh Guava',
    marathiName: 'ताजे पेरू',
    emoji: '🍈',
    image: '/guava.png',
    price: 40,
    unit: 'kg',
    bgClass: 'card-guava-bg',
    titleClass: 'bright-green-t',
    btnClass: 'bright-green-btn',
    featuresEn: ['Vitamin C Rich', 'Chemical Free', 'Organic Farming', 'Fresh Harvest'],
    featuresMr: ['व्हिटॅमिन सी ने समृद्ध', 'केमिकल फ्री', 'सेंद्रिय शेती', 'ताजी काढणी']
  }
];

// ---- API ENDPOINTS ----

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Kusarkar Farm Backend API is running smoothly 🌿' });
});

// Get Products
app.get('/api/products', (req, res) => {
  res.json({ success: true, products });
});

// Contact Form Submission Handler
app.post('/api/contact', (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, error: 'Name and Phone are required' });
  }

  const farmerPhone = '919421311949';
  const waMsg = `🌿 *New Website Enquiry - Kusarkar Farm*\n\n` +
    `👤 *Name:* ${name}\n` +
    `📞 *Phone:* ${phone}\n` +
    `✉️ *Email:* ${email || 'Not provided'}\n\n` +
    `💬 *Message:* ${message || 'General Enquiry'}`;

  const whatsappUrl = `https://wa.me/${farmerPhone}?text=${encodeURIComponent(waMsg)}`;

  res.json({
    success: true,
    message: 'Enquiry received successfully! Opening WhatsApp...',
    whatsappUrl
  });
});

// Order Placement Handler
app.post('/api/orders', (req, res) => {
  const { items, user } = req.body; // { mango: 2, grapes: 1 }, { name, mobile }

  if (!items || Object.keys(items).length === 0) {
    return res.status(400).json({ success: false, error: 'Cart is empty' });
  }

  let total = 0;
  let orderSummary = '🌿 *Kusarkar Farm Order*\n\n';

  // Include customer info if provided
  if (user && user.name) {
    orderSummary += `👤 *Customer:* ${user.name}\n`;
    orderSummary += `📞 *Mobile:* ${user.mobile}\n\n`;
  }

  Object.keys(items).forEach(id => {
    const qty = items[id];
    const item = products.find(p => p.id === id);
    if (item && qty > 0) {
      const lineTotal = item.price * qty;
      total += lineTotal;
      orderSummary += `${item.emoji} ${item.name} × ${qty} (${item.unit}) = ₹${lineTotal}\n`;
    }
  });

  orderSummary += `\n💰 *Total Amount: ₹${total}*\n📍 Delivery Location: Tasgaon, Sangli\n\nPlease confirm my order and delivery details. Thank you!`;

  const farmerPhone = '919421311949';
  const whatsappUrl = `https://wa.me/${farmerPhone}?text=${encodeURIComponent(orderSummary)}`;

  res.json({
    success: true,
    total,
    whatsappUrl
  });
});

app.listen(PORT, () => {
  console.log(`🌿 Kusarkar Farm Node.js API Server running at http://localhost:${PORT}`);
});
