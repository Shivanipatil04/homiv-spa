import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { Features } from './components/Features';
import { About } from './components/About/About';
import { Services } from './components/Services/Services';
import { MembershipBanner } from './components/MembershipBanner';
import { Gallery } from './components/Gallery/Gallery';
import { Testimonials } from './components/Testimonials/Testimonials';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';

export default function App() {
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
