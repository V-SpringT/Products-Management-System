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

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req,res)=>{
    try{
        const id = req.params.id

        let find = {
            _id : id,
            deleted: false
        }

        const role = await Role.findOne(find)

        res.render("admin/page/roles/edit",{
            pageTitle : "Sửa nhóm quyền",
            role : role
        })
    }catch(e){
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }

}

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req,res)=>{
    try{
        const id = req.params.id


        await Role.updateOne({_id : id},req.body)
    
        
        req.flash("success",`Sửa thông tin sản phẩm thành công`)
    }catch(e){
        req.flash("error",`Sửa thông tin sản phẩm thất bại`)
    }
    res.redirect('back')
}
// [GET] /admin/permissions
module.exports.permissions = async (req,res)=>{
    const find = {
        deleted: false
    }

    const roles = await Role.find(find)

    res.render("admin/page/roles/permissions", {
        pageTitle: "Phân quyền",
        roles: roles
    })
}

// [PATCH] /admin/permissions
module.exports.permissionsPatch  = async (req,res)=>{
    console.log(req.body)
    try{
        const permissions = JSON.parse(req.body.permissions)
        for (const item of permissions) {
            const id = item.id
            const permission = item.permissions
            await Role.updateOne({_id : id},{permissions : permission})
        }
        req.flash("success",`Sửa thông tin sản phẩm thành công`)
    }
    catch(e){
        req.flash("error",`Sửa thông tin sản phẩm thất bại`)
    }
    res.redirect("back")
}
 