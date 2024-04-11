//model mongo
const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const roleSchema = new mongoose.Schema(
    {     
        title : String,
        permissions: {
            type : Array,
            default : []
        },
        description: String,
        price: Number,
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

const product = mongoose.model('roles',roleSchema,"Roles")

module.exports = product;