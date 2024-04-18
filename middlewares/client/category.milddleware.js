const productsCategory = require('../../model/products-category.model')
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helper/createTree")
module.exports.category = async (req,res,next)=>{
    let find ={
        deleted: false, 
    }
    const categorys = await productsCategory.find(find)
    const categorysTree = createTreeHelper.tree(categorys,"")
    res.locals.categorys = categorysTree;
    next()
}