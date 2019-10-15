const express = require('express');
const router = express.Router();
const validator = require('validator');
const Subscription = require('../model/Subscription');

// get all subscibed emails
router.get('/', async (req, res) => {
    const emails = await Subscription.find();
    return res.json( emails );
});

// subscirbe for news letters and update
router.post('/add', async (req, res) => {
    if (validator.isEmail(req.body.email)) {
        const subsc = new Subscription({
            email: req.body.email
        });
        await subsc.save();
        return res.json({ message: subsc.email + " saved for subscription" });
    } else {
        return res.json({ message: "invalid email" });
    }
});
module.exports = router;