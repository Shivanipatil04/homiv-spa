import React, { useState } from 'react';
import { ScrollReveal } from '../common/ScrollReveal';
import { siteData } from '../../data/siteData';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Thai Massage',
    date: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact-form" className="py-20 bg-[#F4ECE1] text-[#2D1217] border-b border-[#7A1428]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <ScrollReveal className="lg:col-span-5">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#7A1428] block mb-2">
              Reserve Your Experience
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#5C0E1E] mb-4">
              Book An Appointment
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-6 font-normal">
              Schedule your rejuvenating session at HOMIV Family Lux Spa. Select your desired therapy, choose a convenient date, and our concierge will swiftly confirm your personalized appointment.
            </p>

            <div className="space-y-4 pt-2 border-t border-[#7A1428]/20">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#7A1428]/10 text-[#7A1428] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#5C0E1E]">Personalized Consultation</h4>
                  <p className="text-xs text-gray-600">Customized oil selection and pressure profiling tailored to your body.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#7A1428]/10 text-[#7A1428] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#5C0E1E]">Private Luxury Suites</h4>
                  <p className="text-xs text-gray-600">Sanitized, climate-controlled rooms with peaceful ambient music.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#7A1428]/10 text-[#7A1428] flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[#5C0E1E]">Instant Confirmation</h4>
                  <p className="text-xs text-gray-600">Quick response from our front desk to secure your preferred slot.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Form Card */}
          <ScrollReveal delay={200} className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#7A1428]/20 shadow-2xl relative">
            {formSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-[#7A1428] text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  ✓
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#5C0E1E] mb-2">
                  Booking Request Sent
                </h3>
                <p className="text-sm text-gray-700 max-w-md mx-auto mb-6">
                  Thank you, <span className="font-bold text-[#7A1428]">{formData.name || 'Valued Guest'}</span>! Our HOMIV Spa concierge will call you at <span className="font-bold text-[#7A1428]">{formData.phone || siteData.contactPhoneLabel}</span> shortly to confirm your session.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-lg bg-[#7A1428] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#5C0E1E] transition-colors"
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1428] mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full bg-[#FAF7F2] border border-[#7A1428]/30 rounded-lg px-4 py-3 text-sm text-[#2D1217] focus:outline-none focus:border-[#7A1428] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1428] mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder={`e.g. ${siteData.contactPhoneLabel}`}
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full bg-[#FAF7F2] border border-[#7A1428]/30 rounded-lg px-4 py-3 text-sm text-[#2D1217] focus:outline-none focus:border-[#7A1428] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1428] mb-2">
                      Select Therapy *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleFormChange}
                      className="w-full bg-[#FAF7F2] border border-[#7A1428]/30 rounded-lg px-4 py-3 text-sm text-[#2D1217] focus:outline-none focus:border-[#7A1428] focus:bg-white transition-colors"
                    >
                      <option value="Thai Massage">Thai Massage</option>
                      <option value="Swedish Massage">Swedish Massage</option>
                      <option value="Balinese Massage">Balinese Massage</option>
                      <option value="Deep Tissue Massage">Deep Tissue Massage</option>
                      <option value="Aroma Therapy">Aroma Therapy</option>
                      <option value="Couples Massage">Couples Massage</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1428] mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleFormChange}
                      className="w-full bg-[#FAF7F2] border border-[#7A1428]/30 rounded-lg px-4 py-3 text-sm text-[#2D1217] focus:outline-none focus:border-[#7A1428] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#7A1428] mb-2">
                    Special Notes / Preferences
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Mention any specific preferences or therapist notes..."
                    value={formData.message}
                    onChange={handleFormChange}
                    className="w-full bg-[#FAF7F2] border border-[#7A1428]/30 rounded-lg px-4 py-3 text-sm text-[#2D1217] focus:outline-none focus:border-[#7A1428] focus:bg-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#7A1428] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-lg hover:bg-[#5C0E1E] transition-colors shadow-lg"
                >
                  Confirm Appointment Request
                </button>
              </form>
            )}
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
