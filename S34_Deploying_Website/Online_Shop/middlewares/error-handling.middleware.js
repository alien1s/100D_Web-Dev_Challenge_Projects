function errorHandler(error, req, res, next) {
  if (error.code === 404) {
    console.log("Client Error:", error);
    res.status(404).render("shared/404");
  }
  console.log("Server Error:", error);
  res.status(500).render("shared/500");
}

module.exports = errorHandler;
