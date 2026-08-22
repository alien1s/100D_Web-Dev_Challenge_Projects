require("dotenv").config();

const session = require("express-session");
const mongodbstore = require("connect-mongodb-session");

function createSessionStore() {
  const MongoDBStore = mongodbstore(session);

  const store = new MongoDBStore({
    uri: "mongodb://localhost:27017",
    databaseName: process.env.DB_NAME,
    collection: "sessions",
  });

  return store;
}

function createSessionConfig() {
  return {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  };
}

module.exports = createSessionConfig;
