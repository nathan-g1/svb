const express = require('express');
const router = express.Router();
const User = require('../model/User');
const auth = require('../middleware/auth')


router.get('/profile', auth, async (req, res) => {
    // View logged in user profile
    res.send(req.user)
})


router.get('/', async (req, res) => {
    const allUsers = await User.find();
    try {
        return res.json(allUsers);
    } catch (err) {
        return res.json({ message: err });
    }
});


router.get('/:id', async (req, res) => {
    const allUsers = await User.findOne({ _id: req.params.id });
    try {
        return res.json(allUsers);
    } catch (err) {
        return res.json({ message: err });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findByCredentials(email, password);
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
        }
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
});

router.post('/add/physician', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get('/physicians', async (req, res) => {
    const userAdmin = new User({
        id: req.body.user.id,
        name: req.body.user.name,
        email: req.body.user.email,
        type: req.body.user.type
    });
    try {
        if (user.type === "adm") {
            const physicians = await User.find({ type: "phy" });
            return res.status(200).json(physicians);
        } else {
            return res.json({ message: "Opperation Not allowed for this user!" });
        }
    } catch (error) {
        res.status(400).send(error)
    }
});

router.delete('/physicians/:id', async (req, res) => {
    const userAdmin = new User({
        id: req.body.user.id,
        name: req.body.user.name,
        email: req.body.user.email,
        type: req.body.user.type
    });
    try {
        if (user.type === "adm") {
            const deletedPhysician = await User.findOne({ _id: req.params.id });
            await User.findByIdAndDelete({ _id: req.params.id });
            return res.status(200).json(deletedPhysician);
        } else {
            return res.json({ message: "Opperation Not allowed for this user!" });
        }
    } catch (error) {
        res.status(400).send(error)
    }
});



module.exports = router;