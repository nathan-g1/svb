const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
  // reject files that are not jpeg, png, bmp, GIF
  var ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.bmp') {
    return cb(new Error('Only images are allowed'));
  }
  cb(null, true);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/images/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
  fileFilter: fileFilter
});


module.exports = upload