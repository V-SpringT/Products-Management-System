const Cart = require("../../model/carts.model");
const Product = require("../../model/products.model");
const Order = require("../../model/orders.model");
//[get] /checkout
module.exports.index = async(req,res) =>{
    const cartId = req.cookies.cartId;

    const cart = await Cart.findOne({
        _id: cartId
    })
    if(cart.products.length >0){
        for (const product of cart.products) {
            const productId = product.product_id;
            const productInfor = await Product.findOne({
                _id: productId
            })
            productInfor.newPrice = (productInfor.price*(100-productInfor.discountPercentage)/100).toFixed(0);
            product.productInfor = productInfor
            product.totalPrice = product.quantity * productInfor.newPrice
        }
    }
    cart.total = cart.products.reduce((sum, item)=>sum+item.totalPrice,0)
    res.render("client/page/checkout/index.pug",{
        pageTitle: "Thanh toán",
        cart: cart
    })
}
//[post] /order
module.exports.order = async (req, res) =>{
    const cartId = req.cookies.cartId
    const cart = await Cart.findOne({
        _id: cartId
    })
    const products = []

    for(const product of cart.products) {
        const productInfor = await Product.findOne({
            _id: product.product_id
        })

        const objectProduct = {
            product_id : product.product_id,
            price: productInfor.price,
            discountPercentage: productInfor.discountPercentage,
            quantity: product.quantity
       } 

       products.push(objectProduct)
    }
    const objectOder = {
        cart_id : cartId,
        userInfor: req.body,
        products: products
    }
    
    const order = new Order(objectOder)
    order.save();

    await Cart.updateOne({
        _id: cartId 
    },{ 
        products: []
    })

    res.redirect(`/checkout/success/${order.id}`)
    
}
// [get] /checkout/success/:orderId
module.exports.success = async (req, res)=>{
    const orderId = req.params.orderId;

    const order = await Order.findOne({
        _id: orderId
    })

    for(const product of order.products) {
        const productInfor = await Product.findOne({
            _id: product.product_id
        })

        productInfor.newPrice = (productInfor.price*(100-productInfor.discountPercentage)/100).toFixed(0);
        product.productInfor = productInfor
        product.totalPrice = product.quantity * productInfor.newPrice
    }
    
    order.total = order.products.reduce((sum, item)=>sum+item.totalPrice,0)
    res.render("client/page/checkout/success",{
        pageTitle: "Đặt hàng thành công",
        order: order
    })
}
