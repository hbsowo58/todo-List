let todos = [];

const $todos = document.querySelector(".todos");
const $inputTodo = document.querySelector(".input-todo");
const $ckAll = document.querySelector("#ck-complete-all");
const $completedTodos = document.querySelector(".completed-todos");
const $activeTodos = document.querySelector(".active-todos");
const $clearCompleted = document.querySelector(".clear-completed > .btn");
const $nav = document.querySelector(".nav");
let navState = "all";

function getTodos() {
  todos = [
    {
      id: 1,
      content: "HTML",
      completed: false,
    },
    {
      id: 2,
      content: "CSS",
      completed: true,
    },
    {
      id: 3,
      content: "Javascript",
      completed: false,
    },
  ].sort((todo1, todo2) => todo1.id - todo2.id);
  render();
}

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
  $todos.innerHTML = html;
};

const generateId = () => {
  return todos.length ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
};

const addTodo = (content) => {
  todos = [
    {
      id: generateId(),
      content,
      completed: false,
    },
    ...todos,
  ];
};

const removeTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== +id);
};

const toggleTodo = (id) => {
  todos = todos.map((todo) =>
    todo.id === +id
      ? {
          ...todo,
          completed: !todo.completed,
        }
      : todo
  );
};

const completeAll = (completed) => {
  todos = todos.map((todo) => ({ ...todo, completed }));
};
const clearCompleted = () => {
  todos = todos.filter((todo) => todo.completed === false);
};

$inputTodo.onkeyup = (e) => {
  const content = $inputTodo.value.trim();
  if (content === "" || e.keyCode !== 13) return;
  $inputTodo.value = "";
  addTodo(content);
  render();
};

$todos.onclick = (e) => {
  // if (!e.target.classList.contains("remove-todo")) return;
  if (!e.target.matches(".remove-todo")) return;
  removeTodo(e.target.parentNode.id);
  render();
};

$todos.onchange = (e) => {
  toggleTodo(e.target.parentNode.id);
  render();
};

$ckAll.onchange = () => {
  completeAll($ckAll.checked);
  render();
};

$clearCompleted.onclick = () => {
  clearCompleted();
  render();
};

$nav.addEventListener("click", ({ target }) => {
  if (!target.matches(".nav > li")) return;

  // [...$nav.children].forEach((navItem) => {
  //   navItem.classList.remove("active");
  // });
  // e.target.classList.add("active");
  // if (e.target.classList[0] !== "active") {
  //   document.querySelector(".active").classList.remove("active");
  //   e.target.classList.add("active");
  // }
  const $active = $nav.querySelector(".active");

  if ($active === target) return;
  $active.classList.remove("active");
  target.classList.add("active");

  navState = target.id;
  render();
});

window.onload = getTodos;
