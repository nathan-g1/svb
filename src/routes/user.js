const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.get('/', async (req, res) => {
    console.log('request to all the users');
    try {
        const users = await User.find();
        return res.json(users);
    } catch (error) {
        return res.json({ message: error });
    }
});

router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

router.post('/signup', async (req, res) => {
    // remember to handle input values
    // password, verified, email & phone
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location,
        phone: req.body.phone,
        image: req.body.image,
    });
    try {
        const newUser = await user.save(user);
        return res.json(newUser);
    } catch (err) {
        return res.json({ message: err });
    }
});

router.post('/login', async (req, res) => {
    // send a token id to the Browser
    // consider including JWT for auth 
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    });
    try {
        var _user = await User.findOne({ "email": user.email });
        if (_user !== null) {
            if (_user.password === user.password) {
                console.log("there is a user")
                const oldUser = await User.findOne({ "email": user.email });
                return res.json(oldUser);
            } else {
                return res.json({ messge: `incorrect password` });
            }
        } else {
            return res.json({ messge: `user ${user.email} not found` });
        }
    } catch (err) {
        return res.json({ message: err });
    }
});

module.exports = router;