//model mongo
const mongoose = require('mongoose');
const genString = require('../helper/generate');

const accountSchema = new mongoose.Schema(
    {     
        fullName: String,
        email: String,
        password: String,
        token: {
            type: String,
            default: genString.generateRandomString(20)
        },
        phone: String,
        avatar: String,
        role_id: String,
        status: String,
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

const account = mongoose.model('account',accountSchema,"Accounts")

module.exports = account;