//model mongo
const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug);

const articalCategorySchema = new mongoose.Schema(
    {     
        title : String,
        description: String,
        parent_id: {
            type: String,
            default: ""
        }, 
        thumbnail: String,
        status: String,
        position: Number,
        slug: {
            type: String,
            slug:"title",
            unique: true
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

const category = mongoose.model('articalCategorys',articalCategorySchema,"articalCategorys")

module.exports = category;