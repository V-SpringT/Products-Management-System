
const systemConfig = require("../../config/system");
const productsCategory = require('../../model/products-category.model')
const Product = require("../../model/products.model");
const Account = require("../../model/accounts.model")


// [GET] /search
module.exports.index = async (req,res)=>{
    // try{
        const siderVar = {
            size : [35,36,37,38,39,40,41,42,43,44,45],
            type : ["Low-top","Mid-top","High-top"],
            price : [500000,1000000,1500000,3000000,5000000],
        }

        const keyword = req.query.keyword;
        let newProducts = []
        if(keyword){
            const keywordRegrex = new RegExp(keyword, "i")
            
            const products = await Product.find({
                title: keywordRegrex,
                status: "active",
                deleted: false
            })
            newProducts = products.map(item=>{
                item.newPrice = (item.price*(100-item.discountPercentage)/100).toFixed(0);
                return item;
            })
            
        } 
        res.render("client/page/search/index",{
            pageTitle: "Trang tìm kiếm sản phẩm",
            keyword: keyword,
            products: newProducts,
            siderVar: siderVar
        });
        
    // }
    // catch(e){
    //     res.redirect("/")
    // }
}   