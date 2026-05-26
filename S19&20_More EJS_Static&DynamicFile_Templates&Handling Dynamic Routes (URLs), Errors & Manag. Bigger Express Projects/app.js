const fs = require("fs");
const path = require("path");

const express = require("express");
const uuid = require("uuid");

const resDataUtil = require("./util/restaurant-data-util");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/restaurants", function (req, res) {
  const storedRestaurants = resDataUtil.getStoredRestaurants();

  res.render("restaurants", {
    restaurantsNumber: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;

  const storedRestaurants = resDataUtil.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }

  res.status(404).render("404");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.post("/recommend", function (req, res) {
  const restaurants = req.body;
  restaurants.id = uuid.v4();

  const storedRestaurants = resDataUtil.getStoredRestaurants();
  
  storedRestaurants.push(restaurants);

  resDataUtil.storeNewRestaurantInData(storedRestaurants);

  res.redirect("/confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});

app.listen(3000);
