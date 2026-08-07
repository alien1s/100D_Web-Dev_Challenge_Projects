const Product = require("../models/product.model");

function getProducts(req, res) {
  res.render("admin_views/products/all-products-admin");
}
function getAddingNewProduct(req, res) {
  res.render("admin_views/products/add-product");
}
async function createNewProduct(req, res, next) {
  const product = new Product({
    ...req.body,
    image: req.file.filename,
  });

  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

module.exports = {
  getProducts: getProducts,
  getAddingNewProduct: getAddingNewProduct,
  createNewProduct: createNewProduct,
};
