const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true 
    }
});

module.exports = mongoose.model('clients', clientSchema);