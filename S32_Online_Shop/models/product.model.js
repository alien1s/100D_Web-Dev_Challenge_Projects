const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.imageName = productData.image;
    this.imagePath = `product_data/images/${productData.image}`;
    this.imageUrl = `/products/assets/images/${productData.image}`;
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      imageName: this.imageName,
    };

    await db.getDb().collection("products").insertOne(productData);
  }
}

module.exports = Product;
