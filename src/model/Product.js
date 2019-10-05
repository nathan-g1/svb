const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
    , description: {
        type: String,
        required: false
    },
    type: {
        type: String,//either lns or frm
        required: true
    },
    model: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: true,
        default: true
    },
    image: {
        type: [String], // a product may have multiple images
        required: true
    }
});

module.exports = mongoose.model('Products', ProductSchema);