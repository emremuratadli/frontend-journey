// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const clearAllBtn = document.getElementById('clearAllBtn');
const emptyState = document.getElementById('emptyState');

// Task counter
let taskCounter = 0;

// Functions to run when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateEmptyState();
    
    // Add event listeners
    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    clearAllBtn.addEventListener('click', clearAllTasks);
});

// Add new task function
function addTask() {
    const taskText = taskInput.value.trim();
    
    // Empty task check
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    // Create task element
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <span class="todo-text">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">×</button>
    `;
    
    // Add to list
    todoList.appendChild(li);
    
    // Clear input
    taskInput.value = '';
    
    // Increment task counter
    taskCounter++;
    
    // Update empty state
    updateEmptyState();
    
    // Focus on input
    taskInput.focus();
}

// Delete task function
function deleteTask(button) {
    const li = button.parentElement;
    
    // Delete animation
    li.style.transform = 'translateX(100%)';
    li.style.opacity = '0';
    
    // Remove element after animation completes
    setTimeout(() => {
        li.remove();
        taskCounter--;
        updateEmptyState();
    }, 300);
}

// Clear all tasks function
function clearAllTasks() {
    if (taskCounter === 0) {
        alert('No tasks to delete!');
        return;
    }
    
    const confirmDelete = confirm('Are you sure you want to delete all tasks?');
    
    if (confirmDelete) {
        // Clear all tasks with animation
        const todoItems = document.querySelectorAll('.todo-item');
        
        todoItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(100%)';
                item.style.opacity = '0';
                
                setTimeout(() => {
                    item.remove();
                    taskCounter--;
                    updateEmptyState();
                }, 200);
            }, index * 100);
        });
    }
}

// Update empty state
function updateEmptyState() {
    if (taskCounter === 0) {
        emptyState.classList.remove('hidden');
        clearAllBtn.style.opacity = '0.5';
        clearAllBtn.style.cursor = 'not-allowed';
    } else {
        emptyState.classList.add('hidden');
        clearAllBtn.style.opacity = '1';
        clearAllBtn.style.cursor = 'pointer';
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + A to focus on new task input
    if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        taskInput.focus();
    }
    
    // Escape to clear input
    if (e.key === 'Escape') {
        taskInput.value = '';
        taskInput.blur();
    }
});

// Edit task when task text is clicked (bonus feature)
function editTask(span) {
    const currentText = span.textContent;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.className = 'edit-input';
    input.style.cssText = `
        border: 2px solid #3498db;
        border-radius: 4px;
        padding: 5px;
        font-size: 1rem;
        width: 100%;
    `;
    
    span.replaceWith(input);
    input.focus();
    input.select();
    
    // Save edit on Enter or blur
    function saveEdit() {
        const newText = input.value.trim();
        if (newText === '') {
            alert('Task cannot be empty!');
            input.focus();
            return;
        }
        
        const newSpan = document.createElement('span');
        newSpan.className = 'todo-text';
        newSpan.textContent = newText;
        newSpan.onclick = () => editTask(newSpan);
        
        input.replaceWith(newSpan);
    }
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
    
    input.addEventListener('blur', saveEdit);
}

// Add click feature to task texts (when page loads)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('todo-text')) {
        editTask(e.target);
    }
});