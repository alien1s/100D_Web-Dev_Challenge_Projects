const User = require("../models/user.model");
const authUtil = require("../util/auth.util");

function getSignup(req, res) {
  res.render("customer_views/auth_views/signup");
}

async function signup(req, res, next) {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city,
  );
  try {
    await user.signup();
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("customer_views/auth_views/login");
}

async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);
  
  let existingUser;

  try {
    existingUser = await user.login().getUserWithSameEmail();
  } catch (error) {
    console.log(error);
    next(error);
    return;
  }

  if (!existingUser) {
    res.redirect("/login");
    return;
  }

  const passwordIsCorrect = await user
    .login()
    .hasMatchingPassword(existingUser.password);

  if (!passwordIsCorrect) {
    res.redirect("/login");
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
