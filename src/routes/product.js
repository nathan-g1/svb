const express = require('express');
const router = express.Router();
const Product = require('../model/Product');

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
        res.json(products);
    } catch (err) {
        res.send({ message: err });
    }
});


router.post('/add', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
    });
    try {
        const newProduct = await product.save();
        res.json(newProduct);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;