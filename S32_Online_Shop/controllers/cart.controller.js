const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

async function addCartItem(req, res, next) {
  let product;
  try {
    product = await Product.fetchById(req.body.productId);
    if (!product || isNaN(Number(product.price))) {
      return res.status(400).json({ message: "Invalid product" });
    }
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;

  cart.addItem(product);
  req.session.cart = cart;

  res.status(201).json({
    message: "Cart updated!",
    totalItemsNum: cart.totalQuantity,
  });
}

module.exports = {
  addCartItem: addCartItem,
};
