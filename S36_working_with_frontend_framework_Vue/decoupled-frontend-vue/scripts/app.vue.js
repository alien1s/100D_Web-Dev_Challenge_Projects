const TodoApp = {
  data() {
    return {
      newTodo: "learn Vue.js",
      enteredTodoText: "",
    };
  },

  methods: {
    saveTodo(event) {
      event.preventDefault();
      this.newTodo = this.enteredTodoText;
      this.enteredTodoText = "";
    },
  },
};

Vue.createApp(TodoApp).mount("#todos-app");
