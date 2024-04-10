const productsCategory = require('../../model/products-category.model')
const systemConfig = require("../../config/system");
const createTreeHelper = require("../../helper/createTree")
//[GET] /admin/products-category
module.exports.index = async (req,res) =>{
    let find ={
        deleted: false,
    }
    const categorys = await productsCategory.find(find)
    const categorysTree = createTreeHelper(categorys,"")
    res.render(
        "admin/page/products-category/index.pug",
        {
            pageTitle: "Danh mục sản phẩm",
            categorys: categorysTree
        }
    )
}

//[GET] /admin/products-category/create
module.exports.create = async (req,res) =>{
    let find={
        deleted: false,
    }
    const categorys = await productsCategory.find(find)
    const categorysTree = createTreeHelper(categorys,"")
    res.render(
        "admin/page/products-category/create.pug",
        {
            pageTitle: "Danh mục sản phẩm",
            categorys: categorysTree
        }
    )
}

//[POST] /admin/products-category/create
module.exports.createPost = async (req,res) =>{
    if(isNaN(req.body.positon)){
        const counter = await productsCategory.countDocuments()
        req.body.position = parseInt(counter + 1)
    }
    else{
        req.body.position = parseInt(req.body.positon)
    }
    console.log(req.body)
    const record = new productsCategory(req.body)
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/products-category`)
}

//[GET] /admin/products-category/detail/:id
module.exports.detail = async (req,res) => {
    try{
        const find ={
            deleted: false,
            _id: req.params.id
        }
        const productCategorys = await productsCategory.findOne(find)

        res.render("admin/page/products-category/detail",{
            pageTitle: productCategorys.title,
            productCategorys: productCategorys
        })
    }
    catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/products-category`)
    }
}
