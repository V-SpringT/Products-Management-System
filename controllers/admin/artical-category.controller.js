const articalCategory = require('../../model/artical-categoty.model')
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helper/createTree")
//[GET] /admin/artical-category     
module.exports.index = async (req,res) =>{
    let find ={
        deleted: false,
    }
    const categorys = await articalCategory.find(find)
    const categorysTree = createTreeHelper.tree(categorys,"")
    res.render(
        "admin/page/artical-category/index.pug",
        {
            pageTitle: "Danh mục sản phẩm",
            categorys: categorysTree
        }
    )
}

//[GET] /admin/artical-category/create
module.exports.create = async (req,res) =>{
    let find={
        deleted: false,
    }
    res.render(
        "admin/page/artical-category/create.pug",
        {
            pageTitle: "Thêm danh mục bài viết",
        }
    )
}

//[POST] /admin/artical-category/create
module.exports.createPost = async (req,res) =>{
    if(isNaN(req.body.positon)){
        const counter = await articalCategory.countDocuments()
        req.body.position = parseInt(counter + 1)
    }
    else{
        req.body.position = parseInt(req.body.positon)
    }
    console.log(req.body)
    const record = new articalCategory(req.body)
    await record.save();
    req.flash("success", "Thêm mới danh mục thành công")
    res.redirect(`${systemConfig.prefixAdmin}/artical-category`)
}

//[Delete] /admin/artical-category/delete/:id
module.exports.delete = async (req,res) => {
    try{
        const id = req.params.id
        const deleted = {
            accountId: id,
            deletedAt: new Date()
        }
        await articalCategory.updateOne(
            {_id: id},
            {deleted: true, status: "inactive"}
        )
        req.flash("success", "Xóa danh mục thành công")
        res.redirect("back")
    }
    catch(e){
        req.flash("error", "Xóa danh mục không thành công")
        res.redirect("back")
    }
}