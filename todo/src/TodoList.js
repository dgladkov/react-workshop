import React, { Component } from 'react';


class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newTodoText: '',
    };
    this.onNewTodoChange = this.onNewTodoChange.bind(this);
    this.onCreateClick = this.onCreateClick.bind(this);
  }

  onNewTodoChange(e) {
    this.setState({ newTodoText: e.target.value });
  }

  onCreateClick() {
    this.props.createNewTodo(this.state.newTodoText);
    this.setState({ newTitle: '' });
  }

  render() {
    return (
      <div id="todo-app">
        <h2>{this.props.todoList.title}</h2>
        <ul>
          {this.props.todoList.todos.map((todo, index) => (
            <li key={index}>
              <p
                className={todo.complete ? 'checked': null}
                onClick={() => this.props.toggleCompleteTodo(index)}
              >{todo.text}</p>
              <button onClick={() => this.props.removeTodo(index)}>
                Delete item
              </button>
            </li>
          ))}
        </ul>
        <input
          placeholder="New todo"
          value={this.state.newTodoText}
          onChange={this.onNewTodoChange}
        />
        <button onClick={this.onCreateClick}>Add item</button>
      </div>
    );
  }
}

export default TodoList;
