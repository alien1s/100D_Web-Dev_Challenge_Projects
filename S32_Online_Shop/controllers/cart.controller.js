const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

async function addCartItem(req, res) {
  let product;

  try {
    product = await Product.fetchById(req.body.productId);
  } catch (error) {
    next(error);
    return;
  }

  const cart = res.locals.cart;
  cart.addItem(product);
  req.session.cart = cart;

  res.json({
    message: "Cart updated",
    totalItems: cart.totalQuantity,
    totalPrice: cart.totalPrice,
  });
}

module.exports = {
  addCartItem: addCartItem,
};
