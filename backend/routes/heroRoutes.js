import express from 'express';
import {
  getPublicHeroImages,
  getAllHeroImages,
  createHeroImage,
  updateHeroImage,
  deleteHeroImage,
} from '../controllers/heroController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getPublicHeroImages);
router.get('/admin/all', protect, getAllHeroImages);
router.post('/', protect, upload.single('image'), createHeroImage);
router.put('/:id', protect, upload.single('image'), updateHeroImage);
router.delete('/:id', protect, deleteHeroImage);

export default router;
