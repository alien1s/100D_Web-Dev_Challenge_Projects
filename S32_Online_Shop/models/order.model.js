class Order {
  constructor(cart, userData, status = "Pednding", date, orderId) {
    this.productData = cart;
    this.user = userData;
    this.status = status;
    this.date = new Date().toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    this.id = orderId;
  }

  save() {}
}

module.exports = Order;
