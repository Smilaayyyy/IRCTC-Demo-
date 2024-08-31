const express = require('express');
const TrainController = require('../controllers/TrainController');
const apikeyMiddleware = require('../middlewares/apikeyMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');


const router = express.Router();

router.post('/add', apikeyMiddleware, authMiddleware, adminMiddleware, TrainController.addTrain);
router.get('/availability', TrainController.getAvailability);

module.exports = router;
