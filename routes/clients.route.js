const express = require('express');
const router = express.Router();
const Controller = require('../controllers/client.controller');
const { upload } = require('../controllers/client.controller'); 
const verfiyToken = require('../middleware/verfiytoken');
// Routes
router.post('/world',verfiyToken, upload.single('image'), Controller.createClient);
router.get('/world', Controller.getAllClient);

router.get('/world/:id', Controller.getClientbyId);
router.patch('/world/:id',verfiyToken,  upload.single('image'), Controller.updateClient);
router.delete('/world/:id',verfiyToken,  Controller.deleteClient);

module.exports = router; 