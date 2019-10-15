const express = require('express');
const router = express.Router();
const User = require('../model/User');
const auth = require('../middleware/auth');
const upload = require('../middleware/uploadFile');

router.get('/profile', auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user);
});
// Edit profile/user account
// to upload image for the user
router.put('/profile/edit/:id', upload.single('image'), async (req, res) => {
    try {
        if (req.file !== undefined) {
            req.body.image = req.file.path;
            await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
            const updatedUser = await User.findOne({ _id: req.params.id });
            return res.json( updatedUser );
        } else {
            await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
            const updatedUser = await User.findOne({ _id: req.params.id });
            return res.json( updatedUser );
        }
    } catch (err) {
        res.json({ message: err });
    }
});

// get all users
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        return res.json(allUsers);
    } catch (err) {
        return res.json({ message: err });
    }
});

// get a single user
router.get('/:id', async (req, res) => {
    try {
        const userUnique = await User.findOne({ _id: req.params.id });
        return res.json(userUnique);
    } catch (err) {
        return res.json({ message: err });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save();
        const token = await user.generateAuthToken();
        return res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.post('/login', async (req, res) => {
    try {
        // Search for a user by email and password.
        const user = await User.findOne({ "email": req.body.email });
        if (!user) {

            return res.json({ error: 'Invalid login credentials' })
        }

        if (user.password !== req.body.password) {
            return res.status(200).json({ error: 'Invalid login credentials' })
        }
        const token = await user.generateAuthToken();
        return res.json( user );
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.post('/logout', async (req, res) => {
    // Log user out of the application
    console.log(req.user)


    res.send()

});



// get all physicians fro admin
router.get('/physicians', async (req, res) => {
    try {

        const physicians = await User.find({ type: "phy" });
        return res.status(200).json(physicians);

    } catch (error) {
        res.status(400).send(error);
    }
});

// delete a physician using user id
router.delete('/physicians/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete({ _id: req.params.id });
        const physicians = await User.find({ type: "phy" });

        return res.status(200).json(physicians);

    } catch (error) {
        res.status(400).send(error)
    }
});



module.exports = router;