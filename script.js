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

  // Flag used to prevent showing an alert when addTask is invoked automatically on load
  let isInitialLoad = true;

  // Function: addTask
  // - Reads the trimmed input value
  // - Alerts the user if empty (except during initial load)
  // - Creates an li with the task text and a Remove button
  // - Appends the li to the task list and clears the input
  function addTask() {
    // Retrieve and trim the value from the input field
    const taskText = taskInput.value.trim();

    // If the task text is empty
    if (taskText === '') {
      // During initial automatic invocation on DOMContentLoaded, do not alert
      if (isInitialLoad) {
        isInitialLoad = false;
        return;
      }

      // Prompt the user to enter a task
      alert('Please enter a task');
      return;
    }

    // Create a new list item and set its text
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a remove button for the task
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // When the remove button is clicked, remove the corresponding li from the list
    removeBtn.onclick = () => {
      if (li.parentElement === taskList) {
        taskList.removeChild(li);
      }
    };

    // Append the button to the list item and the item to the list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear the input field and reset the initial-load flag
    taskInput.value = '';
    isInitialLoad = false;
  }

  // Attach event listener to the Add button (if it exists)
  if (addButton) {
    addButton.addEventListener('click', addTask);
  }

  // Allow adding a task by pressing Enter in the input field
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Invoke addTask on DOMContentLoaded as requested (safe because of the initial-load flag)
  addTask();
});
