import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { OrderedMap, Record } from 'immutable';
import TodoList from './TodoList';
import ListIndex from './ListIndex';

const TodoRecord = Record({
  text: '',
  complete: false,
}, 'TodoRecord');

const TodoListRecord = Record({
  title: '',
  todos: OrderedMap(),
}, 'TodoListRecord');

const generator = x => () => ++x;
const nextTodoListId = generator(0);
const nextTodoId = generator(0);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoLists: OrderedMap(),
    };
    this.createNewTodoList = this.createNewTodoList.bind(this);
  }

  createNewTodoList(title) {
    this.setState({
      todoLists: this.state.todoLists.set(nextTodoListId(), TodoListRecord({
        title,
      })),
    });
  }

  createNewTodo = (todoListId, text) => {
    this.setState({
      todoLists: this.state.todoLists.setIn(
        [todoListId, 'todos', nextTodoId()],
        TodoRecord({ text, })
      ),
    });
  };

  toggleTodoItem = (todoListId, todoId) => {
    this.setState({
      todoLists: this.state.todoLists.updateIn([todoListId, 'todos', todoId, 'complete'], x => !x),
    });
  };

  deleteTodoItem = (todoListId, todoId) => {
    this.setState({
      todoLists: this.state.todoLists.deleteIn([todoListId, 'todos', todoId]),
    });
  };

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            <ListIndex
              todoLists={this.state.todoLists}
              createNewTodoList={this.createNewTodoList}
            />
          )}
          />
          <Route path="/list/:id" render={({ match }) => {
            const id = parseInt(match.params.id, 10);
            const todoList = this.state.todoLists.get(id);
            if (!todoList) {
              return <div>404</div>
            }
            return (
              <TodoList
                id={id}
                title={todoList.title}
                todos={todoList.todos}
                createNewTodo={this.createNewTodo}
                toggleTodoItem={this.toggleTodoItem}
                deleteTodoItem={this.deleteTodoItem}
              />
            );
          }}
          />
        </div>
      </Router>
    );
  }
}

export default App;
