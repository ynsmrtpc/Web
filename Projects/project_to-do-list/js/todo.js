const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodos);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filtertodos);
    clearButton.addEventListener("click", clearAllTodos);
}

function clearAllTodos(e) {
    if (todoList.firstElementChild === null) {
        showAlert("danger", "Yapılacaklar Listesi Zaten Boş!");
    } else {
        if (confirm("Tüm Yapılacaklar Listesini Silmek İstediğinize Emin Misiniz?")) {
            //  todoList.innerHTML = ""; yavaş yöntem
            while (todoList.firstElementChild != null) {
                todoList.removeChild(todoList.firstElementChild);
            }
            showAlert("danger", "Tüm Yapılacaklar Listesi Silindi");
        }
        localStorage.removeItem("todos");
    }
}

function filtertodos(event) {
    const filterValue = event.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display : none !important");
            showAlert("danger", "Yapılacak İş Bulunamadı!");
        } else {
            listItem.setAttribute("style", "display : block");
        }
    });
}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("warning", "Yapılacak iş başarıyla silindi!");
    }
}

function deleteTodoFromStorage(deletetodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo, index) {
        if (todo.trim() === deletetodo.trim()) {
            todos.splice(index, 1);
        }
        localStorage.setItem("todos", JSON.stringify(todos));

    });
}

function loadAllTodos() {
    let todos = getTodosFromStorage();
    todos.forEach(function(todo) {
        addTodoToUI(todo);
    });
}

function addTodo(e) {
    const newTodo = todoInput.value.trim();
    if (newTodo === "") {
        showAlert("danger", "Lütfen Bir Yapılacak İş Girin!");
    } else {
        addTodoToUI(newTodo);
        addTodotoStorage(newTodo);
        showAlert("success", "Yapılacak İş Başarıyla Eklendi!");
    }
    e.preventDefault();
}

function getTodosFromStorage() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodotoStorage(newTodo) {
    let todos = getTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} animate__bounceIn`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    setTimeout(function() {
        alert.remove();
    }, 1700)
}

function addTodoToUI(newTodo) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = " <i class='fa fa-remove'></i> ";
    listItem.className = "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);
    todoList.appendChild(listItem);
    todoInput.value = "";
}