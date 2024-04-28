
const Product = require("../../model/products.model");
const productsCategory = require("../../model/products-category.model");
const paginationHelper = require("../../helper/pagination");
const CategoryHelper = require("../../helper/product-category")
const Brand = require("../../model/brands.model")
// [GET] /products
module.exports.index = async (req,res)=>{ 
    try{
        const find = {
            status: "active",
            deleted: false
        }
        //pagination
            const limitedItem = 16

            const countProducts = await Product.countDocuments(find);
            const paginationObject = paginationHelper(countProducts, req.query, limitedItem);
        //end pagination

        const products = await Product
        .find(find)
        .sort({position: "desc"})
        .limit(paginationObject.limitedItem)
        .skip(paginationObject.skip);
    
        const newProducts = products.map(item=>{
            item.newPrice = (item.price*(100-item.discountPercentage)/100).toFixed(0);
            return item;
        })
        const brands = await Brand.find(find)
        const siderVar = {
            size : [35,36,37,38,39,40,41,42,43,44,45],
            type : ["Low-top","Mid-top","High-top"],
            price : [500000,1000000,1500000,3000000,5000000],
            brands : brands
        }
        
        res.render("client/page/product/index",{
            pageTitle: "Trang san pham",
            products: newProducts,
            pagination: paginationObject,
            siderVar : siderVar
        });
    }
    catch(e){
        res.redirect("/products")
    }


}

// [GET] /products/detail/:slug
module.exports.detail = async (req,res)=>{
    try{
        const slug = req.params.slug
        const find = {
            deleted: false,
            status: 'active',
            slug: slug
        }

        const product = await Product.findOne(find)

        
        if(product){
            if(product.category_id){
                const category = await productsCategory.findOne({
                    _id: product.category_id,
                    status: "active",
                    deleted: false
                })
                product.category = category
            }

            product.newPrice =  (product.price*(100-product.discountPercentage)/100).toFixed(0);

            res.render("client/page/product/detail",{
                pageTitle: "Trang chi tiết sản phẩm",
                product: product
            });
        }
        else{
            res.redirect('/products')
        }
        
    }
    catch(error){
        res.redirect('/products')
    }

}
// [GET] /products/:slugCategory
module.exports.productOfCategory = async (req,res)=>{
    try{
        
        const slug = req.params.slugCategory;
        
        const productCategory = await productsCategory.findOne({
            slug : slug,
            deleted: false
        })
        const listSubCategory = await CategoryHelper.getSubCategory(productCategory.id)
        const listSubCategoryId = await listSubCategory.map(item => {
            return item.id
        })
        const products = await Product.find({
            category_id: {$in : [productCategory.id,...listSubCategoryId]},
            deleted: false,
            status: "active"
        })
        const productsUpdate = products.map(item=>{
            item.newPrice = (item.price*(100-item.discountPercentage)/100).toFixed(0);
            return item;
        })
        res.render("client/page/product/index",{
            pageTitle: productCategory.title,
            products : productsUpdate
        })

    }
    catch(e){
        res.redirect("/products")
    }


}