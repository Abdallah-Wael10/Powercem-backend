const express = require('express');
const router = express.Router();
const Controller = require('../controllers/egyclient.controller');
const { upload } = require('../controllers/egyclient.controller'); 
const verfiyToken = require('../middleware/verfiytoken');

// Routes
router.post('/egypt',verfiyToken,  upload.single('image'), Controller.createClient);
router.get('/egypt', Controller.getAllClient);
router.get('/egypt/:id', Controller.getClientbyId);
router.patch('/egypt/:id',verfiyToken,  upload.single('image'), Controller.updateClient);
router.delete('/egypt/:id',verfiyToken,  Controller.deleteClient);

module.exports = router; 