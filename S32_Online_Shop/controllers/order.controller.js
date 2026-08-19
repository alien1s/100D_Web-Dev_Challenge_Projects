require("dotenv").config();
const stripe = require("stripe")(process.env.SECRET_STRIPE_TOKEN);

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
    line_items: cart.items.map(function (item) {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price.toFixed(2) * 100,
        },
        quantity: +item.quantity,
      };
    }),

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
