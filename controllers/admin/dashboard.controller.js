// [GET] /admin/dashboard
module.exports.dashboard = (req,res)=>{
    res.render("admin/page/dashboard/index.pug",{
        pageTitle: "Trang tong quan",
    });
}