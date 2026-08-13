const path = require("path");

const express = require("express");
const csrf = require("csurf");
const session = require("express-session");

//------
const createSessionConfig = require("./config/session.config");

const db = require("./data/database");

const addCsrfTokenMiddleware = require("./middlewares/csrf-tokens.middleware");
const errorHandler = require("./middlewares/error-handling.middleware");
const checkAuthStatus = require("./middlewares/check-auth.middleware");
const routeGuard = require("./middlewares/guard-routes.middleware");
const cartInit = require("./middlewares/init-cart.middleware");
const updateCartPricesMiddleware = require("./middlewares/update-cart-prices");
const notFoundMiddleware = require("./middlewares/not-found");

const baseRoutes = require("./routes/base.route");
const authRoutes = require("./routes/auth.route");
const productsRoutes = require("./routes/products.route");
const adminRoutes = require("./routes/admin.route");
const cartRoutes = require("./routes/cart.route");
const ordersRoutes = require("./routes/order.route");

//-----------

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//-----------

app.use(express.static("public"));
app.use("/products/assets", express.static("products_data"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const sessionStore = createSessionConfig();
app.use(session(sessionStore));

app.use(cartInit);
app.use(updateCartPricesMiddleware);

const csrfProtection = csrf();
app.use(csrfProtection); // parse and create csrf for request
app.use(addCsrfTokenMiddleware); // distribute csrf for the post views

app.use(checkAuthStatus);

//.......

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", routeGuard, ordersRoutes);
app.use("/admin", routeGuard, adminRoutes);

app.use(notFoundMiddleware);

//..........

app.use(errorHandler);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Faild to connect to the database!");
    console.log(error);
  });
