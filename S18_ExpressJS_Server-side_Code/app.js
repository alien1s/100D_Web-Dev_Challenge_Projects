const express = require("express");

const appexpress = express();

appexpress.use(express.urlencoded({ extended: false })); //urlencode->middleware function setted false because the form data is very simple but

appexpress.get("/currenttime", function (req, res) {
  res.send("<h1>" + new Date().toISOString() + "</h1>");
}); // localhost:3000/currenttime

appexpress.get("/", function (req, res) {
  res.send(
    '<form action="/store-user" method="POST"><lable>Your Name</lable><input type="text" name="username"/><button>Submit</button></form>',
  );
}); // localhost:3000/

appexpress.post("/store-user", function (req, res) {
  const userName = req.body.username;
  console.log(userName);
  res.send("<h1>Username stored!</h1>");
});
appexpress.listen(3000);
