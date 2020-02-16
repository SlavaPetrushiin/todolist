import {createStore, combineReducers, applyMiddleware} from "redux";
import { toDoListReducer } from "./reducer";
import thunk, {ThunkMiddleware} from "redux-thunk";
import {allActionTypes} from "../types/actions";

const rootReducer = combineReducers({
  todoListsPage: toDoListReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<RootState, allActionTypes>));

export default store;
