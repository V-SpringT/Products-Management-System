const Cart = require("../../model/carts.model");
const Product = require("../../model/products.model");
//[get] /cart
module.exports.index = async(req,res) =>{
    try{
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
        res.render("client/page/cart/index.pug",{
            pageTitle: "Giỏ hàng",
            cart: cart
        })
    }
    catch(e){

    }
}
//[get] /delete/:productId
module.exports.delete = async(req,res) =>{
    const productId = req.params.productId
    const cartId = req.cookies.cartId;

    await Cart.updateOne({
        _id: cartId
    },{
        "$pull": {products: {"product_id": productId}}
    })
    req.flash("success", "Xóa thành công")
    res.redirect("back")
}
//[post] /cart/add/:productId
module.exports.addPost = async(req,res) =>{
    const cartId = req.cookies.cartId;           
    const productId = req.params.productId;
    const quantity = parseInt(req.body.quantity);

    const cartObject = {
        product_id : productId,
        quantity: quantity
    } 


    const cart = await Cart.findOne({
        _id: cartId
    })

    console.log(cart.products)

    const existProduct = cart.products.find(item => item.product_id == productId)
    if(existProduct){
        const curQuantity = quantity + existProduct.quantity;
        await Cart.updateOne(
            {
                _id: cartId,
                'products.product_id': productId
            },
            {
                'products.$.quantity': curQuantity
            }
        )
    }
    else{
        await Cart.updateOne(
            {
                _id: cartId
            },
            {
                $push: {products : cartObject}
            }
        )
    }
    
    req.flash("success", "Thêm vào giỏ hàng thành công")
    res.redirect("back")
}
//[get] /update/:productId/:quantity
module.exports.update = async (req,res) =>{
    const productId = req.params.productId
    const cartId = req.cookies.cartId;
    const quantity = req.params.quantity

    console.log(quantity)
    await Cart.updateOne({
        _id: cartId,
        'products.product_id': productId
    },{
        'products.$.quantity': quantity
    })
    req.flash("success", "Cập nhật thành công")
    res.redirect("back")
}
