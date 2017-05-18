import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Hello world',
      todos: [
        { text: 'Buy milk', complete: true },
        { text: 'Buy milk', complete: true },
        { text: 'Buy milk', complete: false },
      ],
    };
  }
  render() {
    return (
      <div id="todo-app">
        <h2>Thursday tasks</h2>
        <ul>
          <li>
            <p className="checked">Buy milk</p>
            <button>
              Delete item
            </button>
          </li>
          <li>
            <p>Pay bills</p>
            <button>
              Delete item
            </button>
          </li>
        </ul>
        <input placeholder="New todo" />
        <button>Add item</button>
      </div>
    );
  }
}

export default App;
