import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ListIndex extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (!this._input.value) {
      return;
    }
    this.props.createNewTodoList(this._input.value);
    this._input.value = '';
  }

  render() {
    return (
      <div id="todo-app">
        <h2>Your todo lists</h2>
        <ul>
          {this.props.todoLists.entrySeq().map(([id, todoList]) => (
            <li key={id}>
              <Link to={`/list/${id}`}>{todoList.title}</Link>
              <span className="progress">
                {todoList.todos.count(x => x.complete)}/{todoList.todos.size}
              </span>
            </li>
          ))}
        </ul>
        <input
          placeholder="New title"
          onChange={this.changeNewTodoTitle}
          ref={(x) => { this._input = x }}
        />
        <button onClick={this.handleSubmit}>Add item</button>
      </div>
    );
  }
}

export default ListIndex;
