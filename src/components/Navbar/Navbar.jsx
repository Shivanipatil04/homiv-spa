import React, { useState, useEffect } from 'react';
import { siteData } from '../../data/siteData';
import { images } from '../../data/images';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-8 border-b ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-[#7A1428]/15 shadow-md text-[#5C0E1E]'
          : 'bg-[#FFFDF9]/95 backdrop-blur-sm border-[#7A1428]/10 text-[#5C0E1E]'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative overflow-hidden rounded-lg border border-[#7A1428]/30 bg-white shadow-sm flex items-center justify-center p-0.5">
            <img
              src={images.logo}
              alt="HOMIV Family Lux Spa Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div>
            <span className="block font-serif text-lg sm:text-2xl font-bold tracking-wider text-[#7A1428]">
              HOMIV
            </span>
            <span className="block text-[9px] sm:text-[10px] tracking-[0.25em] text-[#5C0E1E]/80 uppercase font-semibold">
              Family Lux Spa
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-bold text-[#5C0E1E]">
          <a href="#home" className="hover:text-[#9E1B32] transition-colors py-1 relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7A1428] transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#about" className="hover:text-[#9E1B32] transition-colors py-1 relative group">
            About
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7A1428] transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#services" className="hover:text-[#9E1B32] transition-colors py-1 relative group">
            Services
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7A1428] transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#gallery" className="hover:text-[#9E1B32] transition-colors py-1 relative group">
            Gallery
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7A1428] transition-all duration-300 group-hover:w-full" />
          </a>
          <a href="#contact-form" className="hover:text-[#9E1B32] transition-colors py-1 relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#7A1428] transition-all duration-300 group-hover:w-full" />
          </a>
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="text-right hidden xl:block">
            <p className="text-[10px] uppercase text-[#7A1428] tracking-tighter font-semibold">Book via Phone</p>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#2D1217]">
              <a href={`tel:${siteData.phone1}`} className="hover:text-[#7A1428] transition-colors">
                {siteData.phone1}
              </a>
              <span className="text-[#7A1428]/40">|</span>
              <a href={`tel:${siteData.phone2}`} className="hover:text-[#7A1428] transition-colors">
                {siteData.phone2}
              </a>
            </div>
          </div>
          <a
            href="#contact-form"
            className="bg-[#7A1428] text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#5C0E1E] shadow-md transition-all duration-200 active:scale-95"
          >
            Book Appointment
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#5C0E1E] hover:text-[#7A1428] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-[#7A1428]/20 px-6 py-6 space-y-4 shadow-2xl animate-fadeIn z-50">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block text-sm uppercase tracking-widest font-bold text-[#7A1428]">Home</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block text-sm uppercase tracking-widest font-bold text-[#7A1428]">About</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-sm uppercase tracking-widest font-bold text-[#7A1428]">Services</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="block text-sm uppercase tracking-widest font-bold text-[#7A1428]">Gallery</a>
          <a href="#contact-form" onClick={() => setMobileMenuOpen(false)} className="block text-sm uppercase tracking-widest font-bold text-[#7A1428]">Contact</a>
          
          <div className="pt-4 border-t border-[#7A1428]/15 space-y-3">
            <span className="text-[10px] uppercase text-[#7A1428] tracking-widest font-bold block">Direct Call Concierge:</span>
            <div className="flex flex-col gap-2">
              <a href={`tel:${siteData.phone1}`} className="flex items-center gap-2 text-sm font-bold text-[#7A1428] hover:text-[#5C0E1E]">
                <span>📞 {siteData.phone1}</span>
              </a>
              <a href={`tel:${siteData.phone2}`} className="flex items-center gap-2 text-sm font-bold text-[#7A1428] hover:text-[#5C0E1E]">
                <span>📞 {siteData.phone2}</span>
              </a>
            </div>
            <a
              href="#contact-form"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full bg-[#7A1428] text-white py-2.5 rounded-lg text-center block text-xs font-bold uppercase tracking-widest hover:bg-[#5C0E1E] transition-colors"
            >
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
