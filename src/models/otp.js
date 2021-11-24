const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const otpSchema = mongoose.Schema({
    email: String,
    code: String,
    expiryIn: Number,
}, {timestamps: true})

const Otp = mongoose.model('Otp', otpSchema, "otp");

module.exports = Otp; 