//model mongo
const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
    {     
        title : String,
        category_id: {
            type: String, 
            default: "",
        },
        description: String,
        price: Number,
        discountPercentage: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        position: Number,
        createBy :{
            accountId: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        },
        slug: {
            type: String,
            slug:"title",
            unique: true
        },
        deleted: {
            type: Boolean,
            default: false
        },   
        deletedBy:{
            accountId: String,
            deletedAt: Date
        },
        updatedBy:[
            {
                accountId: String,
                updatedAt: Date
            }
        ],
        deletedBy:[
            {
                accountId: String,
                deletedAt: Date
            }
        ],
        restoredBy:[
            {
                accountId: String,
                restoredAt: Date
            }
        ],
    },
);

const product = mongoose.model('product',productSchema,"Products")

module.exports = product;