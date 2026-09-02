const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function initDb() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("todo-api");
}

function getDb() {
  if (!database) {
    throw new Error("Couldn't Connect to database");
    return database;
  }
}

module.exports = {
  initDb: initDb,
  getDb: getDb,
};
