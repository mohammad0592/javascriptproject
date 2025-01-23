const addNewTask=document.getElementById("button-add-new-task");
const inputNew=document.getElementById("input-new-task");
const validation=document.getElementById("showmessage");
const list =document.getElementById("list");
const validationpopup=document.getElementById("inputValpopup");
const deletedonetasks=document.getElementById("button-delete-done-tasks");
const deletealltasks=document.getElementById("button-delete-all-tasks");
const filterall=document.getElementById("filter-button-all");
const filterdone=document.getElementById("filter-button-done");
const filtertodo=document.getElementById("filter-button-todo");
let arrayoftasks = JSON.parse(localStorage.getItem('tasks')) || [];
var count = 0;

//button for adding the task .
addNewTask.addEventListener("click", function () {
  const taskname = inputNew.value.trim();
  if (taskname === "") {
    return showmessage("Task cannot be empty.", "red");
  } else if (/^\d/.test(taskname)) {
    return showmessage("Task cannot start with a number.", "red");
  } else if (taskname.length < 5) {
    return showmessage("Task must be at least 5 characters long.", "red");
  }
  const task = { name: taskname, completed: false, id:count++}; 
  arrayoftasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(arrayoftasks)); 
  list.innerHTML="";
  deletealltasks.disabled=false;
  deletealltasks.classList.remove("disabled");
  deletedonetasks.disabled=false;
  deletedonetasks.classList.remove("disabled");
  createTaskElement(task); 
  inputNew.value = ""; 
});

// create the task elements .
function createTaskElement(task) {
  const li = document.createElement("li");
  li.id = "li" + task.id;

  const paragraph = document.createElement("p");
  paragraph.id = "paragraph" + task.id;
  paragraph.innerHTML = task.name;
  if (task.completed) {
    paragraph.classList.add("completedtask");
  }
  li.appendChild(paragraph);

  const div = document.createElement("div");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  div.appendChild(checkbox);
  checkbox.addEventListener("change", function () {
    task.completed = !task.completed;
    paragraph.classList.toggle("completedtask");
    updateLocalStorage();
    applyCurrentFilter();
  });

  const edit = document.createElement("button");
  edit.innerHTML = '<i class="fa-solid fa-pen"></i>';
  edit.classList.add("iconpencil");
  div.appendChild(edit);
  edit.addEventListener("click", () => editTask(task));

 
  const trashdelete = document.createElement("button");
  trashdelete.innerHTML = '<i class="fa-solid fa-trash"></i>';
  trashdelete.classList.add("icontrash");
  div.appendChild(trashdelete);
  trashdelete.addEventListener("click", () => deleteTask(task));

  li.appendChild(div);
  list.appendChild(li);
}
//edit task .
function editTask(task) {
  const editmodal = document.getElementById("edit-modal");
  const editinput = document.getElementById("edit-task-input");
  const saveedit = document.getElementById("save-edit-btn");
  const canceledit = document.getElementById("cancel-edit-btn");
  editinput.value = task.name;
  editmodal.classList.remove("hidden");

  saveedit.replaceWith(saveedit.cloneNode(true));
  const newSaveEdit = document.getElementById("save-edit-btn");
  newSaveEdit.addEventListener("click", function () {
    const newname = editinput.value.trim();
    if (newname === "") {
      return showmessagepopup("Task cannot be empty.", "red");
    } else if (/^\d/.test(newname)) {
      return showmessagepopup("Task cannot start with a number.", "red");
    } else if (newname.length < 5) {
      return showmessagepopup("Task must be at least 5 characters long.", "red");
    }

    task.name = newname;
    document.getElementById("paragraph" + task.id).innerHTML = newname;
    updateLocalStorage(); 
    editmodal.classList.add("hidden");
  });

  canceledit.addEventListener("click", () => {
    editmodal.classList.add("hidden");
  });
}

//delete the sepicified task
function deleteTask(task) {
  const deletemodal = document.getElementById("delete-modal");
  const confirmdelete = document.getElementById("confirm-btn");
  const canceldelete = document.getElementById("cancel-delete-btn");
  deletemodal.classList.remove("hidden");
  confirmdelete.replaceWith(confirmdelete.cloneNode(true));

  const newConfirmDelete = document.getElementById("confirm-btn");
  newConfirmDelete.addEventListener("click", function () {
    document.getElementById("li" + task.id).remove();
    arrayoftasks = arrayoftasks.filter((t) => t.id !== task.id);
    updateLocalStorage(); 
    if(arrayoftasks.length===0){
      list.innerHTML="<h1>.no tasks</h1>";
      deletealltasks.disabled=true;
       deletealltasks.classList.add("disabled");
       deletedonetasks.disabled=true;
       deletedonetasks.classList.add("disabled");
    }
    deletemodal.classList.add("hidden");
  });

  canceldelete.addEventListener("click", () => {
    deletemodal.classList.add("hidden");
  });
}
//filter all tasks.
filterall.addEventListener("click", function () {
  setActiveFilter(filterall);
  applyFilter("all");
});
//filter done tasks.
filterdone.addEventListener("click", function () {
  setActiveFilter(filterdone);
  applyFilter("done");
});
//filter to do tasks.
filtertodo.addEventListener("click", function () {
  setActiveFilter(filtertodo);
  applyFilter("todo");
});

