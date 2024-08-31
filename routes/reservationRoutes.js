const express = require('express');
const { makeReservation } = require('../controllers/reservationController');
const router = express.Router();

router.post('/make', makeReservation);

module.exports = router;

