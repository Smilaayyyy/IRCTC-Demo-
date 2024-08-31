const Train = require('../model/Train');

class TrainRepository {
    async createTrain(train) {
        return await Train.create(train);
    }

    async findTrainsByRoute(source, destination) {
        return await Train.findAll({ where:
             { source: source,
                destination: destination
            } 
            });
    }

    async findTrainById(id) {
        return await Train.findByPk(id);
    }

    async updateTrainSeats(trainId, newAvailableSeats, version, transaction) {
        const result = await Train.update(
            { available_seats: newAvailableSeats, version: version + 1 },
            {
                where: {
                    id: trainId,
                    version: version
                },
                transaction
            }
        );
        return result;
    }
    
}

module.exports = new TrainRepository();
