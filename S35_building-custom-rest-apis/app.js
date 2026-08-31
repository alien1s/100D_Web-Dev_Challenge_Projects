const express = require("express");

const db = require("./data/database");

const qoutRouter = require("./routes/qoute.route");

const app = express();

app.use("/qoute", qoutRouter);

app.get("/", function (req, res, next) {
  res.redirect("/qoute");
});

app.use(function (error, req, res, next) {
  res.status(500).json({
    message: "Somtong went wrong",
  });
});

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log(error);
  });
