//model mongo
const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema(
    {     
        email: String,
        otp: String,
        expireAt: {
            type: Date,
            expires: 180
        }
    },
    {
        timestamps: true
    }
);

const forgotPassword = mongoose.model('forgot-password',forgotPasswordSchema,"forgot-password")

module.exports = forgotPassword;