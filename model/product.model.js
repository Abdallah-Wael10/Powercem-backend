const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: { 
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mainImage: {
        type: String,
        required: true
    },
    detailsImage: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    applicationTitle: {
        type: String,
        required: true
    },
    applicationDescription: {
        type: String,
        required: true
    },
    applicationImage: {
        type: String,
        required: true
    },
    sustainabilityTitle: {
        type: String,
        required: true
    },
    sustainabilityDescription: {
        type: String,
        required: true
    },
    sustainabilityImage: {
        type: String,
        required: true
    },
    benefitTitle1:{
        type: String,
        required: true
    },
    benefitDescription1: {
        type: String,
        required: true
    },
    benefitImage1: {
        type: String,
        required: true
    },
    benefitTitle2:{
        type: String,
        required: true
    },
    benefitDescription2: {
        type: String,
        required: true
    },
    benefitImage2: {
        type: String,
        required: true
    },
    benefitTitle3:{
        type: String,
        required: true
    },
    benefitDescription3: {
        type: String,
        required: true
    },
    benefitImage3:{
        type: String,
        required: true
    }

    
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);   