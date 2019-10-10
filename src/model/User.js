const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
            }
        }
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
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
    image: {
        type: String,
        required: false
    },
    regDate: {
        type: Date,
        default: Date.now()
    },
    token: {
        type: String,
        required: false
    }

});

UserSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

UserSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
    user.token = token;
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password.
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}



const User = mongoose.model('User', UserSchema)

module.exports = User