import { GalleryImage } from '../models/GalleryImage.js';

// @desc Get public active gallery images
// @route GET /api/gallery
export const getPublicGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all gallery images for admin
// @route GET /api/gallery/admin/all
export const getAllGalleryImages = async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new gallery image
// @route POST /api/gallery
export const createGalleryImage = async (req, res) => {
  try {
    const { title, category, description, image, isActive, displayOrder } = req.body;
    let imagePath = image;

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    if (!imagePath) {
      return res.status(400).json({ message: 'Image path or file upload is required' });
    }

    const galleryImage = new GalleryImage({
      title: title || 'Spa Ambience',
      category: category || 'Sanctuary',
      description: description || '',
      image: imagePath,
      isActive: isActive !== undefined ? isActive : true,
      displayOrder: displayOrder ? parseInt(displayOrder) : 0,
    });

    const createdItem = await galleryImage.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a gallery image
// @route PUT /api/gallery/:id
export const updateGalleryImage = async (req, res) => {
  try {
    const { title, category, description, image, isActive, displayOrder } = req.body;
    const galleryImage = await GalleryImage.findById(req.params.id);

    if (!galleryImage) {
      return res.status(404).json({ message: 'Gallery image not found' });
    }

    if (title !== undefined) galleryImage.title = title;
    if (category !== undefined) galleryImage.category = category;
    if (description !== undefined) galleryImage.description = description;
    if (isActive !== undefined) galleryImage.isActive = isActive;
    if (displayOrder !== undefined) galleryImage.displayOrder = parseInt(displayOrder);
    
    if (req.file) {
      galleryImage.image = `/uploads/${req.file.filename}`;
    } else if (image) {
      galleryImage.image = image;
    }

    const updatedItem = await galleryImage.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a gallery image
// @route DELETE /api/gallery/:id
export const deleteGalleryImage = async (req, res) => {
  try {
    const galleryImage = await GalleryImage.findById(req.params.id);
    if (!galleryImage) {
      return res.status(404).json({ message: 'Gallery image not found' });
    }

    await galleryImage.deleteOne();
    res.json({ message: 'Gallery image removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
