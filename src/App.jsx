import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CartSidebar } from './components/CartSidebar';
import { UserInfoModal } from './components/UserInfoModal';
import { StickyMobileOrderBtn } from './components/StickyMobileOrderBtn';

const ToastContainer = () => {
  const { toast } = useCart();
  if (!toast) return null;

  return (
    <div className="toast-container" id="toastContainer">
      <div className={`toast ${toast.type || 'success'}`}>
        {toast.message}
      </div>
    </div>
  );
};

const UserModalGlobal = () => {
  const { showUserModal, saveUserInfo } = useCart();
  if (!showUserModal) return null;
  return <UserInfoModal onSave={saveUserInfo} />;
};

function MainApp() {
  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Hero />
        <Products />
        <About />
        <Gallery />
        <WhyChooseUs />
        <Contact />
      </main>
      <Footer />
      <CartSidebar />
      <StickyMobileOrderBtn />
      <ToastContainer />
      <UserModalGlobal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </LanguageProvider>
  );
}
