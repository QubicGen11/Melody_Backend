// config/multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinaryConfig');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'houses',
        allowed_formats: ['jpeg', 'jpg', 'png']
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
