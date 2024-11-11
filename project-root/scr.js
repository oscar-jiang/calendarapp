document.addEventListener("DOMContentLoaded", () => {
  const tasksList = document.getElementById("tasks-list");
  const addTaskBtn = document.getElementById("add-task-btn");

  loadTasks();

 // add new task with time interval
addTaskBtn.addEventListener("click", () => {
  const taskName = prompt("Enter task name:");
  const startTime = prompt("Enter start time (e.g., 09:00):");
  const endTime = prompt("Enter end time (e.g., 10:30):");

  if (taskName && startTime && endTime) {
    const task = createTaskObject(taskName, startTime, endTime);
    addTaskToDOM(task);
    saveTask(task);
  }
});

// create task object with time interval
function createTaskObject(name, startTime, endTime) {
  return {
    id: `task-${Date.now()}`, // Unique ID
    name,
    completed: false,
    day: null, // No assigned day initially
    startTime,
    endTime
  };
}

function addTaskToDOM(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  taskDiv.draggable = true;
  taskDiv.id = task.id;

  // display task name and time interval
  taskDiv.innerHTML = `<strong>${task.name}</strong><br>${task.startTime} - ${task.endTime}`;

  taskDiv.addEventListener("dragstart", drag);

  // checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.className = "task-checkbox";
  checkbox.addEventListener("change", (e) => toggleTaskCompletion(task.id, e.target.checked));
  taskDiv.prepend(checkbox);

  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-button";
  deleteButton.addEventListener("click", () => deleteTask(task.id, taskDiv));
  taskDiv.appendChild(deleteButton);

  // append task to correct location in the DOM
  if (task.day) {
    const dayContent = document.getElementById(task.day).querySelector(".day-content");
    dayContent.appendChild(taskDiv);
    sortTasksByTime(dayContent);
  } else {
    tasksList.appendChild(taskDiv);
  }
}
function sortTasksByTime(dayContent) {
  // get all task elements in the day
  const tasks = Array.from(dayContent.querySelectorAll(".task"));

  // sort tasks by their startTime
  tasks.sort((a, b) => {
    const timeA = a.querySelector('strong').textContent;
    const timeB = b.querySelector('strong').textContent;
    const [startHourA, startMinA] = timeA.split(":").map(Number);
    const [startHourB, startMinB] = timeB.split(":").map(Number);
    return startHourA * 60 + startMinA - (startHourB * 60 + startMinB);
  });

  // clear the day and append tasks in sorted order
  dayContent.innerHTML = "";
  tasks.forEach(task => dayContent.appendChild(task));
}

// 3 things above not working ^^^^^^^^^^^^^^

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

  // delete task
  function deleteTask(taskId, taskElement) {
    // remove task from local storage
    const tasks = loadTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasksToLocalStorage(updatedTasks);

    // remove task element from DOM
    taskElement.remove();
  }

// drag-drop functions
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  // set the task ID as data
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  
  // get taskID
  const taskId = event.dataTransfer.getData("text");
  const taskDiv = document.getElementById(taskId);

  // ensure taskDiv exists
  if (!taskDiv) {
    console.error("Task element not found:", taskId);
    return;
  }

  // check if drop target element to append to
  const dayContent = event.target.closest(".day-column").querySelector(".day-content");
  
  if (dayContent) {
    // append the task to day
    dayContent.appendChild(taskDiv);

    // update task's assigned day in local storage
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

    // dropping a task back to the tasks section
function dropToTasks(event) {
  event.preventDefault();

  if (!taskDiv) {
    console.error("Task element not found", taskID);
    return;
  }

  const taskmain = event.target.closest(".taskmain")
  
  if (taskDiv) {
    // append task back to tasks list
    taskmain.appendChild(taskDiv);

    // Update task's 'day' property in local storage
    const tasks = loadTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].day = null; // Reset the day to null
      saveTasksToLocalStorage(tasks); // Save updated tasks
    }
  } else {
    console.error("Task element not found:", taskId);
  }
}
// task drag drop not working ^^^^^^

  });
  function toggleTaskCompletion(taskId, isCompleted) {
    const tasks = loadTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
  
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = isCompleted;
      saveTasksToLocalStorage(tasks);
  
      // Get task element
      const taskElement = document.getElementById(taskId);
      
      // Toggle "completed" class
      if (isCompleted) {
        taskElement.classList.add("completed");
      } else {
        taskElement.classList.remove("completed");
      }}}

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.className = "task-checkbox";
  
  // Trigger toggleTaskCompletion if checked
  checkbox.addEventListener("change", (e) => toggleTaskCompletion(task.id, e.target.checked));
  taskDiv.prepend(checkbox);
  
});
