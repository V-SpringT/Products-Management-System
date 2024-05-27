
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

        const brands = await Brand.find(find)
        const siderVar = {
            size : [35,36,37,38,39,40,41,42,43,44,45],
            type : ["Low-top","Mid-top","High-top"],
            price : [500000,1000000,1500000,3000000,5000000],
            brands : brands
        }
        
        //sale products
            const saleProducts = await Product.find({
                deleted: false,
                status: "active"
            }).sort({discountPercentage: "desc"}).limit(6)
            const saleProductsUpdate = saleProducts.map(item => {
                item.newPrice = (
                    (item.price*(100 - item.discountPercentage))/100
                ).toFixed(0)
                return item;
            })
        //end sale products

        //sort
            const sort = {}
            const sortKey = req.query.sortKey;
            const sortValue = req.query.sortValue;
            if(sortKey && sortValue){
                sort[sortKey] = sortValue
            }
            else{
                sort.position = 'desc'
            }
        //end sort 

        // brand checkbox
            const brand_id = req.query.brand
            if(brand_id){
                find.brand_id = brand_id
            }
        // end brand checkbox

        //type checkbox
            if(req.query.type){
                const typeList = req.query.type.split("-")
                const type = typeList.map(item=>{
                    return siderVar.type[parseInt(item)];
                })
                
                find.type = {$in: type};
            }
        //end type checkbox
        
        //price ratio
            if(req.query.priceRadio){
                const priceIdx = parseInt(req.query.priceRadio)
                find.price = {$lt: siderVar.price[priceIdx] }
            }
        //end price ratio

        //price input
            if(req.query.priceInput){
                const priceInput = req.query.priceInput.split("-").map(item =>{
                    return parseInt(item)
                })
                if(priceInput.length >0){
                    find.price = {
                        $gt: priceInput[0],
                        $lt: priceInput[1]
                    }
                }
            }
        //end price input

        //pagination
            const limitedItem = 16

            const countProducts = await Product.countDocuments(find);
            const paginationObject = paginationHelper(countProducts, req.query, limitedItem);
        //end pagination

        const products = await Product
        .find(find)
        .sort(sort)
        .limit(paginationObject.limitedItem)
        .skip(paginationObject.skip);
    
        const newProducts = products.map(item=>{
            item.newPrice = (item.price*(100-item.discountPercentage)/100).toFixed(0);
            return item;
        })
        
        
        res.render("client/page/product/index",{
            pageTitle: "Trang sản phẩm",
            products: newProducts,
            pagination: paginationObject,
            siderVar : siderVar,
            saleProducts: saleProductsUpdate
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
    // try{
        const sort = {

        }
        const find = {
            status: "active",
            deleted: false
        }
        const brands = await Brand.find(find)
        const siderVar = {
            size : [35,36,37,38,39,40,41,42,43,44,45],
            type : ["Low-top","Mid-top","High-top"],
            price : [500000,1000000,1500000,3000000,5000000],
            brands : brands
        }
        
        
        const slug = req.params.slugCategory;
        
        const productCategory = await productsCategory.findOne({
            slug : slug,
            deleted: false
        })
        const listSubCategory = await CategoryHelper.getSubCategory(productCategory.id)
        const listSubCategoryId = await listSubCategory.map(item => {
            return item.id
        })

        find.category_id = {$in : [productCategory.id,...listSubCategoryId]};
        
        //sort
            const sortKey = req.query.sortKey;
            const sortValue = req.query.sortValue;
            if(sortKey && sortValue){
                sort[sortKey] = sortValue
            }
            else{
                sort.position = 'desc'
            }
        //end sort 

        // brand checkbox
            const brand_id = req.query.brand
            if(brand_id){
                find.brand_id = brand_id
            }
        // end brand checkbox

        //type checkbox
            if(req.query.type){
                const typeList = req.query.type.split("-")
                const type = typeList.map(item=>{
                    return siderVar.type[parseInt(item)];
                })
                
                find.type = {$in: type};
            }
        //end type checkbox
        
        //price ratio
            if(req.query.priceRadio){
                const priceIdx = parseInt(req.query.priceRadio)
                find.price = {$lt: siderVar.price[priceIdx] }
            }
        //end price ratio

        //price input
            if(req.query.priceInput){
                const priceInput = req.query.priceInput.split("-").map(item =>{
                    return parseInt(item)
                })
                if(priceInput.length > 0 && priceInput[0] && priceInput[1]){
                    find.price = {
                        $gt: priceInput[0],
                        $lt: priceInput[1]
                    }
                }
            }
        //end price input



        //pagination
            const limitedItem = 16

            const countProducts = await Product.countDocuments(find);
            const paginationObject = paginationHelper(countProducts, req.query, limitedItem);
        //end pagination
        
        const products = await Product
        .find(find)
        .sort(sort)
        .limit(paginationObject.limitedItem)
        .skip(paginationObject.skip);

        const productsUpdate = products.map(item=>{
            item.newPrice = (item.price*(100-item.discountPercentage)/100).toFixed(0);
            return item;
        })

        //sale products
            const saleProducts = await Product.find({
                deleted: false,
                status: "active"
            }).sort({discountPercentage: "desc"}).limit(6)
            const saleProductsUpdate = saleProducts.map(item => {
                item.newPrice = (
                    (item.price*(100 - item.discountPercentage))/100
                ).toFixed(0)
                return item;
            })
        //end sale products

        res.render("client/page/product/index",{
            pageTitle: productCategory.title,
            siderVar : siderVar,
            pagination: paginationObject,
            products : productsUpdate,
            saleProducts: saleProductsUpdate
        })

    // }
    // catch(e){
    //     res.redirect("/products")
    // }


}