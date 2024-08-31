const sequelize = require('../config/database');
const TrainRepository = require('../repositories/TrainRepository');
const BookingRepository = require('../repositories/BookingRepository');

class BookingService {
    async bookSeat(trainId, userId, numberOfSeats) {
        if (numberOfSeats <= 0) {
            throw new Error('Invalid number of seats');
        }

        const transaction = await sequelize.transaction();

        try {
            // Fetch the train details by trainId
            const train = await TrainRepository.findTrainById(trainId);

            console.log('Train data:', train); // Debug log to inspect train data

            if (!train) {
                throw new Error('Train not found');
            }

            // Check if enough seats are available
            if (train.availableSeats < numberOfSeats) {
                throw new Error('Not enough seats available');
            }

            // Update available seats and check for concurrent updates
            const updatedTrain = await TrainRepository.updateTrainSeats(
                trainId,
                train.availableSeats - numberOfSeats,
                train.version,
                transaction
            );

            console.log('Updated train:', updatedTrain); // Debug log to inspect updated train data

            if (!updatedTrain) {
                throw new Error('Concurrent update detected. Please try again.');
            }

            // Create the booking record
            const booking = await BookingRepository.createBooking({
                trainId: train.id,
                userId: userId,
                seats_booked: numberOfSeats // Adjust based on your seat allocation logic
            }, transaction);

            console.log('Booking created:', booking); // Debug log to inspect booking data

            // Commit the transaction if everything is successful
            await transaction.commit();
            return booking;
        } catch (error) {
            // Rollback the transaction in case of an error
            await transaction.rollback();
            console.error('Error during booking:', error); // Log the full error
            throw error;
        }
    }

    // Fetch booking details by bookingId
    async getBookingDetails(bookingId) {
        return await BookingRepository.findBookingById(bookingId);
    }
}

module.exports = new BookingService();
