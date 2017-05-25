import React, { Component } from 'react';

let currentIndex = 0;
function getNextIndex() {
  return ++currentIndex;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Hello world',
      todos: [],
      newTodoText: '',
    };
    this.changeNewTodoText = this.changeNewTodoText.bind(this);
    this.createNewTodo = this.createNewTodo.bind(this);
  }

  changeNewTodoText(e) {
    this.setState({
      newTodoText: e.target.value,
    });
  }

  createNewTodo() {
    this.setState({
      todos: [...this.state.todos, {
        id: getNextIndex(),
        text: this.state.newTodoText,
        complete: false,
      }],
      newTodoText: '',
    });
  }

  toggleTodoItem(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (id === todo.id) {
          return {...todo, complete: !todo.complete};
        }
        return todo;
      }),
    });
  }

  deleteTodoItem(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id),
    });
  }

  render() {
    return (
      <div id="todo-app">
        <h2>Thursday tasks</h2>
        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo.id}>
              <p
                onClick={() => this.toggleTodoItem(todo.id)}
                className={todo.complete ? 'checked' : null}
              >
                {todo.text}
              </p>
              <button onClick={() => this.deleteTodoItem(todo.id)}>
                Delete item
              </button>
            </li>
          ))}
        </ul>
        <input
          placeholder="New todo"
          onChange={this.changeNewTodoText}
          value={this.state.newTodoText}
        />
        <button onClick={this.createNewTodo}>Add item</button>
      </div>
    );
  }
}

export default App;
