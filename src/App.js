import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import TodoList from './screens/TodoList';
import ListIndex from './screens/ListIndex';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ListIndex} />
          <Route path="/list/:id" component={TodoList} />
        </div>
      </Router>
    );
  }
}

export default App;
