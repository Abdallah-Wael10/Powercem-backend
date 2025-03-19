const AboutUs = require('../model/aboutus.model');
const multer = require('multer');
const path = require('path');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb('Error: Images only (jpeg, jpg, png)');
    }
}).fields([
    { name: 'productImage1', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'productImage2', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'productImage3', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'section3Image', maxCount: 1 },
    { name: 'section4Image', maxCount: 1 }
]);

// Create AboutUs
const createAboutUs = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        
        try {
            const aboutUsData = {
                title: req.body.title,
                description: req.body.description,
                productName1: req.body.productName1,
                productTitle1: req.body.productTitle1,
                productDescription1: req.body.productDescription1,
                productImage1: req.files.productImage1 ? req.files.productImage1[0].path : '',
                image1: req.files.image1 ? req.files.image1[0].path : '',
                productName2: req.body.productName2,
                productTitle2: req.body.productTitle2,
                productDescription2: req.body.productDescription2,
                productImage2: req.files.productImage2 ? req.files.productImage2[0].path : '',
                image2: req.files.image2 ? req.files.image2[0].path : '',
                productName3: req.body.productName3,
                productTitle3: req.body.productTitle3,
                productDescription3: req.body.productDescription3,
                productImage3: req.files.productImage3 ? req.files.productImage3[0].path : '',
                image3: req.files.image3 ? req.files.image3[0].path : '',
                section2Title: req.body.section2Title,
                section2Description: req.body.section2Description,
                section3Name: req.body.section3Name,
                section3Title: req.body.section3Title,
                section3Description: req.body.section3Description,
                section3Image: req.files.section3Image ? req.files.section3Image[0].path : '',
                section4Title: req.body.section4Title,
                section4Description: req.body.section4Description,
                section4Image: req.files.section4Image ? req.files.section4Image[0].path : ''
            };

            const aboutUs = new AboutUs(aboutUsData);
            await aboutUs.save();
            res.status(201).json({ message: 'AboutUs created successfully', data: aboutUs });
        } catch (error) {
            res.status(500).json({ message: 'Error creating AboutUs', error: error.message });
        }
    });
};

// Get all AboutUs entries
const getAllAboutUs = async (req, res) => {
    try {
        const aboutUs = await AboutUs.find();
        res.status(200).json(aboutUs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching AboutUs', error: error.message });
    }
};

// Get single AboutUs by ID
const getAboutUsById = async (req, res) => {
    try {
        const aboutUs = await AboutUs.findById(req.params.id);
        if (!aboutUs) {
            return res.status(404).json({ message: 'AboutUs not found' });
        }
        res.status(200).json(aboutUs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching AboutUs', error: error.message });
    }
};

// Update AboutUs
const updateAboutUs = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err });
        }
        
        try {
            const updateData = {};
            
            // Add fields to updateData if they exist in request body
            Object.keys(req.body).forEach(key => {
                if (req.body[key]) updateData[key] = req.body[key];
            });

            // Update image paths if new files are uploaded
            if (req.files) {
                if (req.files.productImage1) updateData.productImage1 = req.files.productImage1[0].path;
                if (req.files.image1) updateData.image1 = req.files.image1[0].path;
                if (req.files.productImage2) updateData.productImage2 = req.files.productImage2[0].path;
                if (req.files.image2) updateData.image2 = req.files.image2[0].path;
                if (req.files.productImage3) updateData.productImage3 = req.files.productImage3[0].path;
                if (req.files.image3) updateData.image3 = req.files.image3[0].path;
                if (req.files.section3Image) updateData.section3Image = req.files.section3Image[0].path;
                if (req.files.section4Image) updateData.section4Image = req.files.section4Image[0].path;
            }

            const aboutUs = await AboutUs.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            );

            if (!aboutUs) {
                return res.status(404).json({ message: 'AboutUs not found' });
            }
            res.status(200).json({ message: 'AboutUs updated successfully', data: aboutUs });
        } catch (error) {
            res.status(500).json({ message: 'Error updating AboutUs', error: error.message });
        }
    });
};

// Delete AboutUs
const deleteAboutUs = async (req, res) => {
    try {
        const aboutUs = await AboutUs.findByIdAndDelete(req.params.id);
        if (!aboutUs) {
            return res.status(404).json({ message: 'AboutUs not found' });
        }
        res.status(200).json({ message: 'AboutUs deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting AboutUs', error: error.message });
    }
};

module.exports = {
    createAboutUs,
    getAllAboutUs,
    getAboutUsById,
    updateAboutUs,
    deleteAboutUs
};