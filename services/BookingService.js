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
            
            const train = await TrainRepository.findTrainById(trainId);

            console.log('Train data:', train); 

            if (!train) {
                throw new Error('Train not found');
            }

            
            if (train.availableSeats < numberOfSeats) {
                throw new Error('Not enough seats available');
            }

           
            const updatedTrain = await TrainRepository.updateTrainSeats(
                trainId,
                train.availableSeats - numberOfSeats,
                train.version,
                transaction
            );

            console.log('Updated train:', updatedTrain); 

            if (!updatedTrain) {
                throw new Error('Concurrent update detected. Please try again.');
            }

           
            const booking = await BookingRepository.createBooking({
                trainId: train.id,
                userId: userId,
                seats_booked: numberOfSeats 
            }, transaction);

            console.log('Booking created:', booking); // Debug log to inspect booking data

            // Commit the transaction if everything is successful
            await transaction.commit();
            return booking;
        } catch (error) {
            
            await transaction.rollback();
            console.error('Error during booking:', error); // Log the full error
            throw error;
        }
    }

    
    async getBookingDetails(bookingId) {
        return await BookingRepository.findBookingById(bookingId);
    }
}

module.exports = new BookingService();
