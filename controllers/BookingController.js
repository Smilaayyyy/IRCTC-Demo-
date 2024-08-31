const BookingService = require('../services/BookingService');

class BookingController {
    async bookSeat(req, res) {
        try {
            const { trainId, numberOfSeats} = req.body;
            const userId = req.user.id;
            console.log('User ID:', userId); // Debugging log
            // Validate input
            if (!trainId || !numberOfSeats) {
                return res.status(400).json({ error: 'Train ID and number of seats are required' });
            }

            if (numberOfSeats <= 0) {
                return res.status(400).json({ error: 'Number of seats must be greater than 0' });
            }

            // Assuming req.user.id is available from auth middleware
            const booking = await BookingService.bookSeat(trainId, userId, numberOfSeats);
            res.status(201).json(booking);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getBookingDetails(req, res) {
        try {
            const booking = await BookingService.getBookingDetails(req.params.id);
            res.json(booking);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new BookingController();
