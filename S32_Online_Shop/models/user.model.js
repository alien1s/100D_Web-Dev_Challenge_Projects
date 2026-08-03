const bcrypt = require("bcryptjs");

const db = require("../data/database");

class User {
  constructor(userInput) {
    this.email = userInput.email;
    this.confirmedEmail = userInput.confirmedEmail;
    this.password = userInput.password;
    this.name = userInput.fullname;
    this.address = {
      street: userInput.street,
      postalCode: userInput.postal,
      city: userInput.city,
    };
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();

    if (existingUser) {
      return true;
    }
    return false;
  }

  async signup() {
    const hashPassword = await bcrypt.hash(this.password, 12);

    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashPassword,
      name: this.name,
      address: this.address,
    });
  }
  hasMatchingPassword(hashPasswordFromDB) {
    return bcrypt.compare(this.password, hashPasswordFromDB);
  }
}

module.exports = User;
