
class Task {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        this.completed = false
    }

    isItCompleted() {
        this.completed = !this.completed;
    }
}


class TaskManger {
    constructor() {
        this.tasks = [];
        this.nextID = 1;
        this.loadTasks();
    }

    addTask(title) {
        const task = new Task(this.nextID, title)
        this.tasks.push(task);
        this.nextID++;
        this.saveTasks()
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks()
    }

    toggleTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.isItCompleted();
            this.saveTasks()
        }
    }

    editTask(id, newTitle) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.title = newTitle.trim("");
            this.saveTasks();
        }
    }

    saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        localStorage.setItem("nextID", this.nextID);
    }

    loadTasks() {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            const parsedTasks = JSON.parse(savedTasks);
            this.tasks = parsedTasks.map(task => {
                const newTask = new Task(task.id, task.title);
                newTask.completed = task.completed;
                return newTask;
            });
        } else {
            this.tasks = [];
        }

        this.nextID = Number(localStorage.getItem("nextID")) || 1;
    }
}


const manager = new TaskManger()
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");


function renderTasks() {
    taskList.innerHTML = "";

    manager.tasks.forEach(task => {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.innerText = task.title;
        taskText.classList.add("task-text");

        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");

        const editButton = document.createElement("button");
        editButton.innerText = "עריכה ✏️";
        editButton.classList.add("edit");
        editButton.onclick = () => {
            editTaskUI(task, taskText);
        };

        const toggleButton = document.createElement("button");
        toggleButton.innerText = "בוצע ✓";
        toggleButton.classList.add("done");
        toggleButton.onclick = () => {
            manager.toggleTask(task.id);
            renderTasks();
        };

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "מחיקה X";
        deleteButton.classList.add("delete");
        deleteButton.onclick = () => {
            manager.removeTask(task.id);
            renderTasks();
        };

        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(toggleButton);
        buttonContainer.appendChild(deleteButton);

        li.appendChild(taskText);
        li.appendChild(buttonContainer);
        taskList.appendChild(li);

        if (task.completed) {
            li.classList.add("completed");
        }
    });
}


addTaskButton.addEventListener("click", () => {
    const title = taskInput.value.trim();
    if (title) {
        manager.addTask(title);
        taskInput.value = "";
        renderTasks();
    }
})

function editTaskUI(task, taskText) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = task.title;

    const saveButton = document.createElement("button");
    saveButton.innerText = "שמור 💾";
    saveButton.onclick = () => {
        manager.editTask(task.id, input.value);
        renderTasks();
    };

    const parentLi = taskText.parentElement;
    parentLi.innerHTML = "";

    parentLi.appendChild(input);
    parentLi.appendChild(saveButton);

    input.focus();
}

renderTasks();