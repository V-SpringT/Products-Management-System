//model mongo
const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const brandSchema = new mongoose.Schema(
    {     
        title : String,
        description: String,
        thumbnail: String,
        status: String,      
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

const brand = mongoose.model('brand',brandSchema,"Brands")

module.exports = brand;