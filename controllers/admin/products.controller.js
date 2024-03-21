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
    const products = await Product.find(find)
    .sort({position: "desc"})
    .limit(paginationObject.limitItem)
    .skip(paginationObject.skip);
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

    req.flash("success","Cập nhật trạng thái thành công")

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
            req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm`)
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: "inactive"})
            req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm`)
            break;
        case "delete-all":
            await Product.updateMany(
                {_id: {$in: ids}},
                {
                    deleted: true,
                    deletedTime: new Date()
                }
            )
            req.flash("success",`Xóa thành công ${ids.length} sản phẩm`)
        case "change-position":
            for (const item of ids) {
                let [id,pos] = item.split("-");
                pos = parseInt(pos);
                await Product.updateOne({_id: id},{position: pos})
            }
            req.flash("success",`Đổi vị trí thành công ${ids.length} sản phẩm`)
            break;
        default:
            break;
    }
    res.redirect('back');
}
    
// [DELETE] /admin/products/delete/:id

module.exports.deleteItem = async (req,res) => { 
    const id = req.params.id;
    await Product.updateOne(
        { _id: id},
        {
            deleted: true,
            deletedTime: new Date()
        }
    );
    req.flash("success",`Xóa thành công sản phẩm`)

    res.redirect('back')
}