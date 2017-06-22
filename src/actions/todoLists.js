const types = {
  CREATE_TODO_LIST: 'CREATE_TODO_LIST',
  CREATE_TODO_ITEM: 'CREATE_TODO_ITEM',
  TOGGLE_TODO_ITEM: 'TOGGLE_TODO_ITEM',
  DELETE_TODO_ITEM: 'DELETE_TODO_ITEM',
  LOAD_TODO_LISTS: 'LOAD_TODO_LISTS',
}

export default types;

export function createTodoList(title) {
  return {
    type: types.CREATE_TODO_LIST,
    payload: { title }
  };
}

export function createTodoItem(listId, text) {
  return {
    type: types.CREATE_TODO_ITEM,
    payload: { listId, text }
  };
}

export function toggleTodoItem(listId, todoId) {
  return {
    type: types.TOGGLE_TODO_ITEM,
    payload: { listId, todoId }
  };
}

export function deleteTodoItem(listId, todoId) {
  return {
    type: types.DELETE_TODO_ITEM,
    payload: { listId, todoId }
  };
}

export function loadTodoLists(data) {
  return {
    type: types.LOAD_TODO_LISTS,
    payload: data
  };
}

function api(path) {
  return fetch(`http://localhost:3001/api/v1${path}`)
      .then(resp => resp.json())
}

export function fetchTodoLists() {
  return (dispatch) => {
    api('/todolists/')
      .then((data) => dispatch(loadTodoLists(data)));
  }
}
