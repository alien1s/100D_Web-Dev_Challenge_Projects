const express = require("express");
const uuid = require("uuid");

const resDataUtil = require("../util/restaurant-data-util");

const router = express.Router();

router.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nexOrd = "desc";

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order === "desc") {
    nexOrd = "asc";
  }

  const storedRestaurants = resDataUtil.getStoredRestaurants();

  storedRestaurants.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    restaurantsNumber: storedRestaurants.length,
    restaurants: storedRestaurants,
    nexOrd: nexOrd,
  });
});

router.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;

  const storedRestaurants = resDataUtil.getStoredRestaurants();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }

  res.status(404).render("404");
});

router.get("/recommend", function (req, res) {
  res.render("recommend");
});

router.post("/recommend", function (req, res) {
  const restaurants = req.body;
  restaurants.id = uuid.v4();

  const storedRestaurants = resDataUtil.getStoredRestaurants();

  storedRestaurants.push(restaurants);

  resDataUtil.storeNewRestaurantInData(storedRestaurants);

  res.redirect("/confirm");
});

router.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = router;
