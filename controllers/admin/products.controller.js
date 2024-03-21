// [GET] /admin/products
const Product = require("../../model/products.model");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
 
module.exports.index = async (req,res)=>{

    // Filter
   const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false
    }

    if(req.query.status){
        find.status = req.query.status
    }
    // End Filter
    
    // Search
    
    const searchObject = searchHelper(req.query);
    if(searchObject.regrex){
        find.title = searchObject.regrex;
    }

    // End Search

    // Pagination

    const countProducts = await Product.countDocuments(find);
    const paginationObject = paginationHelper(countProducts, req.query);

    // End Pagination 

    // Query data
    const products = await Product.find(find).limit(paginationObject.limitItem).skip(paginationObject.skip);
    res.render("admin/page/products/index.pug",{
        pageTitle: "Trang san pham",    
        products: products,
        filterStatus: filterStatus,
        keyword: searchObject.keyword,
        pagination: paginationObject
    });

    // End Query Data 
}
// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req,res)=>{
    const status = req.params.status
    const id = req.params.id
    await Product.updateOne({_id: id},{status: status});
    res.redirect('back')
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res) => {
    console.log(req.body) //body parser
    const type = req.body.type
    const ids = req.body.ids.split(", ")
    switch(type){
        case "active":
            await Product.updateMany({_id: {$in: ids}}, {status: "active"})
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: "inactive"})
            break;
        default:
            break;
    }
    res.redirect('back');
}
    
// [DELETE] /admin/products/delete/:id

module.exports.deleteItem = async (req,res) => { 
    const id = req.params.id;
    await Product.updateOne({ _id: id},{deleted: true})

    res.redirect('back')
}