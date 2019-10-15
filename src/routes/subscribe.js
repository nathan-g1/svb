const express = require('express');
const router = express.Router();
const validator = require('validator');
const Subscription = require('../model/Subscription');

// get all subscibed emails
router.get('/', async (req, res) => {
    try {
        const emails = await Subscription.find();
        return res.json({ message: "All emails on subcription list", emails });
    } catch (err) {
        return res.status(400).json(err);
    }
});

// subscirbe for news letters and update
router.post('/add', async (req, res) => {
    try {
        if (validator.isEmail(req.body.email)) {
            const subsc = new Subscription({
                email: req.body.email
            });
            await subsc.save();
            return res.json({ message: subsc.email + " saved for subscription" });
        } else {
            return res.json({ message: "invalid email" });
        }
    } catch (err) {
        return res.status(400).json(err);
    }
});
module.exports = router;