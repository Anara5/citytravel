const express = require('express');

const cityController = require('../controllers/cityController');

const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, cityController.getAllCities).post(protect, cityController.createCity);

router.route('/:id').get(protect, cityController.getCity).patch(protect, cityController.updateCity).delete(protect, cityController.deleteCity);

module.exports = router;