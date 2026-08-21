import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  serviceId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  imageKey: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
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

export const Service = mongoose.model('Service', serviceSchema);
