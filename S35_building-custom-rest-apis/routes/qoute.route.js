const express = require("express");

const qouteController = require("../controllers/qoute.controller");

const router = express.Router();

router.get("/", qouteController.getQoutes);

module.exports = router;
