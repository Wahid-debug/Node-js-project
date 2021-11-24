const express = require('express');
const router = express.Router();
const {getUser, forgetPassword, resetPassword} = require('../controller/userController'); 
const auth = require('../middleware/auth');

router.get('/',auth, getUser);
router.post('/forgetpassword', forgetPassword);
router.patch('/change-password', resetPassword);
module.exports = router;