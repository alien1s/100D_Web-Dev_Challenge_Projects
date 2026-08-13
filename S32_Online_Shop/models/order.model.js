const mongodb = require("mongodb");
const db = require("../data/database");

class Order {
  constructor(cart, userData, status = "Pending", date, orderId) {
    this.productsData = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (date) {
      this.formattedDate = this.date.toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
    this.id = orderId;
  }

  static transformOrderDoc(orderDoc) {
    return new Order(
      orderDoc.productsData,
      orderDoc.userData,
      orderDoc.status,
      orderDoc.date,
      orderDoc.id,
    );
  }

  static transformOrederDocs(orderDoc) {
    return orderDoc.map(this.transformOrderDoc);
  }

  static async findAll() {
    const orderDoc = await db
      .getDb()
      .collection("orders")
      .find()
      .sort({ _id: -1 })
      .toArray();
    return this.transformOrederDocs(orderDoc);
  }

  static async findAllForUser(userId) {
    const uid = new mongodb.ObjectId(userId);

    const orderDoc = await db
      .getDb()
      .collection("orders")
      .find({ "userData._id": uid })
      .sort({ _id: -1 })
      .toArray();
    return this.transformOrederDocs(orderDoc);
  }

  static async findOrderById(orderId) {
    const orderDoc = await db
      .getDb()
      .collection("orders")
      .findOne({ _id: new mongodb.ObjectId(orderId) })
      .toArray();
    return this.transformOrederDocs(orderDoc);
  }

  async save() {
    if (this.id) {
      const orderId = new mongodb.ObjectId(this.id);
      return await db
        .getDb()
        .collection("orders")
        .updateOne({ _id: orderId }, { $set: { status: this.status } });
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
