import React, { useState, useEffect } from 'react';
import { ScrollReveal } from '../common/ScrollReveal';
import { siteData } from '../../data/siteData';
import { images } from '../../data/images';

export const Hero = () => {
  const [heroSlides, setHeroSlides] = useState([]);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    fetch('/api/hero')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setHeroSlides(
            data.map((item) => ({
              id: item._id,
              title: item.title,
              subtitle: item.subtitle,
              url: item.image,
            }))
          );
        } else {
          setHeroSlides(
            siteData.heroSlides.map((slide, idx) => ({
              ...slide,
              url: images.hero[idx]?.url,
            }))
          );
        }
      })
      .catch(() => {
        setHeroSlides(
          siteData.heroSlides.map((slide, idx) => ({
            ...slide,
            url: images.hero[idx]?.url,
          }))
        );
      });
  }, []);

  const totalSlides = heroSlides.length || siteData.heroSlides.length;

  useEffect(() => {
    if (totalSlides === 0) return;
    const slideInterval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % totalSlides);
    }, 4500);
    return () => clearInterval(slideInterval);
  }, [totalSlides]);

  const handleImageError = (e, fallback) => {
    e.target.onerror = null;
    e.target.src = fallback;
  };

  const activeSlides = heroSlides.length > 0
    ? heroSlides
    : siteData.heroSlides.map((slide, idx) => ({ ...slide, url: images.hero[idx]?.url }));

  return (
    <section id="home" className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-8 border-b border-[#7A1428]/15 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#F4ECE1] overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col items-center">

        {/* 1. LARGE SPA IMAGE SLIDESHOW */}
        <ScrollReveal className="w-full relative">
          <div className="relative w-full h-[45vh] sm:h-[50vh] lg:h-[500px] min-h-[280px] rounded-2xl overflow-hidden border-2 border-[#C9A24B]/40 shadow-2xl bg-gray-900 group">
            {activeSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
              >
                <img
                  src={slide.url}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center block max-w-full"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  onError={(e) => handleImageError(e, images.about.main)}
                />

                {/* Subtle caption pill at bottom left */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs sm:text-sm font-medium">
                  <span className="font-serif text-[#F3E5AB] font-bold mr-1.5">HOMIV</span>
                  <span className="hidden sm:inline text-white/80">• {slide.title}</span>
                </div>
              </div>
            ))}

            {/* Manual Navigation Arrows */}
            <button
              onClick={() => setCurrentHeroSlide(prev => (prev - 1 + activeSlides.length) % activeSlides.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-[#7A1428] text-white border border-white/30 flex items-center justify-center transition-all focus:outline-none active:scale-95 text-xl font-bold"
              aria-label="Previous Slide"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentHeroSlide(prev => (prev + 1) % activeSlides.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-[#7A1428] text-white border border-white/30 flex items-center justify-center transition-all focus:outline-none active:scale-95 text-xl font-bold"
              aria-label="Next Slide"
            >
              ›
            </button>
          </div>

          {/* 2. SLIDESHOW INDICATORS / PAGINATION */}
          <div className="flex items-center justify-center gap-2 mt-4 mb-8">
            {activeSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentHeroSlide(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentHeroSlide ? 'w-8 bg-[#7A1428]' : 'w-2.5 bg-[#7A1428]/30 hover:bg-[#7A1428]/60'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* 3. HERO TEXT (Positioned BELOW the slideshow image) */}
        <ScrollReveal delay={150} className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2.5 mb-3 px-3.5 py-1 rounded-full bg-[#7A1428]/10 border border-[#7A1428]/20">
            <span className="w-2 h-2 rounded-full bg-[#7A1428]" />
            <span className="text-[#7A1428] uppercase tracking-[0.25em] text-[11px] font-bold">
              The Sanctuary of Wellness
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight font-bold text-[#5C0E1E] mb-4">
            Welcome to <br />
            <span className="text-[#7A1428] font-display font-bold text-3xl sm:text-4xl md:text-5xl text-gold-gradient block mt-2 tracking-wide">
              HOMIV Family Lux Spa
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#3D2226] leading-relaxed font-normal mb-8 max-w-2xl mx-auto">
            Ancient healing traditions meet modern luxury. Your family's sanctuary of tranquility in Mumbai.
          </p>

          {/* 4. CTA BUTTONS WITH BOTH PHONE NUMBERS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10 w-full max-w-lg mx-auto">
            <a
              href="#contact-form"
              className="w-full sm:w-auto bg-[#7A1428] text-white px-8 py-3.5 rounded-md font-bold uppercase text-xs tracking-widest hover:bg-[#5C0E1E] transition-all duration-300 shadow-lg text-center"
            >
              Book Appointment
            </a>

            {/* Separate Clickable Call Links for Both Numbers */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2 bg-white px-4 py-2.5 rounded-md border-2 border-[#7A1428]/30 shadow-sm text-xs">
              <span className="font-bold text-[#7A1428] uppercase tracking-wider">Call Concierge:</span>
              <div className="flex items-center gap-2 font-bold">
                <a
                  href={`tel:${siteData.phone1}`}
                  className="text-[#5C0E1E] hover:text-[#7A1428] transition-colors underline decoration-[#C9A24B]"
                  title="Call 8169085005"
                >
                  8169085005
                </a>
                <span className="text-[#7A1428]/40">|</span>
                <a
                  href={`tel:${siteData.phone2}`}
                  className="text-[#5C0E1E] hover:text-[#7A1428] transition-colors underline decoration-[#C9A24B]"
                  title="Call 8169985005"
                >
                  8169985005
                </a>
              </div>
            </div>
          </div>

          {/* 5. TRUST BADGES */}
          <div className="pt-6 border-t border-[#7A1428]/20 flex flex-wrap justify-center gap-6 sm:gap-12 items-center text-left">
            <div className="flex items-center gap-3">
              <span className="text-xl">✨</span>
              <div className="flex flex-col">
                <span className="text-xs text-[#7A1428] uppercase tracking-widest font-bold">Certified</span>
                <span className="text-sm font-serif italic text-[#2D1217] font-semibold">Top Therapists</span>
              </div>
            </div>
            <div className="w-px h-8 bg-[#7A1428]/20 hidden sm:block" />
            <div className="flex items-center gap-3">
              <span className="text-xl">🌿</span>
              <div className="flex flex-col">
                <span className="text-xs text-[#7A1428] uppercase tracking-widest font-bold">Private</span>
                <span className="text-sm font-serif italic text-[#2D1217] font-semibold">Luxury Suites</span>
              </div>
            </div>
            <div className="w-px h-8 bg-[#7A1428]/20 hidden sm:block" />
            <div className="flex items-center gap-3">
              <span className="text-xl">🌸</span>
              <div className="flex flex-col">
                <span className="text-xs text-[#7A1428] uppercase tracking-widest font-bold">Organic</span>
                <span className="text-sm font-serif italic text-[#2D1217] font-semibold">Premium Oils</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
