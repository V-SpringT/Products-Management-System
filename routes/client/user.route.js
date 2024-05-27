const express = require('express')

const router = express.Router(); 
const multer  = require('multer')
const upload = multer()

const uploadCloud = require("../../middlewares/admin/ulpoadCloud.middleware")

const validate = require("../../validates/client/user.validate")

const controller = require("../../controllers/client/user.controller")

const authMDW = require("../../middlewares/client/auth.middleware")
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

router.get(
    "/logout",
    controller.logout
)

router.get(
    "/password/forgot",
    controller.forgotPassword
)
router.post(
    "/password/forgot",
    controller.forgotPasswordPost
)

router.get(
    "/password/otp",
    controller.otpPassword
)

router.post(
    "/password/otp",
    controller.otpPasswordPost
)

router.get(
    "/password/reset",
    controller.resetPassword
)

router.post(
    "/password/reset",
    controller.resetPasswordPost
)

router.get(
    "/infor",
    authMDW.requireAuth,
    controller.infor
)

module.exports = router;