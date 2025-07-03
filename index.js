// Start

document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const todoBody = document.getElementById("todo-body");
  const totalCount = document.getElementById("total");
  const completedCount = document.getElementById("completed");
  const pendingCount = document.getElementById("pending");

  let tasks = [];

  function updatedCounts() {
    totalCount.textContent = taskInput.length;
    completedCount.textContent = tasks.filter((t) => t.done).length;
    pendingCount.textContent = tasks.filter((t) => !t.done).length;
  }

  function renderTasks() {
    todoBody.innerHTML = "";
    tasks.forEach((task, index) => {
      const row = document.createElement("tr");

      //  serial

      row.innerHTML = `<td class="py-2" >${index + 1} </td>`;

      // Task Text

      const taskId = document.createElement("td");
      const taskInputEl = document.createElement("input");
      taskInputEl.value = task.text;
      taskInputEl.disabled = true;
      taskInputEl.classname =
        "bg-transparent text-center w-full focus:outline-none";
      taskId.appendChild(taskInputEl);
      row.appendChild(taskId);
    });
  }
});
