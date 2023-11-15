"use strict";
const list = document.getElementById("list");
const form = document.getElementById("new-task-form");
const input = document.getElementById("new-task-title");
const tasks = [];
form.addEventListener("submit", e => {
    e.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    const newTask = {
        title: input.value,
        completed: false,
        created: new Date()
    };
    tasks.push(newTask);
    addListItem(newTask);
    input.value = '';
});
function addListItem(task) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        console.log(tasks);
    });
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    label.append(checkbox, task.title);
    item.append(label);
    list === null || list === void 0 ? void 0 : list.append(item);
}
function saveTasks() {
    localStorage.setItem("Tasks", JSON.stringify(tasks));
}
