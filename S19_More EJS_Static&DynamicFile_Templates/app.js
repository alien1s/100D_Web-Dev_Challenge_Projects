const path = require("path");

const express = require("express");
const app = express();

app.use(express.static('public'));

app.get("/", function (req, res) {
  const filePath = path.join(__dirname, "views", "index.html");
  res.sendFile(filePath);
});

app.get("/restaurants", function (req, res) {
  const filePath = path.join(__dirname, "views", "restaurants.html");
  res.sendFile(filePath);
});

app.get("/recommend", function (req, res) {
  const filePath = path.join(__dirname, "views", "recommend.html");
  res.sendFile(filePath);
});

app.get("/about", function (req, res) {
  const filePath = path.join(__dirname, "views", "about.html");
  res.sendFile(filePath);
});

app.get("/confirm", function (req, res) {
  const filePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(filePath);
});

app.listen(3000);
