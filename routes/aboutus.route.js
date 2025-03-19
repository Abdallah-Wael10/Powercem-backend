const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutus.controller');
const verifyToken = require('../middleware/verfiytoken');


router.post('/',verifyToken, aboutUsController.createAboutUs);
router.get('/', aboutUsController.getAllAboutUs);
router.get('/:id',verifyToken, aboutUsController.getAboutUsById);
router.put('/:id',verifyToken, aboutUsController.updateAboutUs);
router.delete('/:id',verifyToken, aboutUsController.deleteAboutUs);

module.exports = router;