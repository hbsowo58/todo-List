const $todos = document.querySelector(".todos");
const $inputTodo = document.querySelector(".input-todo");

const getTodos = () => {
  todos = [
    {
      id: 1,
      content: "HTML",
    },
    {
      id: 2,
      content: "CSS",
    },
    {
      id: 3,
      content: "Javascript",
    },
  ];
  todos = todos.sort((todo1, todo2) => todo1.id - todo2.id);
  render();
};

const render = () => {
  let html = "";

  todos.forEach(({ id, content }) => {
    html += `<li id="${id}" class="todo-item">
    <label for="ck-${id}">${content}</label>
    <i class="remove-todo far fa-times-circle"></i>
  </li>`;
  });

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
    },
    ...todos,
  ];
};

const removeTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== +id);
};

$inputTodo.onkeyup = (e) => {
  const content = e.target.value.trim();
  if ((content === "") | (e.keyCode !== 13)) return;
  $inputTodo.value = "";
  addTodo(content);
  render();
};

$todos.onclick = (e) => {
  // console.log(e.target.classList.contains('remove-todo'));
  if (!e.target.matches(".remove-todo")) return;
  removeTodo(e.target.parentNode.id);
  render();
};

window.onload = getTodos;
