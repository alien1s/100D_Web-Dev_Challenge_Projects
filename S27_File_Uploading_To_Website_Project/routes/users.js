const express = require("express");
const multer = require("multer");

const upload = multer({});

const router = express.Router();

router.get("/", function (req, res) {
  res.render("profiles");
});

router.get("/new-user", function (req, res) {
  res.render("new-user");
});

router.post("/profiles", upload.single("image"), function (req, res) {
  const userData = req.body;
  const uploadedImageFile = req.file;
});

module.exports = router;
