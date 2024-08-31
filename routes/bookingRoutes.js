const express = require('express');
const BookingController = require('../controllers/BookingController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/book', authMiddleware, BookingController.bookSeat);
router.get('/:id', authMiddleware, BookingController.getBookingDetails);

module.exports = router;
