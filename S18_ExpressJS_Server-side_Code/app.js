const fs = require("fs");
const path = require("path");

const express = require("express");
const appexpress = express();

appexpress.use(express.urlencoded({ extended: true })); //urlencode->middleware function setted false because the form data is very simple

appexpress.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
}); // localhost:3000/currenttime

appexpress.get("/", function (req, res) {
  res.send(
    '<form action="/store-user" method="POST"><lable>Your Name:</lable><input type="text" name="username"/><button>Submit</button></form>',
  );
}); // localhost:3000/

appexpress.post("/store-user", function (req, res) {
  const userName = req.body.username;

  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  existingUsers.push(userName);

  fs.writeFileSync(filePath, JSON.stringify(existingUsers));

  res.send(
    "<h1>Username stored!</h1><a href='/stored-user'>See Stored User</a>",
  );
}); // localhost:3000/store-user

appexpress.get("/stored-user", function (req, res) {
  const filePath = path.join(__dirname, "data", "users.json");
  const fileData = fs.readFileSync(filePath);
  const existingUsers = JSON.parse(fileData);

  let responseData = "<ul>";

  for (const user of existingUsers) {
    responseData += "<li>" + user + "</li>";
  }

  responseData += "</ul>";

  res.send(responseData);
}); // localhost:3000/stored-user

appexpress.listen(3000);
