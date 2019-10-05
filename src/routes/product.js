const express = require('express');
const router = express.Router();
const Product = require('../model/Product');
const upload = require('../middleware/uploadFile');

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
    // check/handle the id coming from the user and pass to the product
    console.log('request to the product: ' + req.params.id);
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
    console.log(req.files);
    const imagePath = [];
    for (let i = 0; i < req.files.length; i++) {
        imagePath.push(req.files[i].path);
    }
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        model: req.body.model,
        type: req.body.type,
        image: imagePath
    });
    try {
        const newProduct = await product.save();
        return res.json({ message: "successfully added a new Product", product: newProduct });
    } catch (err) {
        return res.json({ message: err });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        if (req.body.user.type === "adm") {
            await Product.findByIdAndUpdate({ _id: req.params.id }, req.body.product);
            const _afterProduct = await Product.findOne({ _id: req.params.id });
            return res.json({ message: "successfully updated", product: _afterProduct });
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
            return res.json({ message: "successfully deleted", product: showPdt });
        } else {
            return res.json({ message: "Opperation Not allowed for this user!" });
        }
    } catch (err) {
        return res.json({ message: err });
    }
});




module.exports = router;