// [GET] /admin/products
const Product = require("../../model/products.model");



module.exports.index = async (req,res)=>{
    const products = await Product.find({
        deleted: false
    });

    res.render("admin/page/products/index.pug",{
        pageTitle: "Trang san pham",
        products: products
    });
}