const express = require("express");

const orderController = require("../controllers/order.controller");

const router = express.Router();

//.....config
router.get("/", orderController.getOrders);
router.post("/", orderController.addOrder);

router.get("/success", orderController.getSuccess);
router.get("/failure", orderController.getFailure);

module.exports = router;
