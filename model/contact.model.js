const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true 
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true, 
        match: /^\S+@\S+\.\S+$/ 
    },
    topic: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true }); 

module.exports = mongoose.model('Contact', contactSchema);