const mongodb = require("mongodb");

const MongoCLient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoCLient.connect("mongodb://localhost:27017");
  database = client.db("first-api");
}

function getDb() {
  if (!database) {
    throw new Error("Database not connected!");
  }

  return database;
}

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
