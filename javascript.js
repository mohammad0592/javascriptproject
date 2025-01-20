const addNewTask=document.getElementById("button-add-new-task");
const inputNew=document.getElementById("input-new-task");
const validation=document.getElementById("showmessage");
const list =document.getElementById("list");

addNewTask.addEventListener("click",function(e){
    const taskname= inputNew.value.trim();
if(inputNew.value.trim()===""){
 return showmessage("Task cannot be empty.","red");
}
else if (/^\d/.test(taskname)){
return showmessage("Task cannot start with a number.","red");
}
else if(taskname.length<5){
return showmessage("Task must be at least 5 characters long.","red");
}

tasks=new tasks(inputNew.value.trim(),false);

const li=document.createElement("li");
const div =document.createElement("div");
const completeButton=document.createElement("input");
completeButton.type="checkbox";
completeButton.addEventListener("click",function (){
e.completed=!e.completed;
});

div.appendChild(completeButton);
const edittask=document.createElement("button");
edittask.innerHTML='<i class="fa-solid fa-pencil"></i>';
edittask.addEventListener("click",function(){
    
    const modal = document.getElementById('edit-modal');
    const editInput = document.getElementById('edit-task-input');
    const saveBtn = document.getElementById('save-edit-btn');
    const cancelBtn = document.getElementById('cancel-edit-btn');
    editInput.value = e.name;
    modal.style.display = 'flex';
    saveBtn.onclick = () => {
      const newName = editInput.value.trim();
      if (!newName) return showMessagepopup('Task cannot be empty.', 'red');
      if (newName.length < 5) return showMessagepopup('Task must be at least 5 characters long.', 'red');
      if (/^\d/.test(newName)) return showMessagepopup('Task cannot start with a number.', 'red');
      e.name = newName;
      modal.style.display = 'none';
    };
     cancelBtn.onclick = () => {
      modal.style.display = 'none';
    };
  });
    div.appendChild(edittask);
    const deletetask=document.createElement("button");
    deletetask.innerHTML='<i class="fa-solid fa-trash"></i>' ;
    deletetask.addEventListenerI("click",function(){
        const deleteModal = document.getElementById('delete-modal');
        const confirmBtn = document.getElementById('confirm-btn');
const cancelBtn = document.getElementById('cancel-delete-btn');
  deleteModal.style.display = 'flex'; // Show the modal
  confirmBtn.onclick = () => {
  e.splice(); // Remove the task
  deleteModal.style.display = 'none';
}

   
});
div.appendChild(deletetask);
li.appendChild(div);
list.appendChild(li);
alert("hola");
});

function tasks(name,completed){
    this.name=name;
    this.completed=completed;
}

function showmessage(text,color){
validation.innerHTML=text;
validation.style.color=color;
setTimeout(function (){ validation.textContent = ""; }, 3000);

}




