let todos = [];

const $todos = document.querySelector(".todos");
const $inputTodo = document.querySelector(".input-todo");
const $ckAll = document.querySelector("#ck-complete-all");
const $completedTodos = document.querySelector(".completed-todos");
const $activeTodos = document.querySelector(".active-todos");
const $clearCompleted = document.querySelector(".clear-completed > .btn");

const getTodos = () => {
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
};

const render = () => {
  let html = "";

  todos.forEach(({ id, content, completed }) => {
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
// addTodo 안에 넣으면 계속생성한다. 밖에다 빼면 한번만 만든다

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
  todos = todos.map((todo) => ({
    ...todo,
    completed,
  }));
};
const clearCompleted = () => {
  todos = todos.filter((todo) => todo.completed === false);
};

$inputTodo.onkeyup = (e) => {
  const content = $inputTodo.value.trim();
  if (content === "" || e.keyCode !== 13) return;
  $inputTodo.value = "";
  addTodo(content); // addTodo를 만든이유 함수는 한가지 역할만 시키려고 좋은함수란 매개변수없이 한줄로 나오는코드
  // 함수 호출의 내용은 보지 않고 함수명을 잘지어서 한눈에 알아보기 쉽게만든다.
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

window.onload = getTodos;
