class Task {
  constructor(taskValue) {
    this.taskValue = taskValue;
    this.date = this.getFormattedDate();
    this.complete = false;
    this.createTaskElement();
  }

  createTaskElement() {
    this.taskContainer = document.createElement("div");
    this.taskContainer.classList.add("task");

    const taskName = document.createElement("p");
    taskName.textContent = this.taskValue;
    taskName.classList.add("task__name");

    const dateElement = document.createElement("p");
    dateElement.textContent = this.date;
    dateElement.classList.add("task__date");

    const btnDelete = this.createDeleteButton();
    const btnComplete = this.createCompleteButton();

    this.taskContainer.append(taskName, dateElement, btnDelete, btnComplete);
  }

  createDeleteButton() {
    const iconTrash = document.createElement("img");
    iconTrash.setAttribute("src", "icons/trash.svg");
    iconTrash.classList.add("task__icon");

    const btnDelete = document.createElement("button");
    btnDelete.append(iconTrash);
    btnDelete.classList.add("task__btn", "task__btn_delete");

    btnDelete.addEventListener("click", () => {
      this.removeTask();
      saveTasks();
    });

    return btnDelete;
  }

  removeTask() {
    this.taskContainer.remove();
  }

  createCompleteButton() {
    const iconCheck = document.createElement("img");
    iconCheck.setAttribute("src", "icons/check.svg");
    iconCheck.classList.add("task__icon");

    const btnComplete = document.createElement("button");
    btnComplete.append(iconCheck);
    btnComplete.classList.add("task__btn", "task__btn_complete");

    btnComplete.addEventListener("click", () => {
      this.completeTask();
      saveTasks();
    });

    return btnComplete;
  }

  completeTask() {
    this.taskContainer.classList.add("task_completed");
    this.complete = true;
    completeTaskStore.append(this.taskContainer);
  }

  getFormattedDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  appendTo(parent) {
    parent.append(this.taskContainer);
  }

  toJSON() {
    return {
      taskValue: this.taskValue,
      date: this.date,
      complete: this.complete,
    };
  }
}

const input = document.getElementById("task-name");
const btnSuccess = document.getElementById("btn-success");
const taskStore = document.querySelector(".tasks__store");
const completeTaskStore = document.querySelector(".completed-tasks__store");
const btnClear = document.getElementById("clear-btn");

function saveTasks() {
  const tasks = [];
  const allTasks = document.querySelectorAll(".task");

  allTasks.forEach((task) => {
    const taskValue = task.querySelector(".task__name").textContent;
    const taskDate = task.querySelector(".task__date").textContent;
    const isCompleted = task.classList.contains("task_completed");
    tasks.push({ taskValue, date: taskDate, complete: isCompleted });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach((taskData) => {
      const newTask = new Task(taskData.taskValue);
      newTask.date = taskData.date;

      if (taskData.complete) {
        newTask.completeTask();
        completeTaskStore.append(newTask.taskContainer);
      } else {
        taskStore.append(newTask.taskContainer);
      }
    });
  }
}

function clearCompletedTasks() {
  const completedTasks = document.querySelectorAll(".task_completed");

  completedTasks.forEach((taskContainer) => taskContainer.remove());
  saveTasks();
}

function addTask() {
  const taskValue = input.value;

  if (taskValue.trim() === "") {
    alert("Пожалуйста, введите название задачи");
    return;
  }

  const newTask = new Task(taskValue);
  newTask.appendTo(taskStore);
  saveTasks();

  input.value = "";
}

btnClear.addEventListener("click", clearCompletedTasks);

btnSuccess.addEventListener("click", addTask);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

document.addEventListener("DOMContentLoaded", loadTasks);
