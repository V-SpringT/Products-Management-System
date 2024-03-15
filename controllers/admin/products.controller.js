// [GET] /admin/products
const Product = require("../../model/products.model");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");

module.exports.index = async (req,res)=>{

   const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false
    }

    if(req.query.status){
        find.status = req.query.status
    }
    
    //search
    
    const searchObject = searchHelper(req.query);
    if(searchObject.regrex){
        find.title = searchObject.regrex;
    }

    //query data
    const products = await Product.find(find);

    res.render("admin/page/products/index.pug",{
        pageTitle: "Trang san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: searchObject.keyword
    });
}