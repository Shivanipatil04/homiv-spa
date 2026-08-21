import React from 'react';
import { ScrollReveal } from '../common/ScrollReveal';
import { siteData } from '../../data/siteData';

export const Features = () => {
  return (
    <section className="py-20 bg-white text-[#2D1217] border-b border-[#7A1428]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        <ScrollReveal className="text-center mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#7A1428]">
            Excellence & Perfection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-[#5C0E1E]">
            Why Choose HOMIV
          </h2>
          <div className="w-16 h-1 bg-[#7A1428] mx-auto mt-3 rounded-full" />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteData.features.map((feature, idx) => (
            <ScrollReveal key={feature.id} delay={(idx + 1) * 100} className="bg-[#FFFDF9] p-8 rounded-2xl border border-[#7A1428]/15 shadow-sm hover:shadow-xl hover:border-[#7A1428] transition-all duration-300 text-center group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#7A1428] text-[#F3E5AB] flex items-center justify-center shadow-md group-hover:bg-[#5C0E1E] transition-colors">
                {idx === 0 && (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                )}
                {idx === 1 && (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
                {idx === 2 && (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                )}
              </div>
              <h3 className="font-serif text-xl font-bold text-[#5C0E1E] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {feature.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
