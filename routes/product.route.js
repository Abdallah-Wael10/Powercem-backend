const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const verfiytoken = require("../middleware/verfiytoken")
// Configure Multer for image storage
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });

// Define the fields for image uploads
const productUpload = upload.fields([
    { name: "mainImage", maxCount: 1 },
    { name: "detailsImage", maxCount: 1 },
    { name: "productImage", maxCount: 1 },
    { name: "applicationImage", maxCount: 1 },
    { name: "sustainabilityImage", maxCount: 1 },
    { name: "benefitImage1", maxCount: 1 },
    { name: "benefitImage2", maxCount: 1 },
    { name: "benefitImage3", maxCount: 1 },
]);

// Routes
router.post("/", productUpload, verfiytoken, productController.createProduct); // Create a new product
router.get("/", productController.getAllProducts); // Get all products
router.get("/:id", productController.getProductById); // Get a single product
router.patch("/:id", productUpload, verfiytoken, productController.updateProduct); // Update a product
router.delete("/:id", verfiytoken, productController.deleteProduct); // Delete a product

module.exports = router;