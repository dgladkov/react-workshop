import React, { Component } from 'react';
import { List, Record } from 'immutable';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Dashboard from './Dashboard';
import TodoList from './TodoList';

const TodoListRecord = Record({
  title: null,
  todos: List(),
}, 'TodoListRecord')

const TodoRecord = Record({
  text: null,
  complete: false,
}, 'TodoRecord')

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todoLists: List(),
    };
    this.createNewTodoList = this.createNewTodoList.bind(this);
  }

  createNewTodoList(title) {
    this.setState({
      todoLists: this.state.todoLists.push(TodoListRecord({ title }))
    })
  }

  createNewTodo(listIndex, text) {
    if (text.length === 0) {
      return;
    }
    console.log(text);
    this.setState({
      todoLists: this.state.todoLists.updateIn(
        [listIndex, 'todos'],
        todos => todos.push(TodoRecord({ text }))
      ),
    });
  }

  toggleCompleteTodo(listIndex, index) {
    this.setState({
      todoLists: this.state.todoLists.updateIn([listIndex, 'todos', index, 'complete'], x => !x)
    });
  }

  removeTodo(listIndex, index) {
    this.setState({
      todoLists: this.state.todoLists.deleteIn([listIndex, 'todos', index]),
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            <Dashboard
              todoLists={this.state.todoLists}
              createNewTodoList={this.createNewTodoList}
            />
          )}/>
          <Route path="/list/:index" component={({ match }) => {
            return (
              <TodoList
                todoList={this.state.todoLists.get(match.params.index)}
                createNewTodo={this.createNewTodo.bind(this, match.params.index)}
                toggleCompleteTodo={this.toggleCompleteTodo.bind(this, match.params.index)}
                removeTodo={this.removeTodo.bind(this, match.params.index)}
              />
            );
          }}/>
        </div>
      </Router>
    );
  }
}

export default App;
