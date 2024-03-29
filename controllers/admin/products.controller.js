// [GET] /admin/products
const Product = require("../../model/products.model");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
const systemConfig = require("../../config/system");
 
module.exports.index = async (req,res)=>{

    // Filter
   const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false
    }

    if(req.query.status){
        if(req.query.status == "deleted"){
            find.deleted = true
        }
        else{
            find.status = req.query.status
        }
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
        pagination: paginationObject,
        find: find
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
            console.log("success")
            await Product.updateMany(
                {_id: {$in: ids}},
                {
                    deleted: true,
                    deletedTime: new Date()
                }
            )
            req.flash("success",`Xóa thành công ${ids.length} sản phẩm`)
            break
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

// [PATCH] /admin/products/restore/:id

module.exports.restoreItem = async (req,res) =>{
    console.log(req.params)
    const id = req.params.id;
    await Product.updateOne(
        {_id: id},
        {
            deleted: false,
            $unset : {
                deletedTime: 1
            }
        }
    )
    req.flash("success",`Khôi phục thành công sản phẩm`)
    res.redirect('back')
}

// [GET] /admin/products/create
module.exports.create = async (req,res) =>{
    res.render("admin/page/products/create",{
        pageTitle: "Thêm mới sản phẩm"
    })

}
// [POST] /admin/products/create
module.exports.createPost = async (req,res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseFloat(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if(isNaN(req.body.positon)){
        const counter = await Product.countDocuments()
        req.body.position = parseInt(counter + 1)
    }
    else{
        req.body.position = parseInt(req.body.positon)
    }

    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    console.log(req.body)
    const product = new Product(req.body)
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

//[GET] /admin/products/edit/:id

module.exports.edit = async (req,res) => {

    try{
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find)
    
        console.log(product)
    
        res.render("admin/page/products/edit",{
            pageTitle: "Sửa thông tin sản phẩm",
            product: product
        })
    }
    catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}

//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req,res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseFloat(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = req.body.positon


    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }
    try{
        console.log(req.body)
        await Product.updateOne({_id: req.params.id}, req.body)
        req.flash("success",`Sửa thông tin sản phẩm thành công`)
    }catch(error){
        req.flash("error",`Sửa thông tin sản phẩm thất bại`)
    }
    
    res.redirect(`back`)
}

//[GET] /admin/products/detail/:id

module.exports.detail = async (req,res) => {
    try{
        const find ={
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find)

        res.render("admin/page/products/detail",{
            pageTitle: product.title,
            product: product
        })
    }
    catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}
