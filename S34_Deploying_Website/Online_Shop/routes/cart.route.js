const express = require("express");

const cartController = require("../controllers/cart.controller");

const router = express.Router();

//.....config
router.get("/", cartController.getCartItems);
router.post("/items", cartController.addCartItems);
router.patch("/items", cartController.updateCartItems);

module.exports = router;
