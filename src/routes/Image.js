const mongoose = require('mongoose');
const ImageSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    size: {
        type: number,
        required: false
    }
});

module.exports = mongoose.model('Image', ImageSchema);