// [GET] /admin/products
const Product = require("../../model/products.model");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
const systemConfig = require("../../config/system");
const productsCategory = require('../../model/products-category.model')
const createTreeHelper = require("../../helper/createTree")
const Account = require("../../model/accounts.model")
const Role = require("../../model/roles.model")
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

    //sort
    let sort = {};

    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    else{
        sort["position"] ="desc"
    }
    //end sort

    // Query data
    const products = await Product.find(find)
    .sort(sort)
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
    const updated = {
        accountId: res.locals.userMDW.id,
        updatedAt: new Date()
    }
    await Product.updateOne(
        {_id: id},
        {status: status, $push: {updatedBy: updated}}
    );

    req.flash("success","Cập nhật trạng thái thành công")

    res.redirect('back')
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req,res) => {
    console.log(req.body) //body parser
    const type = req.body.type
    const ids = req.body.ids.split(", ")
    const updated = {
        accountId: res.locals.userMDW.id,
        updatedAt: new Date()
    }
    const deleted = {
        accountId: res.locals.userMDW.id,
        deletedAt: new Date()
    }
    switch(type){
        case "active":
            await Product.updateMany({_id: {$in: ids}}, {status: "active",$push: {updatedBy: updated}})
            req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm`)
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids}}, {status: "inactive",$push: {updatedBy: updated}})
            req.flash("success",`Cập nhật trạng thái thành công ${ids.length} sản phẩm`)
            break;
        case "delete-all":
            console.log("success")
            await Product.updateMany(
                {_id: {$in: ids}},
                {
                    deleted: true,
                    $push: {deletedBy: deleted}
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
    const updated = {
        accountId: res.locals.userMDW.id,
        updatedAt: new Date()
    }
    const deleted = {
        accountId: res.locals.userMDW.id,
        deletedAt: new Date()
    }
    await Product.updateOne(
        { _id: id},
        {
            deleted: true,
            status: "inactive",
            $push: {deletedBy: deleted},
        }
    );
    req.flash("success",`Xóa thành công sản phẩm`)

    res.redirect('back')
}
// [GET] /admin/products/create
module.exports.create = async (req,res) =>{
    let find ={
        deleted: false,
    }
    const categorys = await productsCategory.find(find)
    const categorysTree = createTreeHelper.tree(categorys,"")
    res.render("admin/page/products/create",{
        pageTitle: "Thêm mới sản phẩm",
        categorys : categorysTree
    })

}
// [POST] /admin/products/create
module.exports.createPost = async (req,res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseFloat(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    console.log(req.file)
    if(isNaN(req.body.positon)){
        const counter = await Product.countDocuments()
        req.body.position = parseInt(counter + 1)
    }
    else{
        req.body.position = parseInt(req.body.positon)
    }
    console.log(res.locals.userMDW)
    req.body.createBy = {
        accountId: res.locals.userMDW.id
    }
    console.log(req.body)
    const product = new Product(req.body)
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`)
}
// [GET] /admin/products/deleted-products
module.exports.deletedProducts = async (req,res) =>{
    const find = {
        deleted: true
    }
    //pagination
    const countProducts = await Product.countDocuments(find);
    const paginationObject = paginationHelper(countProducts, req.query);
    //end pagination
    const deletedProducts = await Product
    .find(find)
    .sort({position: "desc"})
    .limit(paginationObject.limitItem)
    .skip(paginationObject.skip);

    res.render("admin/page/products/deleted",{
        pageTitle: "Sản phẩm đã xóa",
        products: deletedProducts,
        pagination: paginationObject
    })
}
// [POST] /admin/products/deleted-products/restore/:id
module.exports.restore = async (req,res) => {
    try{
        const restored = {
            accountId: res.locals.userMDW.id,
            restoredAt: new Date()
        }
        await Product.updateOne({
            _id: req.params.id  
        },{
            deleted: false,
            $push: {restoredBy: restored}
        })
        req.flash("success",`Khôi phục sản phẩm thành công`)
    }catch(err){
        req.flash("error",`Khôi phục sản phẩm thất bại`)
    }
    
    res.redirect("back")
}
//[GET] /admin/products/edit/:id
module.exports.edit = async (req,res) => {
    try{
        const categorys = await productsCategory.find({deleted: false})
        const categorysTree = createTreeHelper.tree(categorys,"")
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const product = await Product.findOne(find)
    
        console.log(product)
    
        res.render("admin/page/products/edit",{
            pageTitle: "Sửa thông tin sản phẩm",
            product: product,
            categorys: categorysTree
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

    try{
        const updated = {
            accountId: res.locals.userMDW.id,
            updatedAt: new Date()
        }
        console.log(req.body)
        await Product.updateOne(
            {_id: req.params.id}, 
            {
                ...req.body,
                $push: {updatedBy: updated}
            }
        )
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
        //  created person
        const userCreate = await Account.findOne({
            deleted: false, 
            _id : product.createBy.accountId
        })
        if(userCreate){
            const roleCreate = await Role.findOne({
                deleted: false, 
                _id : userCreate.role_id
            })
            product.userCreate = userCreate
            if(roleCreate) product.roleCreate = roleCreate
        }
        //  updated person
        const Update = product.updatedBy
        const userUpdate = []
        if(Update.length > 0){
            for(const obj of Update)  {
                const user = await Account.findOne({
                    deleted: false,
                    _id: obj.accountId
                })
                if(user){
                    const role = await Role.findOne({
                        deleted: false, 
                        _id : user.role_id
                    })
                    if(role){
                        user.role = role
                    }
                    userUpdate.push(user)
                }
            }
            product.userUpdate = userUpdate
        }
        //delete person
        const Delete = product.deletedBy
        const userDelete = []
        if(Delete.length > 0){
            for(const obj of Delete)  {
                const user = await Account.findOne({
                    deleted: false,
                    _id: obj.accountId
                })
                if(user){
                    const role = await Role.findOne({
                        deleted: false, 
                        _id : user.role_id
                    })
                    if(role){
                        console.log(role)
                        user.role = role
                    }
                    userDelete.push(user)
                }
            }
        }
        console.log(userDelete)
        product.userDelete = userDelete

        // restore person
        const Restore = product.restoredBy
        const userRestore= []
        if(Restore.length > 0){
            for(const obj of Restore)  {
                const user = await Account.findOne({
                    deleted: false,
                    _id: obj.accountId
                })
                if(user){
                    const role = await Role.findOne({
                        deleted: false, 
                        _id : user.role_id
                    })
                    if(role){
                        user.role = role
                    }
                    userRestore.push(user)
                }
            }
        }
        // console.log(userRestore)
        product.userRestore = userRestore

        //end
        
        res.render("admin/page/products/detail",{
            pageTitle: product.title,
            product: product
        })
    }
    catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}  
