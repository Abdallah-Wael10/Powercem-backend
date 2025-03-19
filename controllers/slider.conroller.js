const Slider = require("../model/slider.model");
const asyncWrapper = require("../middleware/asyncwrapper");
const multer = require("multer");

// Configure Multer for image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Directory where images will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Create a new slider with an image
const createSlider = asyncWrapper(async (req, res) => {
    const { title } = req.body;
    const image = req.file.path; // Get the uploaded file path

    if (!title || !image) {
        return res.status(400).json({ error: "Title and image are required" });
    }

    const newSlider = new Slider({
        title,
        image
    });

    await newSlider.save();
    res.status(201).json(newSlider);
});

// Get all sliders
 const getAllSliders = asyncWrapper(async (req, res) => {
    const sliders = await Slider.find();
    res.status(200).json(sliders);
});

// Get a single slider by ID
const getSliderById = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const slider = await Slider.findById(id);

    if (!slider) {
        return res.status(404).json({ error: "Slider not found" });
    }

    res.status(200).json(slider);
});

// Update a slider by ID
const updateSlider = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updateData = {};
    if (title) updateData.title = title;
    if (image) updateData.image = image;

    const updatedSlider = await Slider.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedSlider) {
        return res.status(404).json({ error: "Slider not found" });
    }

    res.status(200).json(updatedSlider);
});

// Delete a slider by ID
const deleteSlider = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const deletedSlider = await Slider.findByIdAndDelete(id);

    if (!deletedSlider) {
        return res.status(404).json({ error: "Slider not found" });
    }

    res.status(200).json({ message: "Slider deleted successfully" });
});

module.exports = {
    createSlider,
    getAllSliders,
    getSliderById,
    updateSlider,
    deleteSlider,
    upload, // Expose Multer upload middleware for image storage
}
