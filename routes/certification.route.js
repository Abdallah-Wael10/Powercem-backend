const express = require('express');
const router = express.Router();
const certificationController = require('../controllers/certification.controller');
const { upload } = require('../controllers/certification.controller'); // Import Multer middleware
const verfiyToken = require('../middleware/verfiytoken');

// Routes
router.post('/',verfiyToken, upload.single('image'), certificationController.createCertification); // Create a new certification
router.get('/', certificationController.getAllCertifications); // Get all certifications
router.get('/:id', certificationController.getCertificationById); // Get a single certification
router.patch('/:id',verfiyToken, upload.single('image'), certificationController.updateCertification); 
router.delete('/:id',verfiyToken, certificationController.deleteCertification); 

module.exports = router; 