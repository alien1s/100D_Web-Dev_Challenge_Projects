function createUserSession(req, user, action) {
  req.session.uId = user._id.toString();
  req.session.save(action);
}

module.exports = createUserSession;
