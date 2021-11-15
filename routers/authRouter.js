const express = require('express');
const router = express.Router();
const { validateRegistration } = require('../middleware/validateRegistration');
const {
  registrationController,
  loginController,
} = require('../controllers/authControllers');

router.post('/registration', validateRegistration, registrationController);

router.post('/login', loginController);

module.exports = router;
