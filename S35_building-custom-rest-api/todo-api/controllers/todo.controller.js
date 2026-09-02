const Todo = require("../models/todo.model");

async function fetchTodos(req, res, next) {
  let todos;
  try {
    todos = await Todo.fetchAllTodos();
  } catch (error) {
    next(error);
    return;
  }
  res.json({
    todos: todos,
  });
}

async function addTodo(req, res, next) {
  const todoData = {
    text: req.body.text,
  };
  const todo = new Todo(todoData);

  let resulte;
  try {
    resulte = await todo.save();
  } catch (error) {
    next(error);
    return;
  }

  todoData._id = resulte.id;
  res.json({
    message: resulte.message,
    savedTodo: todoData,
  });
}

async function updateTodo(req, res, next) {
  const todoId = req.params.id;
  const todoData = {
    text: req.body.text,
    _id: todoId,
  };
  const todo = new Todo(todoData);

  let resulte;
  try {
    resulte = await todo.save();
  } catch (error) {
    next(error);
    return;
  }

  res.json({
    message: resulte.message,
    updatedTodo: todoData,
  });
}

async function deleteTodo(req, res, next) {
  const todoId = req.params.id;

  let resulte;
  try {
    resulte = await Todo.delete(todoId);
  } catch (error) {
    next(error);
    return;
  }

  res.json({
    message: resulte.message,
  });
}

module.exports = {
  fetchTodos: fetchTodos,
  addTodo: addTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
