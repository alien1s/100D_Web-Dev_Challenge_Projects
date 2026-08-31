const express = require("express");

const db = require("./data/database");

const app = express();

app.use(function (error, req, res, next) {
  res.status(500).json({
    message: "Someting went wrong!",
  });
});

db.initDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Connecting to database faild!");
    console.log(error);
  });
