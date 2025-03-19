const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model('Certification', certificationSchema);