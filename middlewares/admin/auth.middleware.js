const systemConfig = require("../../config/system");
const Account = require("../../model/accounts.model")   
const Role = require("../../model/roles.model")
module.exports.requireAuth = async (req, res, next) =>{
    if(!req.cookies.token){
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    }
    else{
        const user = await Account.findOne({token : req.cookies.token}).select("-password")
        if(!user){
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        }
        else{
            const role = await Role.findOne({
                _id: user.role_id
            })
            res.locals.userMDW = user 
            res.locals.roleMDW = role
            next()
        }
    }
}