const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Category = require('./Category');

const Item = sequelize.define('Item', {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: false,
    createdAt: 'created_at',
});

// Define associations
Item.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category', // Use 'category' for the association
});

module.exports = Item;
