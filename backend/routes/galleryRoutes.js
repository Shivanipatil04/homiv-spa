import express from 'express';
import {
  getPublicGalleryImages,
  getAllGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from '../controllers/galleryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getPublicGalleryImages);
router.get('/admin/all', protect, getAllGalleryImages);
router.post('/', protect, upload.single('image'), createGalleryImage);
router.put('/:id', protect, upload.single('image'), updateGalleryImage);
router.delete('/:id', protect, deleteGalleryImage);

export default router;
