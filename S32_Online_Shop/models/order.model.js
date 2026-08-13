const db = require("../data/database");

class Order {
  constructor(cart, userData, status = "Pednding", date, orderId) {
    this.productsData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    this.id = orderId;
  }

  async save() {
    if (this.id) {
      // .....update logic
    } else {
      const orderDoc = {
        userData: this.userData,
        productsData: this.productsData,
        date: new Date(),
        status: this.status,
      };

      return db.getDb().collection("orders").insertOne(orderDoc);
    }
  }
}

module.exports = Order;
