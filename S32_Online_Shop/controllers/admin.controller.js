function getProducts(req, res) {
  res.render("admin_views/products/all-products-admin");
}
function getAddingNewProduct(req, res) {
  res.render("admin_views/products/add-product");
}
function createNewProduct(req, res) {
  console.log(req.body);
  console.log(req.file);

  res.redirect("/admin/products");
}

module.exports = {
  getProducts: getProducts,
  getAddingNewProduct: getAddingNewProduct,
  createNewProduct: createNewProduct,
};
