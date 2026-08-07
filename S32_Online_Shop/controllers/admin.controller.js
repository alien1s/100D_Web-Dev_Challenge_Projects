const Product = require("../models/product.model");

async function getProducts(req, res, next) {
  try {
    const products = await Product.fetchAll();
    res.render("admin_views/products/all-products-admin", {
      products: products,
    });
  } catch (error) {
    next(error);
    return;
  }
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
