// controllers/itemController.js
const fs = require('fs');
const path = require('path');
const Item = require('../models/Item');
const Category = require('../models/Category');

const getAllItemsWithCategories = async (req, res) => {
    try {
        const items = await Item.findAll({
            include: {
                model: Category,
                as: 'category', // Make sure this matches the alias used in the association
                attributes: ['name'],
            },
        });

        res.json(items);
    } catch (error) {
        console.error('Error fetching items with categories:', error);
        res.status(500).json({ message: 'Error fetching items' });
    }
};

// Create a new item
const createItem = async (req, res) => {
    const { name, price, category_id } = req.body;
    const image = req.file ? `/items/${req.file.filename}` : null;

    try {
        const newItem = await Item.create({
            name,
            price,
            category_id,
            image, // Save the image filename
        });

        res.status(200).json(newItem);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ message: 'Error creating item' });
    }
};


// Delete an item and its image
const deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const item = await Item.findByPk(id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // Delete the image file if it exists
        if (item.image) {
            const imagePath = path.join(__dirname, '../public', item.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        // Delete the item record
        await Item.destroy({ where: { id } });

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Error deleting item' });
    }
};

// Update an item
const updateItem = async (req, res) => {
    const { id } = req.params; // Item ID from URL
    const { name, price, category_id } = req.body; // New item details

    try {
        const item = await Item.findByPk(id);

        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        // If no new image is uploaded, keep the existing image
        const image = req.file ? `/items/${req.file.filename}` : item.image;

        // If a new image is provided, delete the old one
        if (req.file && item.image) {
            const oldImagePath = path.join(__dirname, '../public', item.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        // Update item details
        item.name = name || item.name;
        item.price = price || item.price;
        item.category_id = category_id || item.category_id;
        item.image = image; // Use either new or existing image

        // Save the updated item
        await item.save();

        res.status(200).json({ message: 'Item updated successfully', item });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Error updating item' });
    }
};

module.exports = { getAllItemsWithCategories, createItem, deleteItem, updateItem };
