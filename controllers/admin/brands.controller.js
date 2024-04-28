const Brand = require('../../model/brands.model')
const systemConfig = require("../../config/system");
//[GET] /admin/brands
module.exports.index = async (req,res) =>{
    let find ={
        deleted: false, 
    }
    const brands = await Brand.find(find)
    res.render(
        "admin/page/brands/index.pug",
        {
            pageTitle: "Thương hiệu",
            brands: brands
        }
    )
}
//[GET] /admin/brands/create
module.exports.create = async (req,res) =>{
    res.render(
        "admin/page/brands/create.pug",
        {
            pageTitle: "Tạo thương hiệu",
        }
    )
}
//[POST] /admin/brands/create
module.exports.createPost = async (req,res) =>{
    console.log(req.body)
    const record = new Brand(req.body)
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/brands`)
}