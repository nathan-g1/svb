const express = require('express');
const router = express.Router();
const Order = require('../model/Order');

router.get('/', async (req, res) => {
    // res.send('these are all the products');
    // requires the front-end to send the type of the user
    console.log('request to all the orders');
    try {
        if (req.body.user.type !== 'adm') {
            return res.json({ message: 'opperation not allowd for this user' });
        }
        const products = await Order.find();
        return res.json(products);
    } catch (err) {
        return res.send({ message: err });
    }
});

router.get('/:id', async (req, res) => {
    // requires the front-end to send the type of the user
    if (req.body.user.type !== 'adm') {
        return res.json({ message: 'opperation not allowd for this user' });
    }
    console.log('request to all the orders');
    try {
        const singleProduct = await Order.findOne({ _id: req.params.id });
        return res.json(singleProduct);
    } catch (err) {
        return res.send({ message: err });
    }
});

router.post('/add/', async (req, res) => {
    console.log(`ordering product ${req.body.productId}`);
    const order = new Order({
        quantity: req.body.quantity,
        productId: req.body.productId,
        userId: req.body.userId
    })
    try {
        const _order = await order.save();
        return res.json(_order);
    } catch (err) {
        return res.send({ message: err });
    }
});

router.put('/update', async (req, res) => {
    console.log(`updating order ${req.body.id}`);
    try {
        await Order.findByIdAndUpdate({ _id: req.body.id }, req.body);
        const _afterUpdate = await Order.findOne({ _id: req.body.id });
        return res.json(_afterUpdate);
    } catch (err) {
        return res.send({ message: err });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const _removeOrder = await Order.findByIdAndDelete({ _id: req.params.id });
        return res.json(_removeOrder);
    } catch (err) {
        return res.send({ message: err });
    }
});


module.exports = router;