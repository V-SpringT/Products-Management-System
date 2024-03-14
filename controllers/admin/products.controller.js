module.exports.index = (req,res)=>{
    res.render("admin/page/products/index.pug",{
        pageTitle: "Trang san pham",
    });
}