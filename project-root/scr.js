document.addEventListener("DOMContentLoaded", () => {
  const suggestionsList = document.getElementById("suggestions-list");
  const addTaskBtn = document.getElementById("add-task-btn");

  loadTasks();

  addTaskBtn.addEventListener("click", () => {
    const taskName = prompt("Enter task name:");
    if (taskName) {
      const task = createTaskObject(taskName);
      addTaskToDOM(task);
      saveTask(task);
    }
  });

  function createTaskObject(name) {
    return {
      id: `task-${Date.now()}`, // Unique ID
      name,
      completed: false,
      day: null // No assigned day initially
    };
  }

  function addTaskToDOM(task) {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.draggable = true;
    taskDiv.id = task.id;
    taskDiv.textContent = task.name;
    taskDiv.addEventListener("dragstart", drag);

    // Checkbox for marking task as completed
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.className = "task-checkbox";
    checkbox.addEventListener("change", (e) => toggleTaskCompletion(task.id, e.target.checked));
    taskDiv.prepend(checkbox);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", () => deleteTask(task.id, taskDiv));
    taskDiv.appendChild(deleteButton);

    // Append task to the correct location in the DOM
    if (task.day) {
      document.getElementById(task.day).querySelector(".day-content").appendChild(taskDiv);
    } else {
      suggestionsList.appendChild(taskDiv);
    }
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

// Drag-and-drop functions
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  // Set the task ID as data to transfer
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  
  // Get the task ID from the data transfer
  const taskId = event.dataTransfer.getData("text");
  const taskDiv = document.getElementById(taskId);

  // Ensure the taskDiv exists
  if (!taskDiv) {
    console.error("Task element not found:", taskId);
    return;
  }

  // Check if the drop target has a .day-content element to append to
  const dayContent = event.target.closest(".day-column").querySelector(".day-content");
  
  if (dayContent) {
    // Append the task to the correct day's .day-content div
    dayContent.appendChild(taskDiv);

    // Update task's assigned day in local storage
    const tasks = loadTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].day = event.target.closest(".day-column").id; // Save day ID (e.g., "sunday")
      saveTasksToLocalStorage(tasks);
    }
  } else {
    console.error("Could not find day-content for drop target:", event.target);
  }
}


  document.querySelectorAll(".day-column").forEach(dayColumn => {
    dayColumn.ondrop = drop;
    dayColumn.ondragover = allowDrop;
  });
});
