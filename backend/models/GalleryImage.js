import mongoose from 'mongoose';

const galleryImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    default: 'Sanctuary',
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  displayOrder: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

export const GalleryImage = mongoose.model('GalleryImage', galleryImageSchema);
