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
        domElements.newTask.value = '';
        renderTodo(todos);
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

    todos.push(task);
    
}

//функция удаления задачи
function deleteTodo (id, list){
    list.forEach((task, idi) =>{
        if(task.id == id){
            list.splice(idi, 1);
        }
    })
}

//функция вывода задач в поле
function renderTodo(list){
    let htmlCode = '';

    list.forEach((task) => {

        const cls = task.done ? 'todo__task todo__task_complete' : 'todo__task';
        const clsIcon = task.done ? '.icon-edit_complete' : 'icon-edit'
        const checked = task.done ? 'checked' : '';
        const taskHTML = `
        

            <div id = "${task.id}" class="${cls}">

                
                <label class="todo__checkbox">
                    <input type="checkbox" ${checked}>
                    <div class="checkbox__visible todo__checkbox-div"></div>
                    <div class="todo__task-text todo__checkbox-div">
                        ${task.text}
                    </div>
                </label>
                        
                
                    
                <div class="todo__task-icon">
                    <i class="${clsIcon}"></i>
                    <i class="icon-del"></i>
                </div>
                    
            </div>
        `;

        htmlCode = htmlCode + taskHTML;
    });

    domElements.list.innerHTML = htmlCode;
}

//отслеживание статуса чекбокса
domElements.list.onclick = (event) => {
    const target = event.target;
    const checkboxEl = target.classList.contains('todo__checkbox-div');
    const deleteEl = target.classList.contains('icon-del');

    if (checkboxEl) {
        const task = target.parentElement.parentElement;
        const taskId = task.getAttribute('id');

        taskStatus(taskId, todos);
        renderTodo(todos);
    }

    if (deleteEl) {
        const task = target.parentElement.parentElement;
        const taskId = task.getAttribute('id');

        deleteTodo(taskId, todos);
        renderTodo(todos);
    }
}

//функция изменения статуса задачи
function taskStatus(id, list){
    list.forEach((task) => {
        if (task.id == id){
            task.done = !task.done
        }
    })
}