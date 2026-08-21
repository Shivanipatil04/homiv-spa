import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { Admin } from '../models/Admin.js';
import { HeroImage } from '../models/HeroImage.js';
import { GalleryImage } from '../models/GalleryImage.js';
import { Service } from '../models/Service.js';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/homiv_spa');
    console.log('MongoDB Connected for Seeding...');

    // 1. Seed Admin User
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    await Admin.deleteMany();
    await Admin.create({
      username: adminUsername,
      password: adminPassword,
    });
    console.log(`Admin user created (${adminUsername})`);

    // 2. Seed Hero Images
    await HeroImage.deleteMany();
    const heroSlides = [
      {
        id: 1,
        title: 'Luxury Family Spa Suites',
        subtitle: 'Tranquil Ambiance & Private Therapy Rooms',
        image: '/src/assets/images/gallery1.png',
        displayOrder: 1,
      },
      {
        id: 2,
        title: 'Authentic Thai & Balinese Massages',
        subtitle: 'Certified Professional Practitioners',
        image: '/src/assets/images/gallery2.png',
        displayOrder: 2,
      },
      {
        id: 3,
        title: 'Organic Aromatherapy & Herbal Oils',
        subtitle: '100% Pure Natural Wellness Formulations',
        image: '/src/assets/images/gallery3.png',
        displayOrder: 3,
      },
      {
        id: 4,
        title: 'Couples & Family Relaxation Suites',
        subtitle: "Mumbai's Premier Wellness Sanctuary",
        image: '/src/assets/images/gallery4.png',
        displayOrder: 4,
      },
    ];

    await HeroImage.insertMany(heroSlides);
    console.log('Hero images seeded successfully');

    // 3. Seed Gallery Images
    await GalleryImage.deleteMany();
    const galleryItems = [
      { id: 1, title: 'Luxury Couples Suite', category: 'Sanctuary', image: '/src/assets/images/gallery1.png', displayOrder: 1 },
      { id: 2, title: 'Aromatherapy Essential Oils', category: 'Aromatherapy', image: '/src/assets/images/gallery2.png', displayOrder: 2 },
      { id: 3, title: 'Traditional Thai Massage Area', category: 'Therapy Room', image: '/src/assets/images/gallery3.png', displayOrder: 3 },
      { id: 4, title: 'Soothing Foot Reflexology Lounge', category: 'Lounge', image: '/src/assets/images/gallery4.png', displayOrder: 4 },
      { id: 5, title: 'Private Organic Herbal Steam', category: 'Steam Suite', image: '/src/assets/images/gallery5.png', displayOrder: 5 },
      { id: 6, title: 'Tranquil Welcome Reception', category: 'Reception', image: '/src/assets/images/gallery6.png', displayOrder: 6 },
    ];

    await GalleryImage.insertMany(galleryItems);
    console.log('Gallery images seeded successfully');

    // 4. Seed Services
    await Service.deleteMany();
    const services = [
      {
        serviceId: 'thai',
        title: 'Thai Massage',
        description: 'Traditional passive stretching and gentle pressure point manipulation designed to align energy lines and increase flexibility.',
        imageKey: 'thai',
        image: '/src/assets/images/thai.png',
        displayOrder: 1,
      },
      {
        serviceId: 'swedish',
        title: 'Swedish Massage',
        description: 'Classic long gliding strokes and gentle kneading to ease muscle tension, improve blood flow, and induce peaceful sleep.',
        imageKey: 'swedish',
        image: '/src/assets/images/swedish.png',
        displayOrder: 2,
      },
      {
        serviceId: 'balinese',
        title: 'Balinese Massage',
        description: 'A rigorous full-body massage combining aromatherapy oils, palm pressure, and firm stretches for deep tissue recovery.',
        imageKey: 'balinese',
        image: '/src/assets/images/balinese.png',
        displayOrder: 3,
      },
      {
        serviceId: 'deeptissue',
        title: 'Deep Tissue Therapy',
        description: 'Targeted deep pressure addressing chronic muscle knots, postural strain, and athletic muscle soreness.',
        imageKey: 'deeptissue',
        image: '/src/assets/images/deeptissue.png',
        displayOrder: 4,
      },
      {
        serviceId: 'aroma',
        title: 'Aroma Therapy',
        description: 'Infused with 100% organic essential plant extracts to calm the nervous system, reduce stress, and restore mental focus.',
        imageKey: 'aroma',
        image: '/src/assets/images/aroma.png',
        displayOrder: 5,
      },
      {
        serviceId: 'couples',
        title: 'Couples Massage',
        description: 'Side-by-side relaxation session in our private VIP romantic suite for couples, friends, or family members.',
        imageKey: 'couples',
        image: '/src/assets/images/couplemassage.jpeg',
        displayOrder: 6,
      },
    ];

    await Service.insertMany(services);
    console.log('Services seeded successfully');

    console.log('--- ALL SEEDING COMPLETED ---');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedData();
