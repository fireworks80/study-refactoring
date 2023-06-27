import getTodos from './getTodos.js';

const state = {
  todos: getTodos(),
  currentFilter: 'All',
};

const event = {
  addTodo: (text) => {
    state.todos.push({
      text,
      completed: false,
    });
  },
  removeTodo: (text) => {
    state.todos = state.todos.filter((todo) => todo.text !== text);
  },
  toggleTodo: (text) => {
    const result = state.todos.map((todo) => ({
      ...todo,
      completed: todo.text === text ? !todo.completed : todo.completed,
    }));

    console.log(state.todos);
    state.todos = result;
  },
};

const inputEl = document.querySelector('.new-todo');

const createTodoItem = (todo) => {
  const { text, completed } = todo;
  const todoItem = document.querySelector('#todo-item').content.firstElementChild.cloneNode(true);

  if (completed) {
    todoItem.classList.add('completed');
  }

  todoItem.querySelector('.toggle').checked = completed;
  todoItem.querySelector('.toggle').value = text;
  todoItem.querySelector('label').textContent = text;
  todoItem.querySelector('.destroy').value = text;

  return todoItem;
};

const todoHandler = {
  toggle: (text) => {
    event.toggleTodo(text);
    renderList();
  },
  destroy: (text) => {
    event.removeTodo(text);
    renderList();
  },
};

const todoListEl = document.querySelector('.todo-list');
const renderList = () => {
  todoListEl.innerHTML = '';

  state.todos.map((todo) => createTodoItem(todo)).forEach((todo) => todoListEl.appendChild(todo));
};

todoListEl.addEventListener(
  'click',
  (e) => {
    const className = e.target.className;
    if (!className) return;

    todoHandler[className]?.(e.target.value);
  },
  false
);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    event.addTodo(inputEl.value);

    inputEl.value = '';
    renderList();
  }
});

renderList();
