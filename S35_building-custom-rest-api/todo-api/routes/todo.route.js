const express = require("express");

const todosController = require("../controllers/todo.controller");

const router = express.Router();

router.get("/", todosController.fetchTodos);
router.post("/", todosController.addTodo);
router.patch("/:id", todosController.updateTodo);
router.delete("/:id", todosController.deleteTodo);

module.exports = router;
