const express = require("express");

const authController = require("../controllers/auth-controller");

const router = express.Router();

router.get("/signup", authController.getSignUp);

router.get("/login", authController.getLogIn);

router.post("/signup", authController.signUp);

router.post("/login", authController.logIn);

router.post("/logout", authController.logOut);

router.get("/401", authController.get401);

module.exports = router;
