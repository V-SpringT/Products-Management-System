const systemConfig = require("../../config/system");
const Account = require("../../model/accounts.model")
const md5 = require('md5')
// [GET] /admin/auth/login
module.exports.index = async (req,res)=>{
    res.render("admin/page/auth/login.pug",{
        pageTitle: "Trang đăng nhập",
    });
}
// [POST] /admin/auth/login
module.exports.indexPost = async (req,res)=>{
    const {email,password} = req.body
    
    const user = await Account.findOne({
        deleted: false,
        email: email,
    })

    if(!user){
        req.flash("error", "Email không tồn tại")
        res.redirect("back")
        return;
    }

    if(md5(password)!=user.password){
        req.flash("error", "Mật khẩu không đúng")
        res.redirect("back")
        return;
    }

    if(user.status=="inactive"){
        req.flash("error", "Tài khoản đã bị khóa")
        res.redirect("back")
        return;
    }
    res.cookie("token", user.token)
   res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}