const TrainService = require('../services/TrainService');

class TrainController {
    async addTrain(req, res) {
        try {
            // The request passed adminMiddleware, so it's safe to proceed
            const train = await TrainService.addTrain(req.body);
            res.status(201).json(train);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAvailability(req, res) {
        try {
            const { source, destination } = req.query;
            console.log('Source:', source);
            console.log('Destination:', destination);

            if (!source || !destination) {
                throw new Error('Source and destination are required');
            }
            const trains = await TrainService.getTrainAvailability(source, destination);
            if (!Array.isArray(trains)) {
                throw new Error('Expected an array of trains');
            }
            res.json(trains);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new TrainController();
