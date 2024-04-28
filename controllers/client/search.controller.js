
const systemConfig = require("../../config/system");
const productsCategory = require('../../model/products-category.model')
const Product = require("../../model/products.model");
const Account = require("../../model/accounts.model")


// [GET] /home
module.exports.index = async (req,res)=>{
    try{
        const keyword = req.query.keyword;
        if(keyword){
            const keywordRegrex = new RegExp(keyword, "i")
            
            const products = await Product.find({
                title: keywordRegrex,
                status: "active",
                deleted: false
            })
            const newProducts = products.map(item=>{
                item.newPrice = (item.price*(100-item.discountPercentage)/100).toFixed(0);
                return item;
            })
        } 
        res.render("client/page/search/index",{
            pageTitle: "Trang tìm kiếm sản phẩm",
            keyword: keyword,
            products: newProducts
        });
    }
    catch(e){
        res.redirect("/")
    }
}   