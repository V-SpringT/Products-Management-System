const systemConfig = require("../../config/system");
const User = require("../../model/users.model")
const md5 = require("md5")
// [GET] /user/register
module.exports.register = async (req,res)=>{
    res.render("client/page/user/register.pug")
}
// [POST] /user/register
module.exports.registerPost = async (req,res)=>{
    const existEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    })
    if(req.body.password !== req.body.passwordCF){
        req.flash("error", "Mật khẩu không giống nhau")
        res.redirect("back")
        return
    }
    if(existEmail){
        req.flash("error", "Email đã tồn tại")
        res.redirect("back")
        return
    }

    req.body.password = md5(req.body.password);
    delete req.body.passwordCF

    console.log( req.body)
    const user = new User(req.body)
    await user.save()
    res.cookie("tokenUser", user.tokenUser)
    res.redirect("/")
}

// [get] /user/login
module.exports.login = async (req,res)=>{
    res.render("client/page/user/login.pug",{
        pageTitle: "Đăng nhập"
    })
}
//[post] /user/login
module.exports.loginPost = async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const user = await User.findOne({
        email: req.body.email,
        deleted: false
    })

    if(!user){
        req.flash("error", "Email không tồn tại")
        res.redirect("back")
        return
    }

    if(md5(password) !== user.password){
        req.flash("error", "Sai mật khẩu")
        res.redirect("back")
        return
    }

    if(user.status == 'inactive'){
        req.flash("error", "Tài khoản đã bị khóa")
        res.redirect("back")
        return
    }
    res.cookie("tokenUser", user.tokenUser)
    res.redirect("/")
}
