// [GET] /products

const product = require("../../model/products.model");

module.exports.index = async (req,res)=>{
    const products = await product.find({
        status: "active",
        deleted: false
    }).sort({position: "desc"});

    const newProducts = products.map(item=>{
        item.newPrice = (item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    })

    res.render("client/page/product/index",{
        pageTitle: "Trang san pham",
        products: newProducts
    });


}