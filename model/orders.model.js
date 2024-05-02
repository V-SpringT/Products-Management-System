//model mongo
const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const orderSchema = new mongoose.Schema(
    {     
        user_id: String,
        cart_id : String,
        userInfor: {
            fullName: String,
            phone: Number,
            address: String
        },
        products: [
            {
                product_id: String,
                quantity: Number,
                price: Number,
                discountPercentage: Number
            }
        ],
        deleted: {
            type: Boolean,
            default: false
        },   
    },
    {
        timestamps: true
    }
);

const order = mongoose.model('order',orderSchema,"Orders")

module.exports = order;