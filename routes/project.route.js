const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');

const multer = require('multer');
const verfiyToken = require('../middleware/verfiytoken');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});
const upload = multer({ storage: storage });

router.post(
    '/',
    verfiyToken, 
    upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'extraImages', maxCount: 5 }]),
    projectController.createProject
); 

router.get('/', projectController.getAllProjects); 
router.get('/:id', projectController.getProjectById); 

router.patch(
    '/:id',
    verfiyToken, 
    upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'extraImages', maxCount: 5 }]),
    projectController.updateProject
); 

router.post(
    '/:id/add-extra-image',
    verfiyToken, 
    upload.single('extraImage'), 
    projectController.addExtraImage
); 

router.put(
    '/:id/update-extra-image/:imageIndex',
    verfiyToken, 
    upload.single('extraImage'),
    projectController.updateExtraImage
); 

router.delete(
    '/:id/delete-extra-image/:imageIndex',
    verfiyToken, 
    projectController.deleteExtraImage
); 

router.delete(
    '/:id',
    verfiyToken, 
    projectController.deleteProject
); 

module.exports = router; 