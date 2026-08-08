const Product = require("../models/product.model");

async function getProductsList(req, res, next) {
  try {
    const productsDocs = await Product.fetchAll();
    res.render("customer_views/products_views/all-products", {
      products: productsDocs,
    });
  } catch (error) {
    next(error);
    return;
  }
}

module.exports = {
  getProductsList: getProductsList,
};
