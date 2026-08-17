const stripe = require("stripe")(
  "sk_test_51U3z54D8IH2MqRMptJt2xwdRgoohG0BHlRl1I7gNhxqy5XgY3oU3o9IzZrldBvEWRbHasQlOnUZukq4eNdFPqdRc00nZuXwox4",
);

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

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, price_1234) of the product you want to sell
        price_data: {
          currency: "usd",
          product_data: {
            name: "dummy",
          },
          unit_amount_decimal: 10.99,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/orders/success",
    cancel_url: "http://localhost:3000/orders/failure",
    // Provide a name (for example, hosted_web_0001) to label this Checkout integration and measure its conversion independently
    integration_identifier: "{{INTEGRATION_ID}}",
  });

  res.redirect(303, session.url);
}

function getSuccess(req, res) {
  res.render("customer_views/orders_views/success");
}

function getFailure(req, res) {
  res.render("customer_views/orders_views/failure");
}

module.exports = {
  getOrders: getOrders,
  addOrder: addOrder,
  getFailure: getFailure,
  getSuccess: getSuccess,
};
