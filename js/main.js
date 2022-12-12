const domElements = {
    newTask: document.getElementById('newTask'),
    addTask: document.getElementById('addTask'),
    list: document.getElementById('list')
}

const todos = [];

//функция добавления задачи по клику
domElements.addTask.onclick = () => {
    const task = domElements.newTask.value;

    if(task){
        addTodo(task);
        domElements.newTask.value = ''
    }
}

//функция добавления
function addTodo(text){
    const id = Date.now();
    const task= {
        text,
        done: false,
        id: id
    };

    console.log(task)
    todos.push(task);
    
}