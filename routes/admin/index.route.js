const systemConfig = require("../../config/system.js")

const dashboardRoutes = require("./dashboard.route.js");
const products = require("./products.route.js")
const productsCategory = require("./products-category.route.js")
const roles = require("./roles.route.js")
const accounts = require("./accounts.route.js")
const auth = require("./auth.route.js")
const myAccount = require("./my-account.route.js")
const brand = require("./brands.route.js")
const articalRoutes = require("./artical.route.js")
const articalCatgoryRoutes = require("./artical-category.route.js")
const authMiddleware = require("../../middlewares/admin/auth.middleware")

module.exports = (app)=>{
    const PATH_ADMIN =systemConfig.prefixAdmin;
    
    app.use(
        PATH_ADMIN + '/dashboard',
        authMiddleware.requireAuth,
        dashboardRoutes
    );
    app.use(
        PATH_ADMIN + "/products",
        authMiddleware.requireAuth,
        products
    )
    app.use(
        PATH_ADMIN + "/products-category",
        authMiddleware.requireAuth,
        productsCategory
    )
    app.use(
        PATH_ADMIN + "/roles",
        authMiddleware.requireAuth,
        roles 
    )
    app.use(PATH_ADMIN + "/accounts",
    authMiddleware.requireAuth,
    accounts
    )
    app.use(PATH_ADMIN + "/auth", auth)
    app.use(
        PATH_ADMIN + "/my-account", 
        authMiddleware.requireAuth,
        myAccount
    )
    app.use(
        PATH_ADMIN + "/brands", 
        authMiddleware.requireAuth,
        brand
    )

    app.use(
        PATH_ADMIN + '/artical',
        authMiddleware.requireAuth,
        articalRoutes
    )

    app.use(
        PATH_ADMIN + '/artical-category',
        authMiddleware.requireAuth,
        articalCatgoryRoutes
    )
}