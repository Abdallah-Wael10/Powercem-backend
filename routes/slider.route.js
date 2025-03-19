const express = require('express');
const router = express.Router();
const controller = require('../controllers/slider.conroller');
const { upload } = require('../controllers/slider.conroller'); // Import Multer middleware
const verfiyToken = require('../middleware/verfiytoken');

// Routes
router.post('/',verfiyToken, upload.single('image'), controller.createSlider); // Create a new slider
router.get('/', controller.getAllSliders); // Get all sliders
router.get('/:id', controller.getSliderById); // Get a single slider
router.patch('/:id',verfiyToken, upload.single('image'), controller.updateSlider); // Update a slider
router.delete('/:id',verfiyToken, controller.deleteSlider); // Delete a slider

module.exports = router;