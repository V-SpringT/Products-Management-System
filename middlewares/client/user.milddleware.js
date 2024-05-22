const User = require("../../model/users.model")

module.exports.infoUser = async (req,res, next) => {
    const token = req.cookies.tokenUser;
    if(token){
        const user = await User.findOne({
            tokenUser: token,
            deleted: false
        }).select("-password")

        res.locals.userMDW = user;
    }
    else{
    }
    next();
}