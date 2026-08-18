import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { LotusDivider } from '../LotusDivider';
import { siteData } from '../../data/siteData';
import { images } from '../../data/images';

export const Services = () => {
  const handleImageError = (e, fallback) => {
    e.target.onerror = null;
    e.target.src = fallback;
  };

  return (
    <section id="services" className="py-24 bg-[#5C0E1E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F3E5AB]">
            Our Signature Therapies
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mt-2 text-white">
            Therapeutic Spa Services
          </h2>
          <p className="text-white/80 text-sm mt-3 font-light">
            Tailored massage techniques crafted to relieve pain, boost circulation, and deeply refresh your spirit.
          </p>
          <LotusDivider className="mt-4" isDark={true} />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteData.services.map((service, idx) => (
            <ScrollReveal key={service.id} delay={(idx % 3 + 1) * 100} className="h-full">
              <div className="bg-white text-[#2D1217] h-full rounded-2xl overflow-hidden border border-[#C9A24B]/40 shadow-2xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group max-w-full">
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-gray-100 shrink-0">
                  <img
                    src={images.services[service.imageKey]}
                    alt={service.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105 max-w-full block"
                    onError={(e) => handleImageError(e, images.services[service.imageKey])}
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#5C0E1E] mb-2 group-hover:text-[#7A1428] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>
                  <a
                    href={`tel:${siteData.phone}`}
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-[#7A1428]/15 text-xs font-bold uppercase tracking-wider text-[#7A1428] hover:text-[#5C0E1E] transition-colors"
                  >
                    <span>Book Now</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
