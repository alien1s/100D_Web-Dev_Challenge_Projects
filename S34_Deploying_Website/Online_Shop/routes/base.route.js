const express = require("express");

const baseController = require("../controllers/base.controller");

const router = express.Router();

//.....config
router.get("/", baseController.getTheShop);

module.exports = router;
