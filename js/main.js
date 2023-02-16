const domElements = {
    newTask: document.getElementById('newTask'),
    addTask: document.getElementById('addTask'),
    list: document.getElementById('list'),
    containerList: document.getElementById('containerList')
}

let todos = [];

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
    saveTodosLS();
}

//функция удаления задачи
function deleteTodo (id, list){
    list.forEach((task, idi) =>{
        if(task.id == id){
            list.splice(idi, 1);
        }
    })

    saveTodosLS()
}

//функция редактирования задачи
function editTodo(id, list) {
    list.forEach((task, idi) => {
        if(task.id == id){
            domElements.newTask.value = list[idi].text;
        }
    })
}

//Функция добавления в LS
function saveTodosLS(){
    localStorage.setItem('todos', JSON.stringify(todos))
}

//вывод из LS
if (localStorage.getItem('todos')){
    todos = JSON.parse(localStorage.getItem('todos'))
    renderTodo(todos)
}

//функция вывода пользовательского окна
function renderUserWindow(containerList){
    let htmlCodeWindow = '';

    containerList.forEach(() => {
        const taskHTMLWindow = `
        <div class="popup">
            <div class="popup__container">

                <div class="popup__text title">
                    <span class="text">Вы уверены, что хотите удалить заметку?</span>
                </div>
    
                <div class="popup__btn">
    
                    <button class="btn btn_size btn-Y">
                        Да
                    </button>
    
                    <button class="btn btn_size btn-N" >
                        Нет
                    </button>
    
                </div>
            </div>
        </div>
        `;

        htmlCodeWindow = htmlCodeWindow + taskHTMLWindow;
    });

    domElements.containerList.innerHTML = htmlCodeWindow;
}

//функция вывода задач в поле
function renderTodo(list){
    let htmlCode = '';

    list.forEach((task) => {

        const clsTask = task.done ? 'todo__task todo__task_complete' : 'todo__task';
        const clsIcon = task.done ? '.icon-edit_complete' : 'icon-edit'
        const checked = task.done ? 'checked' : '';
        const taskHTML = `
        
            <div id = "${task.id}" class="${clsTask}">

                <label class="todo__checkbox">
                    <input type="checkbox" ${checked}>
                    <div class="checkbox__visible todo__checkbox-div"></div>
                    <span class="todo__task-text todo__checkbox-div">
                        ${task.text}
                    </span>
                </label>
                           
                <div class="todo__task-icon">
                    <i class="${clsIcon}"></i>
                    <i class="icon-del popup-link"></i>
                </div>
                    
            </div>
        `;

        htmlCode = htmlCode + taskHTML;
    });

    domElements.list.innerHTML = htmlCode;
}

domElements.containerList.onclick = (event) => {
    const target = event.target;
}


//отслеживание кликов
domElements.list.onclick = (event) => {
    const target = event.target;
    const checkboxEl = target.classList.contains('todo__checkbox-div');
    const deleteEl = target.classList.contains('icon-del');
    const editEl = target.classList.contains('icon-edit');

    if (checkboxEl) {
        const task = target.parentElement.parentElement;
        const taskId = task.getAttribute('id');

        console.log(taskId)
        taskStatus(taskId, todos);
        renderTodo(todos);
    }

    if (deleteEl) {
        const task = target.parentElement.parentElement;
        const taskId = task.getAttribute('id');
        
        deleteTodo(taskId, todos)
        renderTodo(todos);
    }

    if (editEl) {
        const task = target.parentElement.parentElement;
        const taskId = task.getAttribute('id');

        editTodo(taskId, todos);
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

    saveTodosLS();
}