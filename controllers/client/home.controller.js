// [GET] /home
module.exports.index = (req,res)=>{
    res.render("client/page/home/index",{
        pageTitle: "Trang chu"
    });
}