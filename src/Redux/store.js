import { createStore, combineReducers } from "redux";
import { toDoListReducer } from "./reducer";

const reducers = combineReducers({
  todoListsPage: toDoListReducer
});

const store = createStore(reducers);

window.store = store;

export default store;
