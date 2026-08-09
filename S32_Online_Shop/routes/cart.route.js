const express = require("express");

const cartController = require("../controllers/cart.controller");

const router = express.Router();

//.....config
router.post("/items", cartController.addCartItem);

module.exports = router;
