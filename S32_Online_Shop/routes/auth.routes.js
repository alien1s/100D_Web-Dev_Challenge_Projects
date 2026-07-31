const express = require("express");

const authController = require("../controllers/auth.controller");

const router = express.Router;

//.....config
router.get("/sginup", authController.getSignup);
router.get("/login", authController.getLogin);

module.exports = router;
