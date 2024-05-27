//model mongo
const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema(
    {     
        products: [{
            product_id: String,
            quantity: Number
        }],
        deleted: {
            type: Boolean,
            default: false
        },   
        slug: {
            type: String,
            unique: false
        }
    },
    {
        timestamps: true
    }
);

const cart = mongoose.model('Carts',cartSchema,"Carts")

module.exports = cart;