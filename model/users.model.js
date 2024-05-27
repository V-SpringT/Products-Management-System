//model mongo
const mongoose = require('mongoose');
const genString = require('../helper/generate');

const userSchema = new mongoose.Schema(
    {     
        fullName: String,
        cart_id: String,
        email: String,
        password: String,
        tokenUser: {
            type: String,
            default: genString.generateRandomString(20)
        },
        phone: String,
        avatar: String,
        status: {
            type: String,
            default: 'active'
        },
        deleted: {
            type: Boolean,
            default: false
        },   
        deletedTime: Date
    },
        {
            timestamps: true
        }
);

const user = mongoose.model('user',userSchema,"Users")

module.exports = user;