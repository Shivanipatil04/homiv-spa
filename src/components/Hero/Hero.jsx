import React, { useState, useEffect } from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { siteData } from '../../data/siteData';
import { images } from '../../data/images';

export const Hero = () => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentHeroSlide(prev => (prev + 1) % siteData.heroSlides.length);
    }, 4500);
    return () => clearInterval(slideInterval);
  }, []);

  const handleImageError = (e, fallback) => {
    e.target.onerror = null;
    e.target.src = fallback;
  };

  return (
    <section id="home" className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 border-b border-[#7A1428]/15 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#F4ECE1] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#7A1428]/8 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        <ScrollReveal className="lg:col-span-7 flex flex-col justify-center">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-[2px] w-12 bg-[#7A1428]" />
            <span className="text-[#7A1428] uppercase tracking-[0.3em] text-xs font-bold">
              The Sanctuary of Wellness
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-[1.1] mb-6 font-bold text-[#5C0E1E]">
            Premium & Luxurious <br />
            <span className="text-[#7A1428] italic font-normal">Family Spa</span>
          </h1>

          <p className="text-base sm:text-lg text-[#3D2226] max-w-xl mb-8 leading-relaxed font-normal">
            Escape the chaos of the everyday. HOMIV offers a sanctuary of tranquility where ancient healing traditions meet modern luxury for the ultimate family relaxation experience in Mumbai.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <a
              href={`tel:${siteData.phone}`}
              className="bg-[#7A1428] text-white px-8 py-3.5 rounded-md font-bold uppercase text-xs tracking-widest hover:bg-[#5C0E1E] transition-all duration-300 shadow-lg"
            >
              Call Now: {siteData.contactPhoneLabel}
            </a>
            <a
              href={`tel:${siteData.phone}`}
              className="border-2 border-[#7A1428] text-[#7A1428] px-8 py-3.5 rounded-md font-bold uppercase text-xs tracking-widest hover:bg-[#7A1428] hover:text-white transition-all duration-300"
            >
              Book Appointment
            </a>
          </div>

          <div className="py-6 border-t border-[#7A1428]/20 flex flex-wrap gap-6 sm:gap-8 items-center">
            <div className="flex flex-col">
              <span className="text-xs text-[#7A1428] uppercase tracking-widest mb-1 font-bold">Certified</span>
              <span className="text-sm font-serif italic text-[#2D1217] font-semibold">Top Therapists</span>
            </div>
            <div className="w-px h-8 bg-[#7A1428]/20 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-xs text-[#7A1428] uppercase tracking-widest mb-1 font-bold">Private</span>
              <span className="text-sm font-serif italic text-[#2D1217] font-semibold">Luxury Suites</span>
            </div>
            <div className="w-px h-8 bg-[#7A1428]/20 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-xs text-[#7A1428] uppercase tracking-widest mb-1 font-bold">Organic</span>
              <span className="text-sm font-serif italic text-[#2D1217] font-semibold">Premium Oils</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#C9A24B]/50 shadow-2xl bg-[#3D0813] group aspect-[4/3] sm:aspect-[16/11]">
            {siteData.heroSlides.map((slide, idx) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === currentHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={images.hero[idx]?.url}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center block max-w-full transition-transform duration-700 group-hover:scale-[1.02]"
                  onError={(e) => handleImageError(e, images.about.main)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D1217]/90 via-[#2D1217]/30 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white">
                  <h3 className="font-serif text-lg sm:text-2xl font-bold text-white leading-snug drop-shadow-sm">
                    {slide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-100/90 font-light mt-1">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={() => setCurrentHeroSlide(prev => (prev - 1 + siteData.heroSlides.length) % siteData.heroSlides.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#2D1217]/80 text-white border border-[#C9A24B]/50 flex items-center justify-center hover:bg-[#7A1428] transition-all opacity-80 group-hover:opacity-100 focus:outline-none active:scale-95 text-lg font-bold"
              aria-label="Previous Slide"
            >
              ‹
            </button>
            <button
              onClick={() => setCurrentHeroSlide(prev => (prev + 1) % siteData.heroSlides.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#2D1217]/80 text-white border border-[#C9A24B]/50 flex items-center justify-center hover:bg-[#7A1428] transition-all opacity-80 group-hover:opacity-100 focus:outline-none active:scale-95 text-lg font-bold"
              aria-label="Next Slide"
            >
              ›
            </button>

            <div className="absolute bottom-3 right-5 z-20 flex items-center gap-1.5">
              {siteData.heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentHeroSlide(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentHeroSlide ? 'w-6 bg-[#C9A24B]' : 'w-2 bg-white/50 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between px-1 text-xs text-[#7A1428]">
            <span className="font-semibold italic">HOMIV Family Spa Suites & Views</span>
            <span className="text-gray-500 font-medium">{siteData.location}</span>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
