// To-Do List application using DOMContentLoaded
// All code runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Select DOM elements
    const addButton = document.getElementById('add-button');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // If required elements are missing, stop to avoid errors
    if (!addButton || !taskInput || !taskList) return;

    // Function to add a new task to the list
    function addTask() {
        const taskText = taskInput.value.trim();

        // If the input is empty, prompt the user
        if (taskText === "") {
            alert('Please enter a task.');
            return;
        }

        // Create the list item and the remove button
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // When clicked, remove the task from the list
        removeBtn.onclick = function () {
            li.remove();
        };

        // Append the remove button and the list item
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear and focus the input field
        taskInput.value = '';
        taskInput.focus();
    }

    // Attach click listener to "Add Task" button
    addButton.addEventListener('click', addTask);

    // Allow adding a task by pressing Enter in the input
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            addTask();
        }
    });

    // Invoke addTask on DOMContentLoaded if there is initial text present
    if (taskInput.value && taskInput.value.trim() !== '') {
        addTask();
    }
});
