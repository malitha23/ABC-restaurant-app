// controllers/adminController.js
const User = require('../models/User');

// Get all users, sorted by created_at in descending order
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'first_name', 'last_name', 'phone_number', 'address', 'role', 'status', 'created_at'],
            order: [['created_at', 'DESC']]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new user
const createUser = async (req, res) => {
    const { username, password, email, first_name, last_name, phone_number, address, role, status } = req.body;
    try {
        const newUser = await User.create({ username, password, email, first_name, last_name, phone_number, address, role, status });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing user
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, email, first_name, last_name, phone_number, address, role, status } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.update({ username, password, email, first_name, last_name, phone_number, address, role, status });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        await user.destroy();
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
};
