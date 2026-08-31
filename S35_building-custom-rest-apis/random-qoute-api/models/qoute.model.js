const db = require("../data/database");

class Qoute {
  static async getRandomQoute() {
    const qoutes = await db.getDb().collection("qoutes").find().toArray();
    const randomQouteIndex = Math.floor(Math.random() * qoutes.length);
    const randomQoute = qoutes[randomQouteIndex];
    return randomQoute.text;
  }
}

module.exports = Qoute;
