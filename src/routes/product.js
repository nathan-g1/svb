const express = require('express');
const router = express.Router();
const Product = require('../model/Product');
const User = require('../model/User');

router.get('/', async (req, res) => {
    // res.send('these are all the products');
    console.log('request to all the products');
    try {
        const products = await Product.find().limit(40);
        res.json(products);
    } catch (err) {
        res.send({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    // res.send(req.params.id);
    // check/handle the id coming from the user and pass to the product
    console.log('request to the product: ' + req.params.id);
    try {
        const products = await Product.findById(req.params.id);
        return res.json(products);
    } catch (err) {
        res.send({ message: err });
    }
});


router.post('/add', async (req, res) => {
    const product = new Product({
        name: req.body.product.name,
        price: req.body.product.price,
        description: req.body.product.description,
        model: req.body.product.model
    });
    const user = new User({
        id: req.body.user.id,
        name: req.body.user.name,
        email: req.body.user.email,
        type: req.body.user.type
    });
    try {
        console.log(req.body);
        if (user.type === "adm") {
            const newProduct = await product.save();
            return res.json(newProduct);
        } else {
            return res.json({ message: "Not allowed to add for this user!" });
        }
    } catch (err) {
        return res.json({ message: err });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        if (req.body.user.type === "adm") {
            await Product.findByIdAndUpdate({ _id: req.params.id }, req.body.product);
            const _afterProduct = await Product.findOne({ _id: req.params.id });
            return res.json(_afterProduct);
        } else {
            return res.json({ message: "Not allowed to update for this user!" });
        }
    } catch (err) {
        return res.json({ message: err });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        if (req.body.user.type === "adm") {
            const showPdt = await Product.findById({ _id: req.params.id });
            await Product.findByIdAndDelete({ _id: req.params.id });
            return res.json(showPdt);
        } else {
            return res.json({ message: "Opperation Not allowed for this user!" });
        }
    } catch (err) {
        return res.json({ message: err });
    }
});




module.exports = router;