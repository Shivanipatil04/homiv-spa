import aroma from '../assets/images/aroma.png';
import balinese from '../assets/images/balinese.png';
import couplemassage from '../assets/images/couplemassage.jpeg';
import deeptissue from '../assets/images/deeptissue.png';
import gallery1 from '../assets/images/gallery1.png';
import gallery2 from '../assets/images/gallery2.png';
import gallery3 from '../assets/images/gallery3.png';
import gallery4 from '../assets/images/gallery4.png';
import gallery5 from '../assets/images/gallery5.png';
import gallery6 from '../assets/images/gallery6.png';
import swedish from '../assets/images/swedish.png';
import thai from '../assets/images/thai.png';

export const images = {
  logo: "/assets/images/logo/homiv-logo.jpg",
  hero: [
    { id: 1, url: gallery1 },
    { id: 2, url: gallery2 },
    { id: 3, url: gallery3 },
    { id: 4, url: gallery4 }
  ],
  about: {
    main: gallery5,
  },
  services: {
    thai: thai,
    swedish: swedish,
    balinese: balinese,
    deeptissue: deeptissue,
    aroma: aroma,
    couples: couplemassage,
  },
  gallery: [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
  ]
};
