import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import rootReducer from './reducers';
import App from './App';
import { fetchTodoLists } from './actions/todoLists';
import './index.css';

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk)
)

store.dispatch(fetchTodoLists());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
