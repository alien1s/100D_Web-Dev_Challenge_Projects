//middleware func

function getSignup(req, res) {
  //handling logic
  res.render("customer_views/auth_views/signup");
}

function getLogin(req, res) {
  //handling logic
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
};
