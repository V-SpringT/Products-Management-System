const express = require('express')

const router = express.Router(); 

const controller = require('../../controllers/client/product.controller');
router.get("/products", controller.index);

// router.get("/products/create", (req,res)=>{
//     res.render("client/page/product/index");
// });

// router.get("/products/edit", (req,res)=>{
//     res.render("client/page/product/index");
// });
module.exports = router;