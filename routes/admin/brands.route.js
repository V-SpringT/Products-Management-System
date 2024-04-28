const express = require('express')
const router = express.Router();
const multer  = require('multer')

const upload = multer()
const validate = require("../../validates/admin/products-category.validate")
const uploadCloud = require("../../middlewares/admin/ulpoadCloud.middleware")
const controller = require('../../controllers/admin/brands.controller')
router.get("/", controller.index)
router.get("/create", controller.create)
router.post(
    "/create", 
    upload.single('thumbnail'), 
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
)
module.exports = router;