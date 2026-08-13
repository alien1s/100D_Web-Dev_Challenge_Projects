const User = require("../models/user.model");
const Order = require("../models/order.model");

async function getOrders(req, res, next) {
  let ordersDoc;
  try {
    ordersDoc = await Order.findAllForUser(res.locals.uid);
    res.render("customer_views/orders_views/all-orders", { orders: ordersDoc });
  } catch (error) {
    next(error);
    return;
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;

  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const orderDoc = new Order(cart, userDocument);

  try {
    await orderDoc.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  res.redirect("/orders");
}

module.exports = {
  getOrders: getOrders,
  addOrder: addOrder,
};
