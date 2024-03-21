//model mongo
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {     
        title : String,
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        position: Number,
        deleted: Boolean,
        deletedTime: Date
    }
);

const product = mongoose.model('product',productSchema,"Products")

module.exports = product;