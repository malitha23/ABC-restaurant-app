const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelize');
const User = require('./models/User');
const Reservation = require('./models/Reservation');

require('dotenv').config();

const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test the database connection and synchronize models
sequelize.authenticate()
    .then(() => {
        console.log('Database connected successfully.');
        return sequelize.sync(); // This will create the tables if they do not exist
    })
    .then(() => {
        console.log('Database synchronized successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    
// Routes
app.use('/api/reservations', reservationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

