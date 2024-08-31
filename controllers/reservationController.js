const db = require('../config/db');

const makeReservation = (req, res) => {
    const { user_id, reservation_date, num_of_people, service_type } = req.body;
    const query = `INSERT INTO reservations (user_id, reservation_date, num_of_people, service_type)
                   VALUES (?, ?, ?, ?)`;
    db.query(query, [user_id, reservation_date, num_of_people, service_type], (err, result) => {
        if (err) {
            console.error('Error making reservation:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Reservation created successfully', reservationId: result.insertId });
    });
};

module.exports = { makeReservation };

