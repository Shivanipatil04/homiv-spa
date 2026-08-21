import React, { useState, useEffect } from 'react';
import { ScrollReveal } from '../common/ScrollReveal';
import { siteData } from '../../data/siteData';
import { images } from '../../data/images';

export const Gallery = () => {
  const [activeImageModal, setActiveImageModal] = useState(null);
  const [galleryList, setGalleryList] = useState([]);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setGalleryList(
            data.map((item) => ({
              id: item._id,
              title: item.title,
              category: item.category || 'HOMIV Sanctuary',
              img: item.image,
            }))
          );
        } else {
          setGalleryList(
            siteData.galleryImages.map((item, idx) => ({
              id: item.id,
              title: item.title,
              category: 'HOMIV Sanctuary',
              img: images.gallery[idx],
            }))
          );
        }
      })
      .catch(() => {
        setGalleryList(
          siteData.galleryImages.map((item, idx) => ({
            id: item.id,
            title: item.title,
            category: 'HOMIV Sanctuary',
            img: images.gallery[idx],
          }))
        );
      });
  }, []);

  const handleImageError = (e, fallback) => {
    e.target.onerror = null;
    e.target.src = fallback;
  };

  const displayItems = galleryList.length > 0
    ? galleryList
    : siteData.galleryImages.map((item, idx) => ({
      id: item.id,
      title: item.title,
      category: 'HOMIV Sanctuary',
      img: images.gallery[idx],
    }));

  return (
    <>
      <section id="gallery" className="py-20 bg-white text-[#2D1217] border-b border-[#7A1428]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">

          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#7A1428]">
              Visual Sanctuary
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-2 text-[#5C0E1E]">
              Homiv Spa Ambience
            </h2>
            <div className="w-16 h-1 bg-[#7A1428] mx-auto mt-3 rounded-full" />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayItems.map((item, idx) => (
              <ScrollReveal key={item.id || idx} delay={(idx + 1) * 80}>
                <div
                  onClick={() => setActiveImageModal(item)}
                  className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-[#7A1428]/15 shadow-md hover:shadow-2xl transition-all duration-300 bg-gray-100 max-w-full"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover object-center block max-w-full transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => handleImageError(e, images.gallery[idx % images.gallery.length])}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D1217]/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-[#F3E5AB] font-bold">{item.category}</p>
                      <p className="font-serif text-lg font-bold text-white">{item.title}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* Image Lightbox Modal */}
      {activeImageModal && (
        <div
          onClick={() => setActiveImageModal(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl p-2 border border-[#7A1428]/30">
            <button
              onClick={() => setActiveImageModal(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#7A1428] text-white flex items-center justify-center font-bold hover:bg-[#5C0E1E] transition-colors"
            >
              ✕
            </button>
            <img
              src={activeImageModal.img}
              alt={activeImageModal.title}
              className="w-full h-[70vh] object-cover rounded-xl"
              onError={(e) => handleImageError(e, images.about.main)}
            />
            <div className="p-4 bg-white text-[#2D1217]">
              <p className="font-serif text-xl font-bold text-[#5C0E1E]">{activeImageModal.title}</p>
              <p className="text-xs text-gray-600">HOMIV Family Lux Spa Sanctuary, Mumbai</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
