const path = require("path");

const express = require("express");
const session = require("express-session");
const csrf = require("csurf");

const createSessionConfig = require("./config/session.config");

const db = require("./data/database");

const addCsrfTokenMiddleware = require("./middlewares/csrf-tokens.middleware");
const serverSideErrorHandler = require("./middlewares/server-side-error-handling.middleware");

const baseRoutes = require("./routes/base.route");
const authRoutes = require("./routes/auth.route");
const productRoutes = require("./routes/product.route");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const sessionStore = createSessionConfig();

app.use(session(sessionStore));

const csrfProtection = csrf();
app.use(csrfProtection); // parse and create csrf for request
app.use(addCsrfTokenMiddleware); // distribute csrf for the post views

app.use(baseRoutes);
app.use(authRoutes);
app.use(productRoutes);

app.use(serverSideErrorHandler);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Faild to connect to the database!");
    console.log(error);
  });
