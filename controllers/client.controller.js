const Certification = require("../model/clients.model");
const asyncWrapper = require("../middleware/asyncwrapper");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const upload = multer({ storage: storage });

const createClient = asyncWrapper(async (req, res) => {
    const image = req.file.path; 

    if (!image) {
        return res.status(400).json({ error: "Image is required" });
    }

    const newCertification = new Certification({
        image
    });

    await newCertification.save();
    res.status(201).json(newCertification);
});

const getAllClient = asyncWrapper(async (req, res) => {
    const certifications = await Certification.find();
    res.status(200).json(certifications);
});

const getClientbyId = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const certification = await Certification.findById(id);

    if (!certification) {
        return res.status(404).json({ error: "client not found" });
    }

    res.status(200).json(certification);
});

const updateClient = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const image = req.file ? req.file.path : undefined;

    const updateData = {};
    if (image) updateData.image = image;

    const updatedCertification = await Certification.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedCertification) {
        return res.status(404).json({ error: "client not found" });
    }

    res.status(200).json(updatedCertification);
});

const deleteClient = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const deletedCertification = await Certification.findByIdAndDelete(id);

    if (!deletedCertification) {
        return res.status(404).json({ error: "client not found" });
    }

    res.status(200).json({ message: "client deleted successfully" });
});

module.exports = {
    createClient,
    getAllClient,
    getClientbyId,
    updateClient,
    deleteClient,
    upload
};