import React, { Component } from 'react';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodoText: '',
    };
    this.changeNewTodoText = this.changeNewTodoText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeNewTodoText(e) {
    this.setState({
      newTodoText: e.target.value,
    });
  }

  handleSubmit() {
    if (!this.state.newTodoText) {
      return;
    }
    this.props.createNewTodo(this.props.id, this.state.newTodoText);
    this.setState({
      newTodoText: '',
    });
  }

  render() {
    return (
      <div id="todo-app">
        <h2>{this.props.title}</h2>
        <ul>
          {this.props.todos.entrySeq().map(([id, todo]) => (
            <li key={id}>
              <p
                onClick={() => this.props.toggleTodoItem(this.props.id, id)}
                className={todo.complete ? 'checked' : null}
              >
                {todo.text}
              </p>
              <button onClick={() => this.props.deleteTodoItem(this.props.id, id)}>
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
        <button onClick={this.handleSubmit}>Add item</button>
      </div>
    );
  }
}

export default TodoList;
