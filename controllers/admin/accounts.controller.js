const systemConfig = require("../../config/system");
const Account = require("../../model/accounts.model")
const md5 = require("md5")
const Role = require("../../model/roles.model")

// [GET] /admin/accounts
module.exports.index = async (req,res)=>{
    let find = {
        deleted : false
    }
    const accounts  = await Account.find(find).select("-password -token")
    for (const item of accounts) {
        const role = await Role.findOne({
            deleted: false,
            _id: item.role_id
        })
        item.role= role
    }
    res.render("admin/page/accounts/index.pug",{
        pageTitle: "Trang danh sách tài khoản",
        accounts: accounts,
    });
}
// [GET] /admin/accounts/create
module.exports.create = async (req,res)=>{
    const find = {deleted: false}
    const roles = await Role.find(find)
    
    res.render("admin/page/accounts/create.pug",{
        pageTitle: "Trang tạo tài khoản",
        roles: roles
    });
}
// [POST] /admin/accounts/create
module.exports.createPost = async (req,res)=>{
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
    })
    if(emailExist){
        req.flash("error", "Email đã tồn tại")
        res.redirect("back")
    }
   else{
        req.body.password = md5( req.body.password)

        console.log(req.body)
        const account = new Account(req.body)
        await account.save()

        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
   }
}
// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req,res)=>{
    const find = {
        deleted: false,
        _id: req.params.id
    }
    try{
        const roles = await Role.find({deleted: false})
        const data = await Account.findOne(find)
        res.render("admin/page/accounts/edit.pug",{
            pageTitle: "Trang sửa thông tin tài khoản",
            roles: roles,
            account: data
        });
    }
    catch(e){
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}
// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req,res)=>{
    const emailExist = await Account.findOne({
        _id: {$ne: req.params.id},
        email: req.body.email,
        deleted: false
    })
    if(emailExist){
        req.flash("error", "Email đã tồn tại")
        res.redirect("back")
        return
    }
    else{
        if(req.body.password){
            req.body.password = md5(req.body.password)
        }
        else{
            delete req.body.password
        }
        console.log(req.body)
        await Account.updateOne({_id: req.body.id}, req.body)
        
        req.flash("success", "Cập nhật thành công")
        res.redirect(`back`)
        
    }
    
}