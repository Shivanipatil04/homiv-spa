import { HeroImage } from '../models/HeroImage.js';

// @desc Get public active hero images
// @route GET /api/hero
export const getPublicHeroImages = async (req, res) => {
  try {
    const images = await HeroImage.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all hero images for admin
// @route GET /api/hero/admin/all
export const getAllHeroImages = async (req, res) => {
  try {
    const images = await HeroImage.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new hero image
// @route POST /api/hero
export const createHeroImage = async (req, res) => {
  try {
    const { title, subtitle, image, isActive, displayOrder } = req.body;
    let imagePath = image;

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    if (!imagePath) {
      return res.status(400).json({ message: 'Image path or file upload is required' });
    }

    const heroImage = new HeroImage({
      title: title || 'Luxury Spa Suite',
      subtitle: subtitle || '',
      image: imagePath,
      isActive: isActive !== undefined ? isActive : true,
      displayOrder: displayOrder ? parseInt(displayOrder) : 0,
    });

    const createdItem = await heroImage.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a hero image
// @route PUT /api/hero/:id
export const updateHeroImage = async (req, res) => {
  try {
    const { title, subtitle, image, isActive, displayOrder } = req.body;
    const heroImage = await HeroImage.findById(req.params.id);

    if (!heroImage) {
      return res.status(404).json({ message: 'Hero image not found' });
    }

    if (title !== undefined) heroImage.title = title;
    if (subtitle !== undefined) heroImage.subtitle = subtitle;
    if (isActive !== undefined) heroImage.isActive = isActive;
    if (displayOrder !== undefined) heroImage.displayOrder = parseInt(displayOrder);
    
    if (req.file) {
      heroImage.image = `/uploads/${req.file.filename}`;
    } else if (image) {
      heroImage.image = image;
    }

    const updatedItem = await heroImage.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a hero image
// @route DELETE /api/hero/:id
export const deleteHeroImage = async (req, res) => {
  try {
    const heroImage = await HeroImage.findById(req.params.id);
    if (!heroImage) {
      return res.status(404).json({ message: 'Hero image not found' });
    }

    await heroImage.deleteOne();
    res.json({ message: 'Hero image removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
