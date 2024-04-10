const systemConfig = require("../../config/system.js")

const dashboardRoutes = require("./dashboard.route.js");
const products = require("./products.route.js")
const productsCategory = require("./products-category.route.js")
module.exports = (app)=>{
    const PATH_ADMIN =systemConfig.prefixAdmin;
    
    app.use(PATH_ADMIN + '/dashboard',dashboardRoutes);
    app.use(PATH_ADMIN + "/products",products)
    app.use(PATH_ADMIN + "/products-category",productsCategory)
}