document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const addBtn = document.getElementById("add-btn");
  const todoBody = document.getElementById("todo-body");
  const totalCount = document.getElementById("total");
  const completedCount = document.getElementById("completed");
  const pendingCount = document.getElementById("pending");

  let tasks = [];

  function updateCounts() {
    totalCount.textContent = tasks.length;
    completedCount.textContent = tasks.filter((t) => t.done).length;
    pendingCount.textContent = tasks.filter((t) => !t.done).length;
  }

  function renderTasks() {
    todoBody.innerHTML = "";
    tasks.forEach((task, index) => {
      const row = document.createElement("tr");

      // Serial
      row.innerHTML = `<td class="py-2">${index + 1}</td>`;

      // Task Text
      const taskTd = document.createElement("td");
      const taskInput = document.createElement("input");
      taskInput.value = task.text;
      taskInput.disabled = true;
      taskInput.className =
        "bg-transparent text-center w-full focus:outline-none";
      taskTd.appendChild(taskInput);
      row.appendChild(taskTd);

      // Date
      const date = new Date(task.date);
      const formatted = `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}`;
      row.innerHTML += `<td>${formatted}</td>`;

      // Status
      const statusTd = document.createElement("td");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.addEventListener("change", () => {
        task.done = checkbox.checked;
        updateCounts();
      });
      statusTd.appendChild(checkbox);
      row.appendChild(statusTd);

      // Delete
      const deleteTd = document.createElement("td");
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "🗑️";
      deleteBtn.className = "text-red-500 text-xl";
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        renderTasks();
        updateCounts();
      });
      deleteTd.appendChild(deleteBtn);
      row.appendChild(deleteTd);

      // Edit
      const editTd = document.createElement("td");
      const editBtn = document.createElement("button");
      editBtn.innerHTML = "✏️";
      editBtn.className = "text-blue-500 text-xl";
      editBtn.addEventListener("click", () => {
        taskInput.disabled = !taskInput.disabled;
        if (!taskInput.disabled) {
          taskInput.focus();
        } else {
          task.text = taskInput.value.trim();
        }
      });
      editTd.appendChild(editBtn);
      row.appendChild(editTd);

      todoBody.appendChild(row);
    });
  }

  addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text === "") return;

    tasks.push({
      text,
      date: new Date(),
      done: false,
    });

    taskInput.value = "";
    renderTasks();
    updateCounts();
  });
});
