document.addEventListener("DOMContentLoaded", () => {
    // Element references
    const suggestionsList = document.getElementById("suggestions-list");
    const addTaskBtn = document.getElementById("add-task-btn");
  
    // Load tasks from local storage on page load
    loadTasks();
  
    // Event listener for adding a new task
    addTaskBtn.addEventListener("click", () => {
      const taskName = prompt("Enter task name:");
      if (taskName) {
        const task = createTaskObject(taskName);
        addTaskToDOM(task);
        saveTask(task);
      }
    });
  
    // Function to create a new task object
    function createTaskObject(name) {
      return {
        id: `task-${Date.now()}`, // Unique ID based on timestamp
        name,
        completed: false,
        day: null // Initially no assigned day
      };
    }
  
    // Function to add a task to the DOM (in the suggestions list or a specific day)
    function addTaskToDOM(task) {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";
      taskDiv.draggable = true;
      taskDiv.id = task.id;
      taskDiv.textContent = task.name;
      taskDiv.addEventListener("dragstart", drag);
      
      // Create a checkbox for marking as completed
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.completed;
      checkbox.className = "task-checkbox";
      checkbox.addEventListener("change", (e) => toggleTaskCompletion(task.id, e.target.checked));
  
      taskDiv.prepend(checkbox);
      
      // Append task to the correct location in the DOM
      if (task.day) {
        document.getElementById(task.day).querySelector(".day-content").appendChild(taskDiv);
      } else {
        suggestionsList.appendChild(taskDiv);
      }
    }
  
    // Save task to local storage
    function saveTask(task) {
      const tasks = loadTasksFromLocalStorage();
      tasks.push(task);
      saveTasksToLocalStorage(tasks);
    }
  
    // Save all tasks to local storage
    function saveTasksToLocalStorage(tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Load all tasks from local storage
    function loadTasksFromLocalStorage() {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
      return tasks ? tasks : [];
    }
  
    // Load tasks from local storage and add to the DOM
    function loadTasks() {
      const tasks = loadTasksFromLocalStorage();
      tasks.forEach((task) => addTaskToDOM(task));
    }
  
    // Toggle task completion status
    function toggleTaskCompletion(taskId, isCompleted) {
      const tasks = loadTasksFromLocalStorage();
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex].completed = isCompleted;
        saveTasksToLocalStorage(tasks);
      }
    }
  
    // Drag-and-drop functions
    function allowDrop(event) {
      event.preventDefault();
    }
  
    function drag(event) {
      event.dataTransfer.setData("text", event.target.id);
    }
  
    function drop(event) {
      event.preventDefault();
      const taskId = event.dataTransfer.getData("text");
      const taskDiv = document.getElementById(taskId);
      
      // Append task to the day content
      event.target.querySelector(".day-content").appendChild(taskDiv);
      
      // Update task's day in local storage
      const tasks = loadTasksFromLocalStorage();
      const taskIndex = tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        tasks[taskIndex].day = event.target.id; // Save day ID (e.g., "monday", "tuesday")
        saveTasksToLocalStorage(tasks);
      }
    }
  
    // Attach event listeners for drop targets (days)
    document.querySelectorAll(".day-column").forEach(dayColumn => {
      dayColumn.ondrop = drop;
      dayColumn.ondragover = allowDrop;
    });
  });
  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-button";
  deleteButton.addEventListener("click", () => deleteTask(task.id, taskDiv));
  taskDiv.appendChild(deleteButton);

  // Append to suggestions or assigned day
  if (task.day) {
    document.getElementById(task.day).querySelector(".day-content").appendChild(taskDiv);
  } else {
    suggestionsList.appendChild(taskDiv);
  }

function saveTask(task) {
  const tasks = loadTasksFromLocalStorage();
  tasks.push(task);
  saveTasksToLocalStorage(tasks);
}

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  return tasks ? tasks : [];
}

function loadTasks() {
  const tasks = loadTasksFromLocalStorage();
  tasks.forEach((task) => addTaskToDOM(task));
}

function toggleTaskCompletion(taskId, isCompleted) {
  const tasks = loadTasksFromLocalStorage();
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].completed = isCompleted;
    saveTasksToLocalStorage(tasks);
  }
}

// New function to delete task
function deleteTask(taskId, taskElement) {
  // Remove task from local storage
  const tasks = loadTasksFromLocalStorage();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  saveTasksToLocalStorage(updatedTasks);

  // Remove task element from the DOM
  taskElement.remove();
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("text");
  const taskDiv = document.getElementById(taskId);
  
  // Append task to the day content
  event.target.querySelector(".day-content").appendChild(taskDiv);

  // Update task's day in local storage
  const tasks = loadTasksFromLocalStorage();
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex].day = event.target.id; // Save day ID (e.g., "monday", "tuesday")
    saveTasksToLocalStorage(tasks);
  }
}

document.querySelectorAll(".day-column").forEach(dayColumn => {
  dayColumn.ondrop = drop;
  dayColumn.ondragover = allowDrop;
});
