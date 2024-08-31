const TrainRepository = require('../repositories/TrainRepository');

class TrainService {
    async addTrain(trainDetails) {
        return await TrainRepository.createTrain(trainDetails);
    }

    async getTrainAvailability(source, destination) {
        return await TrainRepository.findTrainsByRoute(source, destination);
        if (!Array.isArray(trains)) {
            throw new Error('Expected an array of trains');
        }
        return trains;
    }

    async updateTrainSeats(trainId, newAvailableSeats, currentVersion) {
        return await TrainRepository.updateTrainSeats(trainId, newAvailableSeats, currentVersion);
    }
}

module.exports = new TrainService();
