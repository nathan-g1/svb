const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true,
        default: "ptn"
        // user types ptn, adm, phy
    },
    phone: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    regDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Users', UserSchema);