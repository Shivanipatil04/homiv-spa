import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Features } from './components/sections/Features';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { MembershipBanner } from './components/sections/MembershipBanner';
import { Gallery } from './components/sections/Gallery';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [isAdminPage, setIsAdminPage] = useState(
    window.location.pathname.startsWith('/admin') || window.location.hash === '#admin'
  );
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '');

  useEffect(() => {
    const checkRoute = () => {
      setIsAdminPage(window.location.pathname.startsWith('/admin') || window.location.hash === '#admin');
    };

    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  if (isAdminPage) {
    if (!adminToken) {
      return <AdminLogin onLoginSuccess={(token) => setAdminToken(token)} />;
    }
    return (
      <AdminDashboard
        token={adminToken}
        onLogout={() => {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          setAdminToken('');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D1217] font-sans selection:bg-[#7A1428] selection:text-white">
      <Navbar />
      <Hero />
      <Features />
      <About />
      <Services />
      <MembershipBanner />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
