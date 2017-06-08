import { OrderedMap, Record } from 'immutable';
import types from '../actions/todoLists';

const TodoRecord = Record({
  text: '',
  complete: false,
}, 'TodoRecord');

const TodoListRecord = Record({
  title: '',
  todos: OrderedMap(),
}, 'TodoListRecord');

const incrementor = x => () => ++x;
const nextTodoListId = incrementor(0);
const nextTodoId = incrementor(0);

export default function todoLists(state = OrderedMap(), action) {
  switch (action.type) {
    case types.CREATE_TODO_LIST:
      return state.set(nextTodoListId(), TodoListRecord(action.payload));
    case types.CREATE_TODO_ITEM:
      return state.setIn(
        [action.payload.listId, 'todos', nextTodoId()],
        TodoRecord({ text: action.payload.text }),
      );
    case types.TOGGLE_TODO_ITEM:
      return state.updateIn([action.payload.listId, 'todos', action.payload.todoId, 'complete'], x => !x);
    case types.DELETE_TODO_ITEM:
      return state.deleteIn([action.payload.listId, 'todos', action.payload.todoId]);
    default:
      return state;
  }
}