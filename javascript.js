const addNewTask=document.getElementById("button-add-new-task");
const inputNew=document.getElementById("input-new-task");
const validation=document.getElementById("showmessage");
const list =document.getElementById("list");
const validationpopup=document.getElementById("inputValpopup");
const arrayoftasks=[];
var count = 0;




addNewTask.addEventListener("click",function(){
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
 const task=new tasks(taskname,false,count++);
 
 arrayoftasks.push(task);

 const li =document.createElement("li");
 const div =document.createElement("div");

 const paragraph=document.createElement("p");
  paragraph.id="paragraph"+task.id;
  paragraph.innerHTML=taskname; 
  li.appendChild(paragraph);





  const checkbox=document.createElement("input");
  checkbox.type="checkbox";
  div.appendChild(checkbox);


  checkbox.addEventListener("change", function() {
  const p=document.getElementById("paragraph"+task.id);
  task.completed=!task.completed;
  if(task.completed){
   p.classList.add("completedtask");
  }
  else
  {
   p.classList.remove("completedtask");
  }
}); 






const edit=document.createElement("button");
edit.innerHTML=' <i class="fa-solid fa-pen"></i>';
edit.classList.add("iconpencil");
div.appendChild(edit);


edit.addEventListener("click",function(){
const editmodal=document.getElementById("edit-modal");
const editinput=document.getElementById("edit-task-input");
const saveedit=document.getElementById("save-edit-btn");
const canceledit=document.getElementById("cancel-edit-btn");
editinput.value=task.name;
editmodal.classList.remove("hidden");

const editp=document.getElementById("paragraph"+task.id);
saveedit.addEventListener("click",function(){
const newname=editinput.value.trim();
if(editinput.value.trim()===""){
  return showmessagepopup("Task cannot be empty.","red");
 }
 else if (/^\d/.test(newname)){
 return showmessagepopup("Task cannot start with a number.","red");
 }
 else if(newname.length<5){
 return showmessagepopup("Task must be at least 5 characters long.","red");
 }

 editp.innerHTML=newname;
 task.name=newname;
 editmodal.classList.add("hidden");

});
canceledit.addEventListener("click",function (){
  editmodal.classList.add("hidden");

});

});





const trashdelete=document.createElement("button");
trashdelete.innerHTML=' <i class="fa-solid fa-trash"></i>';
trashdelete.classList.add("icontrash");
div.appendChild(trashdelete);


 li.appendChild(div);
 list.appendChild(li);

});


function tasks(name,completed,id){
    this.name=name;
    this.completed=completed;
    this.id=id;
}

function showmessage(text,color){
validation.innerHTML=text;
validation.style.color=color;
setTimeout(function (){ validation.textContent = ""; }, 3000);

}

function showmessagepopup(text,color){
  validationpopup.innerHTML=text;
  validationpopup.style.color=color;
  setTimeout(function (){ validation.textContent = ""; }, 3000);
  
  }




