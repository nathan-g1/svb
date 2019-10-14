const express = require('express');
const router = express.Router();
const Product = require('../model/Product');
const upload = require('../middleware/uploadFile');

router.get('/', async (req, res) => {
    // res.send('these are all the products');
    try {
        const products = await Product.find().limit(40);
        res.json(products);
    } catch (err) {
        res.send({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    // check/handle the id coming from the user and pass to the product
    try {
        const products = await Product.findById(req.params.id);
        return res.json(products);
    } catch (err) {
        res.send({ message: err });
    }
});

// add new product with image
// http expects multi-form data instead of raw body data from the request
router.post('/add', upload.array('productImages', 5), async (req, res) => {
    const imagePath = [];
    for (let i = 0; i < req.files.length; i++) {
        imagePath.push(req.files[i].path);
    }
    req.body.image = imagePath;
    const product = new Product(req.body);
    console.log(product);
    try {
        const newProduct = await product.save();
        return res.json({ message: "successfully added", product: newProduct });
    } catch (err) {
        return res.json({ message: err });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        await Product.findByIdAndUpdate({ _id: req.params.id }, req.body);
        const _afterProduct = await Product.findOne({ _id: req.params.id });
        return res.json(_afterProduct );
    } catch (err) {
        return res.json({ message: err });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const showPdt = await Product.findById({ _id: req.params.id });
        await Product.findByIdAndDelete({ _id: req.params.id });
        return res.json({ message: "successfully deleted", product: showPdt });

    } catch (err) {
        return res.json({ message: err });
    }
});




module.exports = router;