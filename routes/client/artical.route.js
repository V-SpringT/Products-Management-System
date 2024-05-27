const express = require('express')

const router = express.Router(); 

const controller = require('../../controllers/client/artical.controller');
router.get("/", controller.index);

// router.get("/detail/:slug", controller.detail);

// router.get("/:slugCategory", controller.articalOfCategory)

module.exports = router; 