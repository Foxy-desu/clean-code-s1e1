//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];//first button
const incompleteTaskHolder = document.getElementById("todo-tasks");
const completedTasksHolder = document.getElementById("completed-tasks");

//New task list item
const createNewTaskElement = function(taskString) {

  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");

  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskString;
  label.className = 'task-item__task-name';

  //Each elements, needs appending
  checkBox.type = "checkbox";
  checkBox.className = "task-item__task-checkbox"
  editInput.type = "text";
  editInput.className = "task-item__edit-task task-input";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "btn edit-btn";

  deleteButton.className = "btn delete-btn";
  deleteButtonImg.className = "btn__img"
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.className = "task-list__task-item";

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask = function() {
  //Create a new list item with the text:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);

  taskInput.value = "";
}

//Edit an existing task.
const editTask = function() {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('.task-item__edit-task.task-input');
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".btn.edit-btn");
  const containsClass = listItem.classList.contains("edit-mode");

  //If class of the parent is .editmode
  if (containsClass) {
  //switch to .editmode
  //label becomes the inputs value.
  label.innerText = editInput.value;
  editBtn.innerText = "Edit";
  } else {
  editInput.value = label.innerText;
  editBtn.innerText = "Save";
  }

  listItem.classList.toggle("edit-mode");
};

const deleteTask = function() {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

const taskCompleted = function() {
  //Append the task list item to the #completed-tasks
  const listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete = function() {
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

const ajaxRequest = function() {
  console.log("AJAX Request");
}

//The glue to hold it all together.
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

const bindTaskEvents = function(taskListItem,checkBoxEventHandler) {
  //select ListItems children
  const checkBox = taskListItem.querySelector("input[type = checkbox]");
  const editButton = taskListItem.querySelector(".edit-btn");
  const deleteButton = taskListItem.querySelector(".delete-btn");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i<completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.