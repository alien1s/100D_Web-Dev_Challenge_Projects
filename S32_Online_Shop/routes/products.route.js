const express = require("express");

const productController = require("../controllers/products.controller");

const router = express.Router();

//.....config
router.get("/products", productController.getProductsList);

module.exports = router;
