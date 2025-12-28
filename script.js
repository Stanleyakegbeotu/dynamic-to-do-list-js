// To-Do List application
// Listens for DOMContentLoaded then sets up the add/remove task logic

document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-button');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task to the list
    // `initial` (optional) prevents showing the empty-input alert when invoked on load
    function addTask(initial = false) {
        if (!taskInput || !taskList) return;

        const taskText = taskInput.value.trim();

        // Validate input
        if (taskText === '') {
            if (!initial) {
                alert('Please enter a task.');
            }
            return;
        }

        // Create the list item and remove button
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove the task when the remove button is clicked
        removeBtn.onclick = function () {
            if (taskList.contains(li)) {
                taskList.removeChild(li);
            }
        };

        // Append the remove button and add the item to the list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear the input field
        taskInput.value = '';
    }

    // Attach event listener to Add Task button
    if (addButton) {
        addButton.addEventListener('click', function () {
            addTask();
        });
    }

    // Allow pressing Enter in the input field to add the task
    if (taskInput) {
        taskInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                addTask();
            }
        });
    }

    // Invoke addTask on DOMContentLoaded (won't show the empty alert on initial run)
    addTask(true);
});
