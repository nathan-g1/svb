const express = require('express');
const router = express.Router();
const Product = require('../model/Product');

router.get('/', (req, res) => {
    res.send('these are all the products');
});

router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

module.exports = router;