const category = require("../../model/products-category.model")
const product = require("../../model/products.model")
const admin = require("../../model/accounts.model")
const client = require("../../model/users.model")

// [GET] /admin/dashboard
module.exports.dashboard = (req,res)=>{

    const statistic = {
        category: {
            total: 0,
            active: 0,
            inactive: 0
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0
        },
        admin: {
            total: 0,
            active: 0,
            inactive: 0
        },
        client: {
            total: 0,
            active: 0,
            inactive: 0
        }
    }

    //them sau 
    res.render("admin/page/dashboard/index.pug",{
        pageTitle: "Trang tong quan",
        statistic: statistic
    });
}