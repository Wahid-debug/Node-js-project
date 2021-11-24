const express = require('express');
const router = express.Router();
const auth = require('./authRouter');
const user = require('./user');
const post = require('./post');

router.use('/auth', auth);
router.use('/user', user);
router.use('/user', post);

module.exports = router;