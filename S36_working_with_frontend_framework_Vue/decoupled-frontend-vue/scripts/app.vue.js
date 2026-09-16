const TodoApp = {
    data(){
        return {
            newTodo: 'learn Vue.js'
        }
    }
}

Vue.createApp(TodoApp).mount('#todos-app')

