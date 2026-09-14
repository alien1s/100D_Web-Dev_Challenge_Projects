const express = require("express");
// const cors = require("cors");

const db = require("./data/database");

const todosRouter = require("./routes/todo.route");
const enableCors = require("./middlewares/cors");

const app = express();

// app.use(cors());

app.use(enableCors);

app.use(express.json());

app.use("/todos", todosRouter);

app.use(function (error, req, res, next) {
  const status = error.code || 500;

  res.status(status).json({
    message: error.message || "Something went wrong!",
  });
  console.log(error);
});

db.initDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Connecting to database faild!");
    console.log(error);
  });
