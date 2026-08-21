import { Service } from '../models/Service.js';

// @desc Get public active services
// @route GET /api/services
export const getPublicServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ displayOrder: 1, createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all services for admin
// @route GET /api/services/admin/all
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create a new service
// @route POST /api/services
export const createService = async (req, res) => {
  try {
    const { serviceId, title, description, imageKey, image, isActive, displayOrder } = req.body;
    let imagePath = image;

    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const uniqueId = serviceId || title.toLowerCase().replace(/[^a-z0-9]/g, '');

    const service = new Service({
      serviceId: uniqueId,
      title: title || 'Therapy Service',
      description: description || '',
      imageKey: imageKey || uniqueId,
      image: imagePath || '',
      isActive: isActive !== undefined ? isActive : true,
      displayOrder: displayOrder ? parseInt(displayOrder) : 0,
    });

    const createdItem = await service.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a service
// @route PUT /api/services/:id
export const updateService = async (req, res) => {
  try {
    const { serviceId, title, description, imageKey, image, isActive, displayOrder } = req.body;
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (serviceId !== undefined) service.serviceId = serviceId;
    if (title !== undefined) service.title = title;
    if (description !== undefined) service.description = description;
    if (imageKey !== undefined) service.imageKey = imageKey;
    if (isActive !== undefined) service.isActive = isActive;
    if (displayOrder !== undefined) service.displayOrder = parseInt(displayOrder);
    
    if (req.file) {
      service.image = `/uploads/${req.file.filename}`;
    } else if (image !== undefined) {
      service.image = image;
    }

    const updatedItem = await service.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete a service
// @route DELETE /api/services/:id
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    await service.deleteOne();
    res.json({ message: 'Service removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
