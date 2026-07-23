const express = require("express");

const bcrypt = require("bcryptjs");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  res.render("signup");
});

router.get("/login", function (req, res) {
  res.render("login");
});

router.post("/signup", async function (req, res) {
  const userData = req.body;

  const enterdEmail = userData.email;
  const enterdConfirmedEmail = userData["confirm-email"];
  const enterdPassword = userData.password;
  const hashedPassword = await bcrypt.hash(enterdPassword, 12);

  if (
    !enterdEmail ||
    !enterdConfirmedEmail ||
    !enterdPassword ||
    enterdPassword.trim() < 6 ||
    enterdEmail !== enterdConfirmedEmail ||
    !enterdEmail.includes("@")
  ) {
    console.log("False entetrd info, try again!");
    return res.redirect("/signup");
  }

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enterdEmail });

  if (existingUser) {
    console.log("User is already existed, login directly!");
    return res.redirect("/login");
  }

  const user = {
    email: enterdEmail,
    password: hashedPassword,
  };

  await db.getDb().collection("users").insertOne(user);

  res.redirect("/login");
});

router.post("/login", async function (req, res) {
  const userData = req.body;
  const enterdEmail = userData.email;
  const enterdPassword = userData.password;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: enterdEmail });

  if (!existingUser) {
    console.log("Couldnt find the user!");
    return res.redirect("/login");
  }

  const passwordEquality = await bcrypt.compare(
    enterdPassword,
    existingUser.password,
  );

  if (!passwordEquality) {
    console.log("The Password enterd was wrong, try again!");
    return res.redirect("/login");
  }

  req.session.user({
    id: existingUser._id.toString(),
    email: existingUser.email,
  });
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/admin");
  });
});

router.get("/admin", function (req, res) {
  res.render("admin");
});

router.post("/logout", function (req, res) {});

module.exports = router;
