
const systemConfig = require("../../config/system");
const productsCategory = require('../../model/products-category.model')
const Product = require("../../model/products.model");
const Account = require("../../model/accounts.model")
const articalCategory = require("../../model/artical-categoty.model")
const createTreeHelper = require("../../helper/createTree")

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

    //lastest products
        const lastestProducts = await Product.find({
            deleted: false,
            status: "active",

        }).sort({position: "desc"}).limit(6)
        const lastestProductsUpdate = lastestProducts.map(item => {
            item.newPrice = (
                (item.price*(100 - item.discountPercentage))/100
            ).toFixed(0)
            return item;
        })
    //end lastest products


    //sale products
        const saleProducts = await Product.find({
            deleted: false,
            status: "active"
        }).sort({discountPercentage: "desc"}).limit(6)
        const saleProductsUpdate = saleProducts.map(item => {
            item.newPrice = (
                (item.price*(100 - item.discountPercentage))/100
            ).toFixed(0)
            return item;
        })
    //end sale products

    //category products
        const category = await productsCategory.find({
            deleted: false,
            status: "active"
        })
        // const category1 = createTreeHelper.tree(category,"") 
    //end category products
        const articalCategorys = await articalCategory.find({deleted: false, status: "active"})

    //category artical

    //end category artical
    res.render("client/page/home/index",{
        pageTitle: "Trang chu",
        featuredProducts: newProducts,
        lastestProducts: lastestProductsUpdate,
        saleProducts: saleProductsUpdate,
        productCategorys: category,
        articalCategorys: articalCategorys
    });
}   