const express = require('express')
const router = express.Router();
const multer  = require('multer')
// const storageMulter = require('../../helper/storageMulter') store upload folder
const upload = multer() 
    
const uploadCloud = require("../../middlewares/admin/ulpoadCloud.middleware")

const validate = require("../../validates/admin/products-category.validate")

const controller = require('../../controllers/admin/artical-category.controller')
router.get("/", controller.index)
router.get("/create", controller.create)
router.post(
    "/create", 
    upload.single('thumbnail'), 
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
)

router.delete("/delete/:id", controller.delete)

module.exports = router; 