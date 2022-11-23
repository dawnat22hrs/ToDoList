const todoList = document.querySelector('todo-list');

let todos = [];

function addTodo(text){
    let id = Date.now();

    const todo= {
        text,
        done: false,
        id: id
    };

    todos.push(todo);
}

function deleteTodo(id){
    todos.forEach(todo => {
        if(todo.id === id){
            todo.done = true;
        };
    })
}

function render(){
    console.log(todos)
    /*let html = '';

    todos.forEach(todo => {
        if (todo.done) {
            return
        };

        html += `<div>${todo.text}</div>`
            
    })

    todoList.innerHTML = html;*/
}

addTodo("Купить хлеб");
addTodo("Убрать за котом")

render();