const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadFile');

router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (req.file !== undefined) {
            req.body.image = req.file.path;
            return res.json({ success: true, message: 'Image uploaded successfully', name: req.file.filename });
        } else {
            return res.json({ message: 'Image required' });
        }
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
