const Booking = require('../model/Booking');

class BookingRepository {
    async createBooking(booking, transaction) {
        return await Booking.create(booking, { transaction });
    }

    async findBookingById(id) {
        return await Booking.findByPk(id);
    }
}

module.exports = new BookingRepository();
