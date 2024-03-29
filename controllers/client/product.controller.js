// [GET] /products

const Product = require("../../model/products.model");

module.exports.index = async (req,res)=>{
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({position: "desc"});

    const newProducts = products.map(item=>{
        item.newPrice = (item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    })

    res.render("client/page/product/index",{
        pageTitle: "Trang san pham",
        products: newProducts
    });


}


module.exports.detail = async (req,res)=>{
    try{
        const slug = req.params.slug
        const find = {
            deleted: false,
            status: 'active',
            slug: slug
        }

        const product = await Product.findOne(find)
        res.render("client/page/product/detail",{
            pageTitle: "Trang chi tiết sản phẩm",
            product: product
        });
    }
    catch(error){
        res.redirect('/products')
    }

}