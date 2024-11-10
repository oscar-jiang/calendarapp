// Add a new task/event
document.getElementById("add-suggestion").onclick = function () {
    const taskName = prompt("Enter task/event name:");
    if (taskName) {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.draggable = true;
        taskDiv.ondragstart = drag;
        taskDiv.textContent = taskName;
        document.getElementById("suggestions").appendChild(taskDiv);
    }
};

// Drag-and-drop functionality
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const task = document.getElementById(data);
    ev.target.appendChild(task);
}

// Load tasks from the backend
async function loadTasks() {
    const response = await fetch('http://localhost:8080/api/tasks');
    const tasks = await response.json();
    tasks.forEach(task => displayTask(task));
}

// Display a task in the suggestions area
function displayTask(task) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.draggable = true;
    taskDiv.ondragstart = drag;
    taskDiv.textContent = task.name;
    document.getElementById("suggestions").appendChild(taskDiv);
}

// Add a new task to the backend
async function addTask(name) {
    const task = { name, type: "task", duration: 0, description: "", participants: 0 };
    const response = await fetch('http://localhost:8080/api/tasks/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });
    const newTask = await response.json();
    displayTask(newTask);
}

// Add a new task when clicking the button
document.getElementById("add-suggestion").onclick = function () {
    const taskName = prompt("Enter task/event name:");
    if (taskName) addTask(taskName);
};
