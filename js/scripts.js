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
    task = this.tasks.splice(index, 1)
    return task;
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

function buildRow(task, index) {
  const taskDiv = document.createElement('div');
  taskDiv.classList.add('task-div');

  const checkBox = document.createElement('input');
  checkBox.type = "checkbox";
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
  dateSpan.append(task.dueDate.toLocaleDateString('en-us', {weekday:"long", year:"numeric", month:"short", day:"numeric"}));
  taskDiv.append(dateSpan);

  return taskDiv;
}

window.onload = function () {
  const task = new Task('Code Sample', 'Complete code sample for EfU', '11/27/2022');
  let row = buildRow(task);
  const listArea = document.getElementById('TDL');
  listArea.append(row);
}