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

async function getUpdateProduct(req, res, next) {
  try {
    const productData = await Product.fetchById(req.params.id);
    res.render("admin_views/products/update-product", { product: productData });
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res) {
  const product = new Product({
    ...req.body,
    _id: req.params.id,
  });

  if (req.file) {
    product.replaceImage(req.file.filename);
  }
  try {
    await product.save();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/admin/products");
}

async function deleteProduct(req, res, next) {
  try {
    await Product.delete(req.params.id);
  } catch (error) {
    next(error);
    return;
  }

  res.json({ message: "Product was deleted!" });
}

module.exports = {
  getProducts: getProducts,
  getAddingNewProduct: getAddingNewProduct,
  createNewProduct: createNewProduct,
  getUpdateProduct: getUpdateProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
