const express = require('express')
const router = express.Router();
const multer  = require('multer')
// const storageMulter = require('../../helper/storageMulter') store upload folder
const upload = multer()

const uploadCloud = require("../../middlewares/admin/ulpoadCloud.middleware")

const validate = require("../../validates/admin/products-category.validate")

const controller = require('../../controllers/admin/products-category.controller')
router.get("/", controller.index)
router.get("/create", controller.create)
router.post(
    "/create", 
    upload.single('thumbnail'), 
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
)

router.get("/detail/:id", controller.detail)

router.get("/edit/:id", controller.edit)

router.patch(
    "/edit/:id",
    upload.single('thumbnail'), 
    uploadCloud.upload,
    validate.createPost, controller.editPatch
)
router.delete("/delete/:id", controller.delete)

router.get("/deleted-category", controller.deleted)

router.post("/deleted-category/restore/:id", controller.restore)

router.patch("/change-status/:status/:id", controller.changeStatus)
module.exports = router; 