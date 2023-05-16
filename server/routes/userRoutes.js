const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.getAllUsers); // this is for testing purposes only

router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;