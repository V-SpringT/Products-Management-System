const systemConfig = require("../../config/system");
const Role = require("../../model/roles.model")

// [GET] /admin/roles
module.exports.index = async (req,res)=>{
    let find = {
        deleted : false
    }
    const roles  = await Role.find(find)
    res.render("admin/page/roles/index.pug",{
        pageTitle: "Trang nhóm quyền",
        roles: roles
    });
}
// [GET] /admin/roles/create
module.exports.create = async (req,res)=>{
    res.render("admin/page/roles/create.pug",{
        pageTitle: "Trang tạo nhóm quyền",
    });
}
// [POST] /admin/roles/create
module.exports.createPost = async (req,res)=>{
    console.log(req.body)
    const role = new Role(req.body)
    await role.save()

    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}