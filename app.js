//UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListerners();

function loadEventListerners(){
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask); 
  clearBtn.addEventListener('click', clearAllTasks);
  filter.addEventListener('keyup', filterTasks);
  window.addEventListener('DOMContentLoaded', getTasks);
}


function addTask(e) {
  if (!/\S/.test( taskInput.value)){
    alert('Please add a task');
  } else {

    renderTask(taskInput.value);
    taskInput.value = '';
    storeTaskInLocalStorage(taskInput.value);
    e.preventDefault();



  }
  
}



function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure ?')){
      removeTaskFromLocalStorage(e.target.parentElement.parentElement.innerText);
      e.target.parentElement.parentElement.remove();
    }
  }
}


function clearAllTasks() {
  while(taskList.firstChild){
    taskList.firstChild.remove();
  }
  localStorage.clear();
}

function getTasks(){
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  if (tasks !== null){
    tasks.forEach(renderTask);
  }
}

function filterTasks(e) {
  const filterInputText = e.target.value.toLowerCase();
  const tasks = document.querySelectorAll('.collection-item');
  tasks.forEach(function(task){
    const taskText = task.firstChild.textContent.toLowerCase();
    if(taskText.indexOf(filterInputText) == -1){
      task.style.display = 'none';
    }else{
       task.style.display = 'block';
    }
  } );
}








function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}






function removeTaskFromLocalStorage( taskToBeRemoved ){
  console.log(taskToBeRemoved);
  let tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.forEach(function(task, index){
        if(task === taskToBeRemoved){
          tasks.splice(index, 1);

        }
        localStorage.setItem('tasks',JSON.stringify(tasks));
      });
}


function renderTask (task){

  const newItemList = document.createElement('li');
  newItemList.className = 'collection-item'
  newItemList.innerText = task;
  const deleteLink = document.createElement('a');
  deleteLink.className = 'delete-item secondary-content';
  deleteLink.innerHTML = '<i class = "fa fa-remove"></i>';
  newItemList.appendChild(deleteLink);
  taskList.appendChild(newItemList);


}

