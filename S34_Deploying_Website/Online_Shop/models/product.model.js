const mongodb = require("mongodb");
const db = require("../data/database");

class Product {
  constructor(productData) {
    this.title = productData.title;
    this.summary = productData.summary;
    this.price = +productData.price;
    this.description = productData.description;
    this.image = productData.image;
    this.updateImageData();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  updateImageData() {
    this.imagePath = `products_data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  static async fetchById(productId) {
    let prodId;
    try {
      prodId = new mongodb.ObjectId(productId);
    } catch (error) {
      error.code = 404;
      throw error;
    }

    const product = await db
      .getDb()
      .collection("products")
      .findOne({ _id: prodId });

    if (!product) {
      const error = new Error("Couldn't find product with provided id");
      error.code = 404;
      throw error;
    }

    return new Product(product);
  }

  static async fetchAll() {
    const products = await db.getDb().collection("products").find().toArray();
    return products.map(function (productDoc) {
      return new Product(productDoc);
    });
  }

  static async findMultiple(ids) {
    const productIds = ids.map(function (id) {
      return new mongodb.ObjectId(id);
    });

    const products = await db
      .getDb()
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray();

    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }

  async save() {
    const productData = {
      title: this.title,
      summary: this.summary,
      price: this.price,
      description: this.description,
      image: this.image,
    };

    if (this.id) {
      const prodId = new mongodb.ObjectId(this.id);

      if (!this.image) {
        delete productData.image;
      }

      await db
        .getDb()
        .collection("products")
        .updateOne({ _id: prodId }, { $set: productData });
    } else {
      await db.getDb().collection("products").insertOne(productData);
    }
  }

  replaceImage(newImage) {
    this.image = newImage;
    this.updateImageData();
  }

  static async delete(productId) {
    let product;
    try {
      product = await Product.fetchById(productId);
      const prodId = new mongodb.ObjectId(product.id);
      await db.getDb().collection("products").deleteOne({ _id: prodId });
    } catch (error) {
      error.code = 404;
      throw error;
    }
  }
}

module.exports = Product;
