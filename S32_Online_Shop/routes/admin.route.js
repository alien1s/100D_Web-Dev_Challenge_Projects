const express = require("express");

const adminController = require("../controllers/admin.controller");

const router = express.Router();

//.....config
router.get("/products", adminController.getProducts);
router.get("/products/new", adminController.getAddingNewProduct);
router.post("/products", adminController.creatingNewProduct);

module.exports = router;
