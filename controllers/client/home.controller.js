
const systemConfig = require("../../config/system");
const productsCategory = require('../../model/products-category.model')
const Product = require("../../model/products.model");
const createTreeHelper = require("../../helper/createTree")
const Account = require("../../model/accounts.model")
// [GET] /home
module.exports.index = async (req,res)=>{
    //featured product
    const featuredProducts = await Product.find(
        {deleted: false, status:"active", featured:"1"})
    const newProducts = featuredProducts.map(item => {
        item.newPrice = (
            (item.price*(100 - item.discountPercentage))/100
        ).toFixed(0)
        return item;
    })
    //end featured product
    res.render("client/page/home/index",{
        pageTitle: "Trang chu",
        featuredProducts: newProducts
    });
}   