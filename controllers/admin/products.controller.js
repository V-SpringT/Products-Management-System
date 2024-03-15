// [GET] /admin/products
const Product = require("../../model/products.model");



module.exports.index = async (req,res)=>{

    let filterStatus = [
        {
            name: "Tất cả",
            status: "",
            class: ""
        },
        {
            name: "Họat động",
            status:"active",
            class:""
        },
        {
            name: "Dừng họat động",
            status: "inactive",
            class: ""
        }
    ]

    if(req.query.status){
        const index = filterStatus.findIndex(item => item.status == req.query.status)
        filterStatus[index].class = "active"
    }
    else{
        const index = filterStatus.findIndex(item => item.status == "")
        filterStatus[index].class = "active"
    }

    let find = {
        deleted: false
    }

    if(req.query.status){
        find.status = req.query.status
    }
    
    let keyword = "";

    if(req.query.keyword){
        keyword = req.query.keyword;

        const regrex = new RegExp(keyword,"i");
        find.title = regrex;
    }
    const products = await Product.find(find);

    res.render("admin/page/products/index.pug",{
        pageTitle: "Trang san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: keyword
    });
}