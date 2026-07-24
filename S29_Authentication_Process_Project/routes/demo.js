const express = require("express");

const bcrypt = require("bcryptjs");

const { ObjectId } = require("mongodb");

const db = require("../data/database");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("welcome");
});

router.get("/signup", function (req, res) {
  let sessionInputData = req.session.inputData;

  if (!sessionInputData) {
    sessionInputData = {
      hasError: false,
      email: "",
      confirmEmail: "",
      password: "",
    };
  }
  req.session.inputData = null;
  res.render("signup", { inputData: sessionInputData });
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
    req.session.inputData = {
      hasError: true,
      message: "Invaliad input- please check your data!",
      email: enterdEmail,
      confirmEmail: enterdConfirmedEmail,
      password: enterdPassword,
    };
    console.log("False entetrd info, try again!");
    req.session.save(function () {
      res.redirect("/signup");
    });
    return;
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

  req.session.user = {
    id: existingUser._id.toString(),
    email: existingUser.email,
  };
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/admin");
  });
});

router.get("/admin", async function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  const user = await db
    .getDb()
    .collection("users")
    .findOne({ _id: ObjectId.createFromHexString(req.session.user.id) });

  if (!user || !user.isAdmin) {
    return res.status(403).render("403");
  }
  res.render("admin");
});

router.get("/profile", function (req, res) {
  if (!req.session.isAuthenticated) {
    return res.status(401).render("401");
  }

  res.render("profile");
});

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/");
});

module.exports = router;
