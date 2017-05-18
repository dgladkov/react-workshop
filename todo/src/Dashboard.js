import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newTitle: '',
    };
    this.onNewTitleChange = this.onNewTitleChange.bind(this);
    this.onCreateClick = this.onCreateClick.bind(this);
  }

  onNewTitleChange(e) {
    this.setState({ newTitle: e.target.value });
  }

  onCreateClick() {
    this.props.createNewTodoList(this.state.newTitle);
    this.setState({ newTitle: '' });
  }

  render() {
    return (
      <div id="todo-app">
        <h2>Your todo lists</h2>
        <ul>
          {this.props.todoLists.map((todo, index) => {
            const todos = this.props.todoLists.getIn([index, 'todos']);
            return (
              <li key={index}>
                <Link to={`/list/${index}`}>
                  {todo.title}
                </Link>
                <span className="progress">
                  {todos.count(todo => todo.complete)}/{todos.count()}
                </span>
              </li>
            );
          })}
        </ul>
        <input
          placeholder="New list"
          value={this.state.newTitle}
          onChange={this.onNewTitleChange}
        />
        <button onClick={this.onCreateClick}>Create list</button>
      </div>
    );
  }
}

export default Dashboard;
