const express = require('express');
const router = express.Router();
const {registration, login} = require('../controller/authController');
const auth = require('../middleware/auth');

router.post('/register', registration);

router.post('/login', login);

module.exports = router;