//apply filter to change the display style for each task li .
function applyFilter(filterType) {
  arrayoftasks.forEach(task => {
    let taskElement = document.getElementById("li" + task.id);
    if (!taskElement) return;

    if (filterType === "all") {
      taskElement.style.display = "flex";
    } else if (filterType === "done") {
      taskElement.style.display = task.completed ? "flex" : "none";
    } else if (filterType === "todo") {
      taskElement.style.display = !task.completed ? "flex" : "none";
    }
  });
}

//apply current filter 
function applyCurrentFilter() {
  if (filterall.classList.contains("active")) {
    applyFilter("all");
  } else if (filterdone.classList.contains("active")) {
    applyFilter("done");
  } else if (filtertodo.classList.contains("active")) {
    applyFilter("todo");
  }
}

// set active filter .
function setActiveFilter(activeButton) {
  [filterall, filterdone, filtertodo].forEach(button => {
    button.classList.remove("active");
  });
  activeButton.classList.add("active");
}


//delete all tasks .
deletealltasks.addEventListener("click",function(){
  const deletemodal = document.getElementById("delete-all-modal");
  const confirmdelete = document.getElementById("confirm-delete-all-btn");
  const canceldelete = document.getElementById("cancel-delete-all-btn");
  deletemodal.classList.remove("hidden");
  confirmdelete.replaceWith(confirmdelete.cloneNode(true));

  const newConfirmDelete = document.getElementById("confirm-delete-all-btn");
  newConfirmDelete.addEventListener("click", function () {
    arrayoftasks.forEach(task=>{
    document.getElementById("li" + task.id).remove();
    arrayoftasks = arrayoftasks.filter((t) => t.id !== task.id);
    updateLocalStorage(); 
    
    });
       list.innerHTML="<h1>.no tasks</h1>";
       deletealltasks.disabled=true;
       deletealltasks.classList.add("disabled");
       deletedonetasks.disabled=true;
       deletedonetasks.classList.add("disabled");
       deletemodal.classList.add("hidden");
  });

  canceldelete.addEventListener("click", () => {
    deletemodal.classList.add("hidden");
  });
})

//delete done tasks .
deletedonetasks.addEventListener("click",function(){
  const deletemodal = document.getElementById("delete-done-modal");
  const confirmdelete = document.getElementById("confirm-delete-done-btn");
  const canceldelete = document.getElementById("cancel-delete-done-btn");
  deletemodal.classList.remove("hidden");
  confirmdelete.replaceWith(confirmdelete.cloneNode(true));
  const newConfirmDelete = document.getElementById("confirm-delete-done-btn");
  newConfirmDelete.addEventListener("click", function () {
    var flag=true;
    arrayoftasks.forEach(task=>{
      if(task.completed){
     document.getElementById("li" + task.id).remove();
     arrayoftasks = arrayoftasks.filter((t) => t.id !== task.id);
     updateLocalStorage();
     }
     else{
      flag=false;
     }
    });
    
       if(flag){
       list.innerHTML="<h1>.no tasks</h1>";
       deletealltasks.disabled=true;
       deletealltasks.classList.add("disabled");
       deletedonetasks.disabled=true;
       deletedonetasks.classList.add("disabled");
      }
       deletedonetasks.disabled=true;
       deletedonetasks.classList.add("disabled");
     deletemodal.classList.add("hidden");
  });

  canceldelete.addEventListener("click", () => {
    deletemodal.classList.add("hidden");
  });
})


function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(arrayoftasks));
}


function tasks(name,completed,id){
  this.name=name;
  this.completed=completed;
  this.id=id;
}


function showmessage(text,color){
validation.innerHTML=text;
validation.style.color=color;
setTimeout(function (){ validation.textContent = ""; }, 1500);
}

function showmessagepopup(text,color){
validationpopup.innerHTML=text;
validationpopup.style.color=color;
setTimeout(function (){ validationpopup.textContent = ""; }, 1500);

}

function loadTasks() {
  var flag=true;
  list.innerHTML = ""; 
  arrayoftasks = JSON.parse(localStorage.getItem("tasks")) || [];
  arrayoftasks.forEach((task) => {
    createTaskElement(task);
    flag=false;
  });
  
  if(flag){
       list.innerHTML="<h1>.no tasks</h1>";
       deletealltasks.disabled=true;
       deletealltasks.classList.add("disabled");
       deletedonetasks.disabled=true;
       deletedonetasks.classList.add("disabled");
    }
}

loadTasks();





