 
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let filter = 'all';
  const resultpopup = document.getElementById("inputValpopup");
  const result = document.getElementById("inputVal");
  const taskInput = document.getElementById('new-task');
  const addTaskButton = document.getElementById('add-task');
  const todoList = document.getElementById('todo-list');
  const filterButtons = {
    all: document.getElementById('filter-all'),
    todo: document.getElementById('filter-todo'),
    done: document.getElementById('filter-done')
  };

  const renderTasks = () => {
todoList.innerHTML = ''; // Clear the list before re-rendering

tasks.filter(task => {
  if (filter === 'all') return true;
  if (filter === 'todo') return !task.completed;
  if (filter === 'done') return task.completed;
}).forEach((task, index) => {
  // Create the li element for each task
  const li = document.createElement('li');
  li.className = `todo-item ${task.completed ? 'done' : ''}`;

  // Create the span for the task name
  const span = document.createElement('span');
  span.textContent = task.name;
  span.className = 'todo-text';

  // Append the span to the li element
  li.appendChild(span);

  // Create the actions div for the buttons
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'actions';

  // Create the complete button
  const completeButton = document.createElement('button');
  completeButton.innerHTML = task.completed ? '☑' : '☐';
  completeButton.addEventListener('click', () => toggleComplete(index));
  actionsDiv.appendChild(completeButton);

  // Create the edit button
  const editButton = document.createElement('button');
  editButton.innerHTML = '✏️';
  editButton.addEventListener('click', () => editTask(index));
  actionsDiv.appendChild(editButton);

  // Create the delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '🗑️';
  deleteButton.className = 'delete-btn';
  deleteButton.addEventListener('click', () => deleteTask(index));
  actionsDiv.appendChild(deleteButton);

  // Append the actions div to the li element
  li.appendChild(actionsDiv);

  // Append the li to the todoList
  todoList.appendChild(li);
});
};



  const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  
  const addTask = () => {
    const taskName = taskInput.value.trim();
    if (!taskName) return showMessage('Task cannot be empty.',"red");
    if (taskName.length < 5)  return showMessage('Task must be at least 5 characters long.',"red");
    if (/^\d/.test(taskName)) return showMessage('Task cannot start with a number.');

    tasks.push({ name: taskName, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  };

  const toggleComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  };

  const editTask = (index) => {
const modal = document.getElementById('edit-modal');
const editInput = document.getElementById('edit-task-input');
const saveBtn = document.getElementById('save-edit-btn');
const cancelBtn = document.getElementById('cancel-edit-btn');

editInput.value = tasks[index].name;
modal.style.display = 'flex';

saveBtn.onclick = () => {
  const newName = editInput.value.trim();
  if (!newName) return showMessagepopup('Task cannot be empty.', 'red');
  if (newName.length < 5) return showMessagepopup('Task must be at least 5 characters long.', 'red');
  if (/^\d/.test(newName)) return showMessagepopup('Task cannot start with a number.', 'red');

  tasks[index].name = newName;
  saveTasks();
  renderTasks();
  modal.style.display = 'none';
};

cancelBtn.onclick = () => {
  modal.style.display = 'none';
};
};

const deleteTask = (index) => {
const deleteModal = document.getElementById('delete-modal');
const confirmBtn = document.getElementById('confirm-btn');
const cancelBtn = document.getElementById('cancel-delete-btn');

deleteModal.style.display = 'flex'; // Show the modal

confirmBtn.onclick = () => {
  tasks.splice(index, 1); // Remove the task
  saveTasks();
  renderTasks();
  deleteModal.style.display = 'none'; // Hide the modal
};

cancelBtn.onclick = () => {
  deleteModal.style.display = 'none'; // Hide the modal without deleting
};
};

const deleteAllTasks = () => {
const deleteAllModal = document.getElementById('delete-all-modal');
const confirmAllBtn = document.getElementById('confirm-all-btn');
const cancelAllBtn = document.getElementById('cancel-delete-all-btn');

deleteAllModal.style.display = 'flex'; // Show the modal

confirmAllBtn.onclick = () => {
  tasks = []; // Clear all tasks
  saveTasks();
  renderTasks();
  deleteAllModal.style.display = 'none'; // Hide the modal
};

cancelAllBtn.onclick = () => {
  deleteAllModal.style.display = 'none'; // Hide the modal without deleting
};
};

const deleteDoneTasks = () => {
const deleteDoneModal = document.getElementById('delete-done-modal');
const confirmDoneBtn = document.getElementById('confirm-done-btn');
const cancelDoneBtn = document.getElementById('cancel-delete-done-btn');

deleteDoneModal.style.display = 'flex'; // Show the modal

confirmDoneBtn.onclick = () => {
  tasks = tasks.filter(task => !task.completed); // Keep only incomplete tasks
  saveTasks();
  renderTasks();
  deleteDoneModal.style.display = 'none'; // Hide the modal
};

cancelDoneBtn.onclick = () => {
  deleteDoneModal.style.display = 'none'; // Hide the modal without deleting
};
};


  const setFilter = (newFilter) => {
    filter = newFilter;
    Object.values(filterButtons).forEach(button => button.classList.remove('active'));
    filterButtons[newFilter].classList.add('active');
    renderTasks();
  };

  addTaskButton.addEventListener('click', addTask);
  filterButtons.all.addEventListener('click', () => setFilter('all'));
  filterButtons.todo.addEventListener('click', () => setFilter('todo'));
  filterButtons.done.addEventListener('click', () => setFilter('done'));
  document.getElementById('delete-done-btn').addEventListener('click', deleteDoneTasks);
  document.getElementById('delete-all-btn').addEventListener('click', deleteAllTasks);

  renderTasks();
function showMessage(message, color) {
result.textContent = message;
result.style.color = color;
setTimeout(() => {
  result.textContent = ""; // Clear the message after 1 second
}, 1000);
}
function showMessagepopup(message, color) {
resultpopup.textContent = message;
resultpopup.style.color = color;
setTimeout(() => {
  result.textContent = ""; // Clear the message after 1 second
}, 1000);
}