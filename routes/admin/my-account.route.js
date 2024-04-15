const express = require('express')

const router = express.Router(); 
const multer  = require('multer')
// const storageMulter = require('../../helper/storageMulter') store upload folder
const upload = multer()

const uploadCloud = require("../../middlewares/admin/ulpoadCloud.middleware")


const validate = require("../../validates/admin/accounts.validate")
const controller = require("../../controllers/admin/my-account.controller")
router.get("/", controller.index);

router.get("/edit", controller.edit);

router.patch(
    "/edit", 
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.editPatch,
    controller.editPatch
);

module.exports = router;