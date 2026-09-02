const mongodb = require("mongodb");
const db = require("../data/database");

class Todo {
  constructor(todoData) {
    this.text = todoData.text;
    if (!todoData._id) {
      this.id = todoData._id.toString();
    }
  }

  static async fetchTodoById(todoId) {
    let id;
    try {
      id = new mongodb.ObjectId(todoId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    const singleTodo = await db
      .getDb()
      .collection("todos")
      .findOne({ _id: id })
      .toArray();
    return singleTodo.map(function (singleTodoDoc) {
      return new Todo(singleTodoDoc);
    });
  }

  static async fetchAllTodos() {
    let todos;
    try {
      todos = await db.getDb().collection("todos").find().toArray();
    } catch (error) {
      throw error;
    }

    return todos.map(function (todoDoc) {
      return new Todo(todoDoc);
    });
  }

  async save() {
    if (this.id) {
      let id;
      try {
        id = new mongodb.ObjectId(this.id);
      } catch (error) {
        error.code = 404;
        throw error;
      }
      await db
        .getDb()
        .collection("todos")
        .updateOne({ _id: id }, { $set: { text: this.text } });
      return { message: "Todo updated successfully" };
    } else {
      const todoMeta = await db
        .getDb()
        .collection("todos")
        .insertOne({ text: this.text });
      const newId = todoMeta.insertedId.toString();
      return { message: "Todo saved successfully", id: newId };
    }
  }

  static async delete(todoId) {
    if (!todoId) {
      throw new Error("Trying to delete todo without idS");
    }
    let id;
    try {
      id = new mongodb.ObjectId(todoId);
    } catch (error) {
      error.code = 404;
      throw error;
    }
    await db.getDb().collection("todos").deleteOne({ _id: id });
    return { message: "Todo deleted successfully" };
  }
}

module.exports = Todo;
