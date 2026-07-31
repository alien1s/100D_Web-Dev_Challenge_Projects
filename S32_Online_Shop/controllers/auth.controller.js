const User = require("../models/user.model");

function getSignup(req, res) {
  //handling logic
  res.render("customer_views/auth_views/signup");
}

async function signup(req, res) {
  //handling logic......
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city,
  );

  await user.signup();

  res.redirect("/login");
}

function getLogin(req, res) {
  //handling logic
  res.render("customer_views/auth_views/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
