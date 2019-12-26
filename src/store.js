import { createStore, combineReducers } from "redux";

const initialState = {
  todoLists: []
};

const reducer = (state = initialState, action) => {
  debugger;
  switch (action.type) {
    case "ADD-TODOLIST":
      return {
        ...state,
        todoLists: [...state.todoLists, action.newToDolist]
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

window.store = store;

export default store;
