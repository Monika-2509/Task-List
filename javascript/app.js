// Define a UI Variables
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const searchTask = document.querySelector("#search");
const clearBtn = document.querySelector("#btn-test");

// ADDING EVENT LISTENER
loadEventListeners();


function loadEventListeners() {
    // Load Content From Storage
    document.addEventListener("DOMContentLoaded", ready);
    //    Add Task Event
    form.addEventListener("submit", addTask);
    // Remove Task Using Icon
    taskList.addEventListener("click", removeItem);
    // Clear All Tasks
    clearBtn.addEventListener("click", clearAll);
    // Search Tasks
    searchTask.addEventListener("input", search);
}

// DEFINING FUNCTIONS
function ready() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function (items) {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.innerText = items;
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="fa fa-remove"></i>`;
        li.appendChild(link);
        taskList.appendChild(li);
    })
}
function storeTask(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

}
function removeStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let index = tasks.indexOf(`${task}`);
    if (index != -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

}
function addTask(Event) {
    Event.preventDefault();
    if (taskInput.value === "") {
        alert("Please fill the text field");
    }
    else {
        const li = document.createElement("li");
        li.className = "collection-item";
        li.innerText = taskInput.value;
        const link = document.createElement("a");
        link.className = "delete-item secondary-content";
        link.innerHTML = `<i class="fa fa-remove"></i>`;
        li.appendChild(link);
        taskList.appendChild(li);
        storeTask(taskInput.value);
        taskInput.value = "";
    }
}
function removeItem(event) {
    if (event.target.tagName === 'I') {
        removeStorage(event.target.parentElement.parentElement.textContent);
        event.target.parentElement.parentElement.remove();
    }

}
function clearAll() {
    const list = document.querySelectorAll("li");
    let count = 0;
    list.forEach(function (li) {
        if (count > 0) {
            li.remove();

        }
        count++;
    })
    localStorage.clear();
}
function search(e) {
    const searchVal = document.querySelectorAll("li")
    const searchStr = e.target.value.toLowerCase();
    const alertClass = document.querySelector(".alert");
    let c=0;
    searchVal.forEach(function (item) {
         c++;
        // taskList.removeChild(item);
       if(c!=2){
        item.classList.add("hidden")
        if (item.innerText.toLowerCase().indexOf(searchStr) > -1) {
                item.classList.remove("hidden");
                // taskList.appendChild(item);
        }
    }
    })
     let count=0;
    searchVal.forEach(function(items){
        if(items.className==="collection-item hidden"){
            count++;
        }
    })
    if(count == searchVal.length-1){
          alertClass.classList.remove("hidden");
    }
    else{
        alertClass.classList.add("hidden");
    }
} 
