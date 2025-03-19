const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true 
    },
    owner: {
        type: String,
        required: true,
        trim: true
    },
    soilType: {
        type: String,
        required: true,
        trim: true
    },
    mainImage: {
        type: String,
        required: true 
    },
    extraImages: [
        {
            type: String 
        }
    ]
}, { timestamps: true }); 

module.exports = mongoose.model('Project', projectSchema);