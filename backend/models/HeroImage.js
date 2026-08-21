import mongoose from 'mongoose';

const heroImageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subtitle: {
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

export const HeroImage = mongoose.model('HeroImage', heroImageSchema);
