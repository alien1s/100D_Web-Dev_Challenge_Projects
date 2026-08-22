const express = require("express");

const productController = require("../controllers/products.controller");

const router = express.Router();

//.....config
router.get("/products", productController.getProductsList);
router.get("/products/:id", productController.getProductDetail);

module.exports = router;
