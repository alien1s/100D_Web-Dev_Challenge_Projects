const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "..", "data", "restaurants.json");

//-------- Utils -------

function getStoredRestaurants() {
  const fileData = fs.readFileSync(filePath);
  const storedRestaurantsArray = JSON.parse(fileData);

  return storedRestaurantsArray;
}

function storeNewRestaurantInData(storableRestaurants) {
  fs.writeFileSync(filePath, JSON.stringify(storableRestaurants));
}

//------------ util export ---------

module.exports = {
  getStoredRestaurants: getStoredRestaurants,
  storeNewRestaurantInData: storeNewRestaurantInData,
};
