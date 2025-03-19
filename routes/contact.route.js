const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller');
const verfiyToken = require('../middleware/verfiytoken');
// Routes
router.post('/', contactController.createContact); 
router.get('/', verfiyToken, contactController.getAllContacts); 
router.get('/:id', contactController.getContactById); 
router.patch('/:id',verfiyToken, contactController.updateContact); 
router.delete('/:id', contactController.deleteContact); 

module.exports = router;