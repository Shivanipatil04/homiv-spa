import React from 'react';
import { ScrollReveal } from './ScrollReveal';
import { siteData } from '../data/siteData';

export const MembershipBanner = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#7A1428] via-[#8B1A30] to-[#7A1428] text-white border-t border-b border-[#C9A24B]/30 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
        <ScrollReveal>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#F3E5AB] block mb-2">
            Privileged Wellness Card
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-4">
            HOMIV Family Membership & Gift Cards
          </h2>
          <p className="text-amber-100/90 text-sm max-w-2xl mx-auto mb-8 font-light">
            Unlock exclusive session discounts, priority weekend reservations, and complimentary aromatherapy upgrades for your entire household.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="bg-[#C9A24B] text-[#2A2020] px-6 py-3.5 rounded-md font-bold uppercase text-xs tracking-widest shadow-lg flex items-center gap-2 flex-wrap justify-center">
              <span>Inquire:</span>
              <a href={`tel:${siteData.phone1}`} className="hover:underline">
                {siteData.phone1}
              </a>
              <span>|</span>
              <a href={`tel:${siteData.phone2}`} className="hover:underline">
                {siteData.phone2}
              </a>
            </div>
            <a
              href="#contact-form"
              className="border border-white/40 text-white px-8 py-3.5 rounded-md font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-[#7A1428] transition-all"
            >
              Reserve Online
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
