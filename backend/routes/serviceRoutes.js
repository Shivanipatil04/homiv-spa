import express from 'express';
import {
  getPublicServices,
  getAllServices,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getPublicServices);
router.get('/admin/all', protect, getAllServices);
router.post('/', protect, upload.single('image'), createService);
router.put('/:id', protect, upload.single('image'), updateService);
router.delete('/:id', protect, deleteService);

export default router;
