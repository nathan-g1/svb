const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    type: {
        type: String,//either lns or frm
        required: false
    },
    model: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        required: false,
        default: true
    },
    image: {
        type: [String], // a product may have multiple images
        required: false
    }
});

module.exports = mongoose.model('Products', ProductSchema);