class GroupTask {
  constructor(groupNameValue) {
    this.groupNameValue = groupNameValue;
    this.createGroupTask();
  }

  createGroupTask() {
    this.groupTaskContainer = document.createElement("section");
    this.groupTaskContainer.classList.add("section", "group-tasks-list__group");

    const groupName = document.createElement("p");
    groupName.textContent = this.groupNameValue;
    groupName.classList.add("group-tasks-list__group-name");

    const btnDeleteGroup = this.createBtnDeleteGroup();

    this.groupTaskContainer.append(groupName, btnDeleteGroup);
  }

  createBtnDeleteGroup() {
    const minusChar = document.createElement("p");
    minusChar.textContent = "-";
    minusChar.classList.add("group-tasks-list__button-delete-icon");

    const btnDeleteGroup = document.createElement("button");
    btnDeleteGroup.append(minusChar);
    btnDeleteGroup.classList.add("button", "button_rounded", "group-tasks-list__button-delete");

    btnDeleteGroup.addEventListener("click", () => {
      this.removeTaskGroup();
    });

    return btnDeleteGroup;
  }

  removeTaskGroup() {
    this.groupTaskContainer.remove();
  }

  appendTo(parent) {
    parent.append(this.groupTaskContainer);
  }

}

const btnAddGroupTask = document.querySelector(".button.popup-footer__button-add");
const groupNameInput = document.getElementById("group-name");
const groupTaskStore = document.querySelector(".group-tasks-list__store");

function addGroupTask () {
    const groupNameValue = groupNameInput.value;

    if (groupNameValue.trim() === "") {
        alert("Пожалуйста, введите название группы задач");
        return;
    }

    const newGroupTask = new GroupTask(groupNameValue);
    newGroupTask.appendTo(groupTaskStore);

    groupNameInput.value = "";
}

btnAddGroupTask.addEventListener("click", addGroupTask);