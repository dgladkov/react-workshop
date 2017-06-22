import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createTodoItem, toggleTodoItem, deleteTodoItem } from '../actions/todoLists';

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
    this.props.createTodoItem(this.props.id, this.state.newTodoText);
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

function mapStateToProps(state, { match }) {
  const todoList = state.todoLists.get(match.params.id);
  if (todoList) {
    return {
      id: match.params.id,
      title: todoList.title,
      todos: todoList.todos,
    }
  }
  return {}
}

const mapDispatchToProps = {
  createTodoItem,
  toggleTodoItem,
  deleteTodoItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
