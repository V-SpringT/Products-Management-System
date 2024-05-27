const articalCategory = require('../../model/artical-categoty.model')
const systemConfig = require("../../config/system");
const Artical = require("../../model/artical.model")
//[GET] /admin/artical-category
module.exports.index = async (req,res) =>{
    let find = {
        deleted: false,
    }
    const articals = await Artical.find(find)
    res.render(
        "admin/page/artical/index.pug",
        {
            pageTitle: "Bài viết",
            articals: articals
        }
    )
}

//[GET] /admin/artical/create
module.exports.create = async (req,res) =>{
    let find={
        deleted: false,
    }
    const categorys = await articalCategory.find(find)
    res.render(
        "admin/page/artical/create.pug",
        {
            pageTitle: "Thêm bài viết",
            categorys: categorys
        }
    )
}

//[POST] /admin/artical/create
module.exports.createPost = async (req,res) =>{
    if(isNaN(req.body.positon)){
        const counter = await Artical.countDocuments()
        req.body.position = parseInt(counter + 1)
    }
    else{
        req.body.position = parseInt(req.body.positon)
    }
    console.log(req.body)
    const record = new Artical(req.body)
    await record.save();
    req.flash("success", "Thêm mới danh mục thành công")
    res.redirect(`${systemConfig.prefixAdmin}/artical`)
}

