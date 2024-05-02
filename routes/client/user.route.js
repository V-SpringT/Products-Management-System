const express = require('express')

const router = express.Router(); 
const multer  = require('multer')
const upload = multer()

const uploadCloud = require("../../middlewares/admin/ulpoadCloud.middleware")

const validate = require("../../validates/client/user.validate")

const controller = require("../../controllers/client/user.controller")
router.get("/register", controller.register);
router.post(
    "/register", 
    validate.registerPost,
    controller.registerPost
);

router.get(
    "/login", 
    controller.login
);

router.post(
    "/login", 
    validate.loginPost,
    controller.loginPost
);
module.exports = router;