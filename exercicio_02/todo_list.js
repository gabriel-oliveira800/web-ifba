const insertTodo = document.getElementById('insert-todo-list');
const listOfItem = document.getElementById('all_todo_list');
const addNewItem = document.getElementById('add-new-item');

let items = [];

window.addEventListener('load', () => {
    addNewItem.onclick = addItem;
});


function addItem() {
    const value = insertTodo.value;

    if (!value) return;

    items.push({
        id: Math.floor(Math.random() * 10), todo: value, completed: false,
    });

    insertTodo.value = '';

    items.forEach((value) => createElement(value));
}

function createElement(item) {
    const checkBox = document.createElement('input');
    const span = document.createElement('span');

    span.innerText = item.todo;

    checkBox.id = item.id;
    checkBox.type = 'checkbox';
    checkBox.checked = item.completed;

    const li = document.createElement('li');

    li.className = 'all-todo-list-item';
    li.appendChild(checkBox);
    li.appendChild(span);


    listOfItem.appendChild(li);
}
