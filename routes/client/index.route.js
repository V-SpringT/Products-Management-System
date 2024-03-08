const productRoutes = require('./product.route')
const homeRoutes = require('./home.route');

module.exports = (app)=>{
    
    app.use('/',homeRoutes);

    app.use('/',productRoutes); // gan /product sang vi ban dau la /product r
     
}