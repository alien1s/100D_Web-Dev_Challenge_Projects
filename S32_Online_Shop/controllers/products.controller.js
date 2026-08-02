function getProductsList(req, res) {
  //handling logic
  res.render("customer_views/products_views/all-products");
}

module.exports = {
  getProductsList: getProductsList,
};
