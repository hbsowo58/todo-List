import { promise } from "./promise.js";
let todos = [];

const $todos = document.querySelector(".todos");
const $inputTodo = document.querySelector(".input-todo");
const $ckAll = document.querySelector("#ck-complete-all");
const $completedTodos = document.querySelector(".completed-todos");
const $activeTodos = document.querySelector(".active-todos");
const $clearCompleted = document.querySelector(".clear-completed > .btn");
const $nav = document.querySelector(".nav");
let navState = "all";

const getTodos = async () => {
  try {
    todos = await promise.get("todos/");
    render();
  } catch (err) {
    console.error(err);
  }
};

const render = () => {
  const _todos = todos.filter((todo) => {
    if (navState === "active") return !todo.completed;
    if (navState === "completed") return todo.completed;
    return true;
  });
  let html = "";

  _todos.forEach(({ id, content, completed }) => {
    html += `<li id="${id}" class="todo-item">
    <input class="custom-checkbox" type="checkbox" id="ck-${id}" ${
      completed ? "checked" : ""
    }>
    <label for="ck-${id}">${content}</label>
    <i class="remove-todo far fa-times-circle"></i>
  </li>`;
  });

  $completedTodos.textContent = todos.filter((todo) => todo.completed).length;
  $activeTodos.textContent = todos.filter((todo) => !todo.completed).length;
  $ckAll.checked = todos.length
    ? todos.filter((todo) => todo.completed).length === todos.length
    : false;
  $todos.innerHTML = html;
};

const generateId = () => {
  return todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
};

const addTodo = async (content) => {
  const payload = { id: generateId(), content, completed: false };
  try {
    todos = await promise.post("todos/", payload);
    render();
  } catch (err) {
    console.error(err);
  }
};

const removeTodo = async (id) => {
  try {
    todos = await promise.delete(`todos/${id}`);
    render();
  } catch (err) {
    console.error(err);
  }
};

const toggleTodo = async (id) => {
  try {
    todos = await promise.patch(`todos/${id}`, { completed });
    render();
  } catch (err) {
    console.error(err);
  }
};

const completeAll = async (completed) => {
  try {
    todos = await promise.patch("todos/", { completed });
    render();
  } catch (err) {
    console.error(err);
  }
};
const clearCompleted = async () => {
  try {
    todos = await promise.delete("todos/completed");
    render();
  } catch (err) {
    console.error(err);
  }
};

$inputTodo.onkeyup = (e) => {
  const content = $inputTodo.value.trim();
  if (content === "" || e.keyCode !== 13) return;
  $inputTodo.value = "";
  addTodo(content);
};

$todos.onclick = (e) => {
  if (!e.target.matches(".remove-todo")) return;
  removeTodo(e.target.parentNode.id);
};

$todos.onchange = (e) => {
  toggleTodo(e.target.parentNode.id);
};

$ckAll.onchange = () => {
  completeAll($ckAll.checked);
};

$clearCompleted.onclick = () => {
  clearCompleted();
};

$nav.addEventListener("click", ({ target }) => {
  if (!target.matches(".nav > li")) return;
  const $active = $nav.querySelector(".active");

  if ($active === target) return;
  $active.classList.remove("active");
  target.classList.add("active");

  navState = target.id;
  render();
});

window.onload = getTodos;
