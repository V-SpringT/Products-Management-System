const systemConfig = require("../../config/system");
const Account = require("../../model/accounts.model")

// [GET] /admin/my-account
module.exports.index = async (req,res)=>{
    
    res.render("admin/page/my-account/index.pug",{
        pageTitle: "Thông tin cá nhân",
    });
}
// [GET] /admin/my-account/edit
module.exports.edit = async (req,res)=>{
    
    res.render("admin/page/my-account/edit.pug",{
        pageTitle: "Chỉnh sửa thông tin cá nhân",
    });
}

// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req,res)=>{
    const emailExist = await Account.findOne({
        _id: {$ne: res.locals.userMDW.id},
        email: req.body.email,
        deleted: false
    })
    console.log(emailExist)
    if(emailExist){
        req.flash("error", "Email đã tồn tại")
        res.redirect("back")
        return
    }
    else{
        console.log(req.body)
        await Account.updateOne({_id: res.locals.userMDW.id}, req.body)
        
        req.flash("success", "Cập nhật thành công")
        res.redirect(`${systemConfig.prefixAdmin}/my-account`)
    }
    
}