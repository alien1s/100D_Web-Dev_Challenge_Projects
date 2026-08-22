const Product = require("../models/product.model");
const Cart = require("../models/cart.model");

function getCartItems(req, res) {
  res.render("customer_views/cart_views/cart");
}

async function addCartItems(req, res, next) {
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

  res.status(201).json({
    message: "Cart updated!",
    totalItemsNum: cart.totalQuantity,
  });
}

function updateCartItems(req, res) {
  const cart = res.locals.cart;

  const updatedItemData = cart.updateItem(
    req.body.productId,
    req.body.quantity,
  );

  req.session.cart = cart;

  res.json({
    message: "Item updated!",
    updatedCartData: {
      newTotalQuantity: cart.totalQuantity,
      newTotalPrice: cart.totalPrice,
      updatedItemPrice: updatedItemData.updatedItemPrice,
    },
  });
}

module.exports = {
  getCartItems: getCartItems,
  addCartItems: addCartItems,
  updateCartItems: updateCartItems,
};
