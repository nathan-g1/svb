const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('these are all the appointments');
});

router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

module.exports = router;