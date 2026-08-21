import React from 'react';
import { ScrollReveal } from '../common/ScrollReveal';
import { LotusDivider } from '../common/LotusDivider';
import { siteData } from '../../data/siteData';
import { images } from '../../data/images';

export const About = () => {
  const handleImageError = (e, fallback) => {
    e.target.onerror = null;
    e.target.src = fallback;
  };

  return (
    <section id="about" className="py-20 bg-[#FAF5EE] border-b border-[#7A1428]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <ScrollReveal className="relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#7A1428]/30 shadow-2xl group bg-white max-w-full">
              <img
                src={images.about.main}
                alt={siteData.about.heading}
                className="w-full h-[350px] sm:h-[450px] object-cover object-center max-w-full transition-transform duration-700 group-hover:scale-105 block"
                onError={(e) => handleImageError(e, images.about.main)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D1217]/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#7A1428]/20 shadow-lg">
                <p className="font-serif text-lg font-bold text-[#7A1428]">
                  {siteData.about.subheading}
                </p>
                <p className="text-xs text-[#2D1217] font-medium">
                  {siteData.about.subheadingText}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#7A1428]">
              About HOMIV
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mt-2 text-[#5C0E1E] leading-tight">
              {siteData.about.heading.split('HOMIV Family Lux Spa')[0]}
              <span className="text-[#7A1428] font-display font-bold text-3xl sm:text-4xl md:text-5xl block mt-2 text-gold-gradient tracking-wide drop-shadow-sm">
                HOMIV Family Lux Spa
              </span>
            </h2>

            <LotusDivider className="justify-start py-4" isDark={false} />

            {siteData.about.paragraphs.map((p, idx) => (
              <p key={idx} className="text-[#3D2226] text-sm md:text-base leading-relaxed mb-4 font-normal">
                {p}
              </p>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 mt-6">
              {siteData.about.highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#7A1428]/20 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-[#7A1428] text-white flex items-center justify-center shrink-0 font-bold text-xs">
                    ✓
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5C0E1E]">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="#services"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-md bg-[#7A1428] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#5C0E1E] shadow-lg transition-all"
            >
              <span>Explore Signature Therapies</span>
              <span>→</span>
            </a>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};
