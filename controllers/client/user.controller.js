const systemConfig = require("../../config/system");
const User = require("../../model/users.model")
const forgotPassword = require("../../model/forgot-password.model")
const generate = require("../../helper/generate")
const md5 = require("md5")
const sendMailHelper = require("../../helper/sendMail")
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

//[get] /user/logout
module.exports.logout = async (req,res) => {
    res.clearCookie("tokenUser")
    res.redirect("/")
}

//[get] /password/forgot

module.exports.forgotPassword = async (req,res) =>{
    res.render("client/page/user/forgot-password.pug")
}

//[post] /password/forgot
module.exports.forgotPasswordPost = async (req,res) =>{
    const email = req.body.email
    const user = await User.findOne({
        email: email,
        deleted: false
    })
    if(!user){
        req.flash("error", "Email Không tồn tại");
        res.redirect("back");
        return
    }

    // create otp
    const objForgotPassword = {
        email: email,
        otp: "",
        expireAt: Date.now()
    }

    objForgotPassword.otp = generate.generateRandomNumber(6);

    const newforgotPass = new forgotPassword(objForgotPassword)
    newforgotPass.save();

    sendMailHelper.sendMail(email,objForgotPassword.otp, "Xác thực quên mật khẩu");
    
    res.redirect(`/user/password/otp?email=${email}`)
}


//[get] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email
    console.log("troi oi")
    res.render("client/page/user/otpPassword.pug",{
        pageTitle: "Nhập mã OTP",
        email: email
    })
}

//[post] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email
    const otp = req.body.otp

    const result = await forgotPassword.findOne({
        email: email,
        otp: otp
    })

    if(!result){
        req.flash("error", "otp không đúng");
        res.redirect("back");
        return
    }

    const user = await User.findOne({
        email: email
    })

    res.cookie("tokenUser", user.tokenUser)

    res.redirect("/user/password/reset")
}
//[get] /user/password/reset
module.exports.resetPassword = async (req, res) => {
    res.render("client/page/user/reset-password.pug")
}
//[post] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    const tokenUser = req.cookies.tokenUser;

    if(password != confirmPassword){
        req.flash("error", "Mật khẩu không trùng khớp!")
        res.redirect("back");
        return;
    }
    
    await User.updateOne({
        tokenUser: tokenUser
    },{
        password: md5(password)
    })
    req.flash("Đổi mật khẩu thành công")
    res.redirect("/")
}
