import {createStore, combineReducers, applyMiddleware} from "redux";
import { toDoListReducer } from "./reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  todoListsPage: toDoListReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware( thunk) );

export default store;
