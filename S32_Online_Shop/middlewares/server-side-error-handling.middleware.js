function serverSideErrorHandler(error, req, res, next) {
  console.log("Server Error:", error);
  res.status(500).render("shared/500");
}

module.exports = serverSideErrorHandler;
