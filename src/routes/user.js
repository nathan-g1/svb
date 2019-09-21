const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.get('/', async (req, res) => {
    console.log('request to all the users');
    try {
        const users = await User.find();
    } catch (error) {
        res.json({ message: error });
    }
});

router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

router.post('/signup', async (req, res) => {
    // remember to handle input values
    // password, verified, email & phone
    const user = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location,
        phone: req.body.phone,
        image: req.body.image,
    });
    try {
        const newUser = await User.save(user);
        res.json(newUser);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/login', async (req, res) => {
    // send a token id to the Browser
    // consider including JWT for auth 
    const user = new user({
        name: req.body.name,
        email: req.body.email,
    });
    try {
        const oldUser = await User.save(user);
        res.json(oldUser);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;