import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import { siteData } from '../../data/siteData';
import { images } from '../../data/images';

export const Footer = () => {
  return (
    <footer className="bg-[#3D0813] text-white py-16 border-t border-[#C9A24B]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          
          <ScrollReveal>
            <a href="#home" className="inline-flex items-center gap-3 mb-6">
              <img
                src={images.logo}
                alt="HOMIV Family Lux Spa Logo"
                className="h-12 w-auto bg-white p-0.5 rounded border border-[#C9A24B]/40 object-contain"
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-[#D4AF6A] block">
                  HOMIV
                </span>
                <span className="text-xs tracking-[0.25em] text-amber-200/80 uppercase block font-semibold">
                  Family Lux Spa
                </span>
              </div>
            </a>

            <p className="text-amber-100/80 text-sm max-w-md font-light leading-relaxed mb-6">
              The Sanctuary of Wellness. Offering therapeutic massages, organic aromatherapy, and bespoke relaxation treatments for the entire family in Mumbai.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <a href="https://www.instagram.com/homivspa" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#5C0E1E] text-[#D4AF6A] border border-[#C9A24B]/30 flex items-center justify-center hover:bg-[#C9A24B] hover:text-[#2A2020] transition-colors" title="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://www.facebook.com/homivspa" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#5C0E1E] text-[#D4AF6A] border border-[#C9A24B]/30 flex items-center justify-center hover:bg-[#C9A24B] hover:text-[#2A2020] transition-colors" title="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.812 9 5.236V8z"/></svg>
              </a>
              <a href={`https://wa.me/91${siteData.phone}`} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#5C0E1E] text-[#D4AF6A] border border-[#C9A24B]/30 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors" title="WhatsApp">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="mailto:homivspa@gmail.com" className="w-9 h-9 rounded-full bg-[#5C0E1E] text-[#D4AF6A] border border-[#C9A24B]/30 flex items-center justify-center hover:bg-[#EA4335] hover:text-white transition-colors" title="Gmail">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
              </a>
              <a href="https://youtube.com/@homivspa?si=U6fTy_-DM7d5ks40" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#5C0E1E] text-[#D4AF6A] border border-[#C9A24B]/30 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-colors" title="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#5C0E1E] text-[#D4AF6A] flex items-center justify-center shrink-0 border border-[#C9A24B]/30">
                  📞
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-[#D4AF6A] font-semibold">Direct Call Concierge</span>
                  <a href={`tel:${siteData.phone}`} className="text-sm font-bold text-white hover:text-[#D4AF6A] transition-colors block">
                    {siteData.contactPhoneLabel}
                  </a>
                </div>
              </div>
            </div>

            <div className="text-xs text-amber-200/70 space-y-1">
              <p className="font-semibold text-amber-100 mb-1">Opening Hours:</p>
              <p>{siteData.openingHours}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <span className="block text-xs font-bold uppercase tracking-widest text-[#D4AF6A] mb-3">
              Spa Location
            </span>
            <div className="relative w-full h-64 rounded-xl overflow-hidden border border-[#C9A24B]/30 shadow-2xl bg-gray-900">
              <iframe
                title={`HOMIV Spa Location Map ${siteData.location}`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.223049969493!2d72.8465053!3d19.2452377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b12d5d8591dd%3A0xc6a804705ec4fbb!2sShop%20no%203%264%2C%20nutan%20dream%2C%20Babhai%20naka%2C%20Near%20mangesh%20vadapav%2C%20Borivali%20West%2C%20Mumbai%2C%20Maharashtra%20400092!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </ScrollReveal>

        </div>

        <div className="border-t border-[#C9A24B]/20 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-200/60 gap-4 text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} HOMIV Family Lux Spa. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF6A]">Location:</span>
            <span className="text-amber-100/80">{siteData.location}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
