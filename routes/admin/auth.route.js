const express = require('express')

const router = express.Router(); 

const controller = require("../../controllers/admin/auth.controller")
const validate = require("../../validates/admin/auth.validate")
router.get("/login", controller.index);
router.post(
    "/login", 
    validate.loginPost,
    controller.indexPost
);
module.exports = router;