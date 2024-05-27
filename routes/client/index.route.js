const productRoutes = require('./product.route')
const homeRoutes = require('./home.route');
const searchRoutes = require('./search.route');
const cartRoutes = require('./cart.route');
const checkoutRoutes = require('./checkout.route');
const userRoutes = require('./user.route');
const articalRoutes = require('./artical.route');

const categoryMiddleware = require("../../middlewares/client/category.milddleware")
const cartMiddleware = require("../../middlewares/client/cart.milddleware")
const userMiddleware = require("../../middlewares/client/user.milddleware")
const authMiddleware = require("../../middlewares/client/auth.middleware")
module.exports = (app)=>{
    app.use(categoryMiddleware.category)
    // app.use(cartMiddleware.cartId)
    app.use(
        '/',
        userMiddleware.infoUser,
        homeRoutes
    );

    app.use(
        '/products',
        userMiddleware.infoUser,
        productRoutes
    ); 
    app.use(
        '/search',
        userMiddleware.infoUser,
        searchRoutes
    )
    app.use(
        '/cart',
        authMiddleware.requireAuth,
        cartRoutes
    )
    app.use(
        '/checkout',
        authMiddleware.requireAuth,
        checkoutRoutes
    )
    app.use(
        '/user',
        userRoutes
    )

    app.use(
        '/artical',
        articalRoutes
    )

    
}
