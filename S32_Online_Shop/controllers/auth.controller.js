const User = require("../models/user.model");
const util = require("../util/general.util");
const authUtil = require("../util/auth.util");
const validateUtil = require("../util/validate.util");
const sessionFlashUtil = require("../util/session-flash.util");

function getSignup(req, res) {
  const sessionFlashedData = sessionFlashUtil.getFlashedDataFromSession(req);

  const inputData = util.Var.userSignupInputDefaultData;
  const holdData = sessionFlashUtil.checkFlashedIsExisting(
    inputData,
    sessionFlashedData,
  );

  res.render("customer_views/auth_views/signup", {
    holdData: holdData,
  });
}

async function signup(req, res, next) {
  const userInputData = {
    email: req.body.email,
    confirmedEmail: req.body["confirm-email"],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };

  if (!validateUtil.userInputAreValid(userInputData)) {
    sessionFlashUtil.flashDataToSession(
      req,
      util.Var.flashedInvaledMessage,
      userInputData,
      function () {
        res.redirect("/signup");
      },
    );
    return;
  }

  const user = new User(userInputData);

  try {
    const existsAlready = await user.existsAlready();
    if (existsAlready) {
      sessionFlashUtil.flashDataToSession(
        req,
        util.Var.flashedExistingSignupMessage,
        userInputData,
        function () {
          res.redirect("/signup");
        },
      );
      return;
    }
    await user.signup();
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  const sessionFlashedData = sessionFlashUtil.getFlashedDataFromSession(req);

  const inputData = util.Var.userLoginInputDefaultData;
  const holdData = sessionFlashUtil.checkFlashedIsExisting(
    inputData,
    sessionFlashedData,
  );

  res.render("customer_views/auth_views/login", {
    holdData: holdData,
  });
}

async function login(req, res, next) {
  const userInputData = {
    email: req.body.email,
    password: req.body.password,
  };

  const user = new User(userInputData);

  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
    if (!existingUser) {
      sessionFlashUtil.flashDataToSession(
        req,
        util.Var.flashedExistingLoginMessage,
        userInputData,
        function () {
          res.redirect("/login");
        },
      );
      return;
    }

    const passwordIsCorrect = await user.hasMatchingPassword(
      existingUser.password,
    );
    if (!passwordIsCorrect) {
      sessionFlashUtil.flashDataToSession(
        req,
        util.Var.flashedExistingLoginMessage,
        userInputData,
        function () {
          res.redirect("/login");
        },
      );
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authUtil.destroyUserAuthSession(req);
  res.redirect("/");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
