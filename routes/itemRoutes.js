// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createItem, updateItem, deleteItem, getAllItemsWithCategories } = require('../controllers/itemController');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/items');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

router.get('/items', getAllItemsWithCategories);
router.post('/items', upload.single('image'), createItem); // Handle file upload for new item
router.delete('/items/:id', deleteItem);
router.put('/items/:id', upload.single('image'), updateItem); // Handle file upload for updates

module.exports = router;
