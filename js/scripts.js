function Task(name, description, dueDate) {
  this.name = name;
  this.description = description;
  this.dueDate = new Date(dueDate);
  this.isDone = false;
}

class ToDoList {
  constructor() {
    this.tasks = [];
  }
  addTask(task) {
    this.tasks.push(task);
  }
  removeTask(index) {
    this.tasks.splice(index, 1)
  }
  finishTask(index) {
    this.tasks[index].isDone = true;
  }
  reopenTask(index) {
    this.tasks[index].isDone = false;
  }
  toggleTask(index) {
    this.tasks[index].isDone = !this.tasks[index].isDone;
  }
  sort(by) {
    this.tasks.sort(function(a, b) {
      if (a[by] < b[by]) {
        return -1;
      } else if (b[by] < a[by]) {
        return 1;
      } else {
        return 0;
      }
    })
  }
}

function buildRow(task, index, list) {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task-div');
  taskDiv.id = index;

  const checkBox = document.createElement('input');
  checkBox.type = "checkbox";
  checkBox.checked = task.isDone
  checkBox.addEventListener("click", function() {
    toggleTaskHandler(list, index);
  })
  taskDiv.append(checkBox)
  
  const nameSpan = document.createElement('span');
  nameSpan.classList.add('name-span');
  nameSpan.append(task.name);
  taskDiv.append(nameSpan);

  const descSpan = document.createElement('span');
  descSpan.classList.add('desc-span');
  descSpan.append(task.description);
  taskDiv.append(descSpan);

  const dateSpan = document.createElement('span');
  dateSpan.classList.add('date-span');
  dateSpan.append(task.dueDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"}));
  taskDiv.append(dateSpan);

  const toolsSpan = document.createElement('span');
  toolsSpan.classList.add('tools-span');
  const editButton = document.createElement("button");
  editButton.innerText = "✏️";
  editButton.addEventListener("click", function () {
    editTaskHandler(list, index);
  });
  toolsSpan.append(editButton);
  const removeButton = document.createElement("button");
  removeButton.innerText = "❌";
  removeButton.addEventListener("click", function () {
    removeTaskHandler(list, index);
  });
  toolsSpan.append(removeButton);
  taskDiv.append(toolsSpan);

  return taskDiv;
}


function buildList(list) {
  const pending = document.createElement("div");
  const completed = document.createElement("div");
  list.tasks.forEach(function (element, index) {
    const row = buildRow(element, index, list);
    if (element.isDone) {
      completed.append(row);
    } else {
      pending.append(row);
    }
  })
  return [pending, completed]
}

function updateList(list) {
  const listArea = document.getElementById("to-do-list");
  const completeArea = document.getElementById("completed-tasks");
  listArea.innerHTML = "";
  completeArea.innerHTML = "";
  let [pending, completed] = buildList(list);
  listArea.append(pending);
  completeArea.append(completed);
}

function addTaskHandler(list) {
  event.preventDefault();
  const name = document.getElementById("inputName").value;
  const description = document.getElementById("inputDescription").value;
  const inputDate = document.getElementById("inputDate").value;
  const newTask = new Task(name, description, inputDate);
  list.addTask(newTask);
  updateList(list);
}

function removeTaskHandler(list, index) {
  list.removeTask(parseInt(index));
  updateList(list);
}

function toggleTaskHandler(list, index) {
  list.toggleTask(index);
  updateList(list);
}

function editTaskHandler(list, index) {
  const row = document.getElementById(index.toString());

  const nameField = row.getElementsByClassName('name-span')[0]
  const prevName = nameField.innerText
  nameField.innerHTML = `<input id='name-edit' value=${prevName}>`

  const descField = row.getElementsByClassName('desc-span')[0]
  const prevDesc = descField.innerText
  descField.innerHTML = `<textarea id='desc-edit'>${prevDesc}</textarea>`

  const dateField = row.getElementsByClassName('date-span')[0]
  const prevDate = dateField.innerText;
  let isoDate = new Date(prevDate);
  isoDate = isoDate.toISOString().slice(0, -14);
  dateField.innerHTML = `<input id='date-edit' type='date' value='${isoDate}'>`

  const toolsField = row.getElementsByClassName('tools-span')[0]
  toolsField.innerHTML = "";
  const saveButton = document.createElement("button");
  saveButton.innerText = "✔️";
  saveButton.addEventListener("click", function () {
    const newName = document.getElementById('name-edit').value;
    list.tasks[index].name = newName;
    nameField.innerText = newName;

    const newDesc = document.getElementById('desc-edit').value;
    list.tasks[index].description = newDesc;
    descField.innerText = newDesc;

    let newDate = document.getElementById('date-edit').value;
    newDate = new Date(newDate)
    list.tasks[index].dueDate = newDate;
    dateField.innerText = newDate.toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"});

    replaceButtons(list, index);
  });
  toolsField.append(saveButton);

  const backButton = document.createElement("button");
  backButton.innerText = "🔙";
  backButton.addEventListener("click", function () {
    nameField.innerText = prevName;
    descField.innerText = prevDesc;
    dateField.innerText = prevDate;
    replaceButtons(list, index);
  });
  toolsField.append(backButton);
}

function replaceButtons(list, index) {
  const row = document.getElementById(index.toString());
  const toolsField = row.getElementsByClassName('tools-span')[0]
  toolsField.innerHTML = "";
  const editButton = document.createElement("button");
  editButton.innerText = "✏️";
  editButton.addEventListener("click", function () {
    editTaskHandler(list, index);
  });
  toolsField.append(editButton);
  const removeButton = document.createElement("button");
  removeButton.innerText = "❌";
  removeButton.addEventListener("click", function () {
    removeTaskHandler(list, index);
  });
  toolsField.append(removeButton);
}

window.onload = function () {
  //test task code
  const task = new Task('Code Sample', 'Complete code sample for EfU', '11/27/2022');
  const toDoList = new ToDoList();
  toDoList.addTask(task);
  updateList(toDoList);

  const addForm = document.getElementById("taskInput");
  addForm.addEventListener("submit", function () {
    addTaskHandler(toDoList);
  });
}