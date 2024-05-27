const express = require('express')

const multer  = require('multer')
// const storageMulter = require('../../helper/storageMulter') store upload folder
const upload = multer()

const uploadCloud = require("../../middlewares/admin/ulpoadCloud.middleware")

const router = express.Router(); 

const controller = require("../../controllers/admin/artical.controller")
const validate = require("../../validates/admin/product.validate")

router.get("/", controller.index);


router.get("/create", controller.create);

router.post(
    "/create",
    upload.single('thumbnail'), 
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
    )

module.exports = router;