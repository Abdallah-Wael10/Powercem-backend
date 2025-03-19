const express = require('express');
const router = express.Router();
const Controller = require('../controllers/partner.controller');
const { upload } = require('../controllers/partner.controller'); 
const verfiyToken = require('../middleware/verfiytoken');

// Routes
router.post('/',verfiyToken, upload.single('image'), Controller.createPartner); 
router.get('/', Controller.getAllPartner); 
router.get('/:id', Controller.getPartnerById); 
router.patch('/:id',verfiyToken, upload.single('image'), Controller.updatePartner); 
router.delete('/:id',verfiyToken, Controller.deletePartner); 

module.exports = router; 