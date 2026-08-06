function getProducts(req, res) {
  res.render("admin_views/products/all-products-admin");
}
function getAddingNewProduct(req, res) {
  res.render("admin_views/products/add-product");
}
function creatingNewProduct(req, res) {
  res.redirect("/products/new");
}

module.exports = {
  getProducts: getProducts,
  getAddingNewProduct: getAddingNewProduct,
  creatingNewProduct: creatingNewProduct,
};
