const Product = require("../model/product.model");
const asyncWrapper = require("../middleware/asyncwrapper");
const multer = require("multer");

// Configure Multer for image storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

// Create a new product
const createProduct = asyncWrapper(async (req, res) => {
    const {
        name,
        title,
        description,
        applicationTitle,
        applicationDescription,
        sustainabilityTitle,
        sustainabilityDescription,
        benefitTitle1,
        benefitDescription1,
        benefitTitle2,
        benefitDescription2,
        benefitTitle3,
        benefitDescription3,
    } = req.body;

    // Extract image paths from the request
    const mainImage = req.files?.mainImage ? req.files.mainImage[0].path : null;
    const detailsImage = req.files?.detailsImage ? req.files.detailsImage[0].path : null;
    const productImage = req.files?.productImage ? req.files.productImage[0].path : null;
    const applicationImage = req.files?.applicationImage ? req.files.applicationImage[0].path : null;
    const sustainabilityImage = req.files?.sustainabilityImage ? req.files.sustainabilityImage[0].path : null;
    const benefitImage1 = req.files?.benefitImage1 ? req.files.benefitImage1[0].path : null;
    const benefitImage2 = req.files?.benefitImage2 ? req.files.benefitImage2[0].path : null;
    const benefitImage3 = req.files?.benefitImage3 ? req.files.benefitImage3[0].path : null;

    if (
        !name ||
        !title ||
        !description ||
        !mainImage ||
        !detailsImage ||
        !productImage ||
        !applicationTitle ||
        !applicationDescription ||
        !applicationImage ||
        !sustainabilityTitle ||
        !sustainabilityDescription ||
        !sustainabilityImage ||
        !benefitTitle1 ||
        !benefitDescription1 ||
        !benefitImage1 ||
        !benefitTitle2 ||
        !benefitDescription2 ||
        !benefitImage2 ||
        !benefitTitle3 ||
        !benefitDescription3 ||
        !benefitImage3
    ) {
        return res.status(400).json({ error: "All fields and images are required" });
    }

    const newProduct = new Product({
        name,
        title,
        description,
        mainImage,
        detailsImage,
        productImage,
        applicationTitle,
        applicationDescription,
        applicationImage,
        sustainabilityTitle,
        sustainabilityDescription,
        sustainabilityImage,
        benefitTitle1,
        benefitDescription1,
        benefitImage1,
        benefitTitle2,
        benefitDescription2,
        benefitImage2,
        benefitTitle3,
        benefitDescription3,
        benefitImage3,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
});

// Get all products
const getAllProducts = asyncWrapper(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
});

// Get a single product by ID
const getProductById = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
});

// Update a product by ID
const updateProduct = asyncWrapper(async (req, res) => {
    const { id } = req.params;

    const {
        name,
        title,
        description,
        applicationTitle,
        applicationDescription,
        sustainabilityTitle,
        sustainabilityDescription,
        benefitTitle1,
        benefitDescription1,
        benefitTitle2,
        benefitDescription2,
        benefitTitle3,
        benefitDescription3,
    } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (applicationTitle) updateData.applicationTitle = applicationTitle;
    if (applicationDescription) updateData.applicationDescription = applicationDescription;
    if (sustainabilityTitle) updateData.sustainabilityTitle = sustainabilityTitle;
    if (sustainabilityDescription) updateData.sustainabilityDescription = sustainabilityDescription;
    if (benefitTitle1) updateData.benefitTitle1 = benefitTitle1;
    if (benefitDescription1) updateData.benefitDescription1 = benefitDescription1;
    if (benefitTitle2) updateData.benefitTitle2 = benefitTitle2;
    if (benefitDescription2) updateData.benefitDescription2 = benefitDescription2;
    if (benefitTitle3) updateData.benefitTitle3 = benefitTitle3;
    if (benefitDescription3) updateData.benefitDescription3 = benefitDescription3;

    // Handle image updates
    if (req.files?.mainImage) updateData.mainImage = req.files.mainImage[0].path;
    if (req.files?.detailsImage) updateData.detailsImage = req.files.detailsImage[0].path;
    if (req.files?.productImage) updateData.productImage = req.files.productImage[0].path;
    if (req.files?.applicationImage) updateData.applicationImage = req.files.applicationImage[0].path;
    if (req.files?.sustainabilityImage) updateData.sustainabilityImage = req.files.sustainabilityImage[0].path;
    if (req.files?.benefitImage1) updateData.benefitImage1 = req.files.benefitImage1[0].path;
    if (req.files?.benefitImage2) updateData.benefitImage2 = req.files.benefitImage2[0].path;
    if (req.files?.benefitImage3) updateData.benefitImage3 = req.files.benefitImage3[0].path;

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(updatedProduct);
});

// Delete a product by ID
const deleteProduct = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};