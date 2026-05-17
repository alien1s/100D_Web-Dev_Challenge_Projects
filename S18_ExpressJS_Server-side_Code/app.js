const express = require("express");

const appexpress = express();

appexpress.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
}); // localhost:3000/currenttime

appexpress.get("/", function (req, res) {
  res.send("<h1>Hi Hommies, I'm Alien</h1>");
}); // localhost:3000/

appexpress.listen(3000);
