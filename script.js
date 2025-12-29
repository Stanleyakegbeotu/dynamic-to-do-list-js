// Wait until the HTML document is fully loaded before running any code
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-button'); // "Add Task" button
  const taskInput = document.getElementById('task-input'); // input for new tasks
  const taskList = document.getElementById('task-list'); // ul where tasks will be shown

  // Safety: ensure required elements exist
  if (!taskInput || !taskList) {
    console.warn('Required elements (#task-input or #task-list) not found in the document.');
    return;
  }

  // In-memory array of tasks (strings) to keep state and sync with localStorage
  let tasks = [];

  // Save the current tasks array to Local Storage
  function saveTasks() {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to save tasks to localStorage', err);
    }
  }

  // Create a task element in the DOM for a given task text
  function createTaskElement(taskText) {
    const li = document.createElement('li');
    li.textContent = taskText;
    // Store original text in a data attribute for reliable removal
    li.dataset.task = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Remove handler: remove from DOM and from tasks array, then save
    removeBtn.onclick = () => {
      if (li.parentElement === taskList) {
        taskList.removeChild(li);
      }

      const idx = tasks.indexOf(taskText);
      if (idx > -1) {
        tasks.splice(idx, 1);
        saveTasks();
      }
    };

    li.appendChild(removeBtn);
    return li;
  }

  // Load tasks from Local Storage and populate the DOM
  function loadTasks() {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      if (Array.isArray(storedTasks)) {
        tasks = storedTasks.slice(); // copy into our in-memory array
        storedTasks.forEach((t) => {
          const li = createTaskElement(t);
          taskList.appendChild(li);
        });
      }
    } catch (err) {
      console.error('Failed to load tasks from localStorage', err);
    }
  }

  // Function: addTask
  // - If taskTextArg is provided, use it; otherwise read from input
  // - Optionally save the task to Local Storage (save === true)
  function addTask(taskTextArg, save = true) {
    const raw = typeof taskTextArg === 'string' ? taskTextArg : taskInput.value;
    const taskText = (raw || '').trim();

    // If the task text is empty, alert the user only when this is a user-triggered add
    if (taskText === '') {
      if (save) {
        alert('Please enter a task');
      }
      return;
    }

    // Create and append the task element
    const li = createTaskElement(taskText);
    taskList.appendChild(li);

    // Update in-memory array and Local Storage when needed
    if (save) {
      tasks.push(taskText);
      saveTasks();
      taskInput.value = '';
    }
  }

  // Attach event listener to the Add button (if it exists)
  if (addButton) {
    addButton.addEventListener('click', () => addTask());
  }

  // Allow adding a task by pressing Enter in the input field
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Load tasks from Local Storage when the page loads
  loadTasks();
});
