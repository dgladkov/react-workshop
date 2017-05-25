import React, { Component } from 'react';
import { OrderedMap, Record } from 'immutable';

const TodoRecord = Record({
  text: '',
  complete: false,
}, 'TodoRecord');

let currentIndex = 0;
function getNextIndex() {
  return ++currentIndex;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Hello world',
      todos: OrderedMap(),
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
    if (!this.state.newTodoText) {
      return;
    }
    const newId = getNextIndex();
    this.setState({
      todos: this.state.todos.set(newId, TodoRecord({
        text: this.state.newTodoText,
      })),
      newTodoText: '',
    });
  }

  toggleTodoItem(id) {
    this.setState({
      todos: this.state.todos.updateIn([id, 'complete'], x => !x),
    });
  }

  deleteTodoItem(id) {
    this.setState({
      todos: this.state.todos.delete(id),
    });
  }

  render() {
    return (
      <div id="todo-app">
        <h2>Thursday tasks</h2>
        <ul>
          {this.state.todos.map((todo, id) => (
            <li key={id}>
              <p
                onClick={() => this.toggleTodoItem(id)}
                className={todo.complete ? 'checked' : null}
              >
                {todo.text}
              </p>
              <button onClick={() => this.deleteTodoItem(id)}>
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
