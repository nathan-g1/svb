const express = require('express');
const router = express.Router();
const Order = require('../model/Order');

// get all orders 
router.get('/', async (req, res) => {
    // requires the front-end to send the type of the user
    console.log('request to all the orders');
    try {
        if (Object.keys(req.body).length === 0) {
            return res.json({ message: 'opperation not allowed for unauthorized user' });
        }
        if (req.body.user.type !== 'adm') {
            return res.json({ message: 'opperation not allowed for this user' });
        }
        const orders = await Order.find();
        return res.json(orders);
    } catch (err) {
        return res.send({ message: err });
    }
});
// get a single order using order id
router.get('/:id', async (req, res) => {
    // requires the front-end to send the type of the user
    if (req.body.user.type !== 'adm') {
        return res.json({ message: 'opperation not allowd for this user' });
    }
    try {
        const singleProduct = await Order.findOne({ _id: req.params.id });
        return res.json(singleProduct);
    } catch (err) {
        return res.send({ message: err });
    }
});

// all orders made by a single user
router.get('/cart/:id', async (req, res) => {
    console.log(`request all orders by user ${req.params.id}`);
    try {
        const singleProduct = await Order.find({ userId: req.params.id });
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
        userId: req.body.userId,
        description: req.body.description
    });
    try {
        const _order = await order.save();
        return res.json(_order);
    } catch (err) {
        return res.send({ message: err });
    }
});
// update a single order using order id
router.put('/update/:id', async (req, res) => {
    console.log(`updating order ${req.params.id}`);
    try {
        await Order.findByIdAndUpdate({ _id: req.params.id }, req.body);
        const _afterUpdate = await Order.findOne({ _id: req.params.id });
        return res.json(_afterUpdate);
    } catch (err) {
        return res.send({ message: err });
    }
});
// delete a single order
router.delete('/delete/:id', async (req, res) => {
    try {
        const _removeOrder = await Order.findByIdAndDelete({ _id: req.params.id });
        return res.json(_removeOrder);
    } catch (err) {
        return res.send({ message: err });
    }
});


module.exports = router;