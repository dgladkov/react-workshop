import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createTodoList } from '../actions/todoLists';

class ListIndex extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    if (!this._input.value) {
      return;
    }
    this.props.createTodoList(this._input.value);
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

function mapStateToProps(state) {
  return {
    todoLists: state.todoLists,
  };
}

const mapDispatchToProps = {
  createTodoList,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListIndex);
