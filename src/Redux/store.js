import {createStore, combineReducers, applyMiddleware} from "redux";
import { toDoListReducer } from "./reducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
  todoListsPage: toDoListReducer
});

const store = createStore(reducers, applyMiddleware( thunk) );

window.store = store;

export default store;
