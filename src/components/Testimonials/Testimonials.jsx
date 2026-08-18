import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { LotusDivider } from '../LotusDivider';
import { siteData } from '../../data/siteData';

export const Testimonials = () => {
  return (
    <section className="py-20 bg-[#FAF5EE] text-[#2D1217] border-b border-[#7A1428]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#7A1428]">
            Guest Experiences
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-[#5C0E1E]">
            What Our Guests Say
          </h2>
          <LotusDivider className="mt-2" isDark={false} />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteData.testimonials.map((testimonial, idx) => (
            <ScrollReveal key={testimonial.id} delay={(idx + 1) * 100} className="bg-white p-8 rounded-2xl border border-[#7A1428]/15 flex flex-col justify-between shadow-md hover:shadow-xl hover:border-[#7A1428] transition-all">
              <div>
                <div className="flex gap-1 text-[#C9A24B] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 italic text-sm leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="border-t border-[#7A1428]/15 pt-4">
                <p className="font-serif font-bold text-[#5C0E1E] text-sm">
                  {testimonial.author}
                </p>
                <p className="text-xs text-[#7A1428] font-semibold">
                  {testimonial.role}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
