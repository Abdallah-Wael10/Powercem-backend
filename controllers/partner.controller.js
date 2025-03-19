const Certification = require("../model/partner.model");
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

const createPartner = asyncWrapper(async (req, res) => {
    const image = req.file.path; // Get the uploaded file path

    if (!image) {
        return res.status(400).json({ error: "Image is required" });
    }

    const newCertification = new Certification({
        image
    });

    await newCertification.save();
    res.status(201).json(newCertification);
});

const getAllPartner = asyncWrapper(async (req, res) => {
    const certifications = await Certification.find();
    res.status(200).json(certifications);
});

const getPartnerById = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const certification = await Certification.findById(id);

    if (!certification) {
        return res.status(404).json({ error: "partner not found" });
    }

    res.status(200).json(certification);
});

const updatePartner = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const image = req.file ? req.file.path : undefined;

    const updateData = {};
    if (image) updateData.image = image;

    const updatedCertification = await Certification.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedCertification) {
        return res.status(404).json({ error: "partner not found" });
    }

    res.status(200).json(updatedCertification);
});

const deletePartner = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const deletedCertification = await Certification.findByIdAndDelete(id);

    if (!deletedCertification) {
        return res.status(404).json({ error: "partner not found" });
    }

    res.status(200).json({ message: "partner deleted successfully" });
});

module.exports = {
    createPartner,
    getAllPartner,
    getPartnerById,
    updatePartner,
    deletePartner,
    upload
};