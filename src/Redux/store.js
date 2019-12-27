import { createStore, combineReducers } from "redux";

const initialState = {
  todoLists: [
    // {
    //   id: 0,
    //   title: "CSS",
    //   tasks: [{ id: 0, title: "Flex", isDone: false, priority: "high" }]
    // }
  ]
};

const toDoListReducer = (state = initialState, action) => {
  debugger;
  switch (action.type) {
    case "ADD-TODOLIST":
      return {
        ...state,
        todoLists: [...state.todoLists, action.newToDolist]
      };
    case "ADD-TASK": //Добавление новых тасок в лист
      return {
        ...state,
        todoLists: state.todoLists.map(todoList => {
          if (todoList.id === action.todoListId) {
            return { ...todoList, tasks: [...todoList.tasks, action.newTask] };
          } else {
            return todoList;
          }
        })
      };
    case "CHANGE-TASK":
      return {
        ...state,
        todoLists: state.todoLists.map(todoList => {
          if (todoList.id === action.todoListId) {
            return {
              ...todoList, //	1 ищем совпадение листа
              tasks: todoList.tasks.map(task => {
                if (task.id === action.taskId) {
                  return { ...task, ...action.obj };
                } else {
                  return task;
                }
              })
            };
          } else {
            return todoList;
          }
        })
      };
    case "FILTER-TASK":
      return {
        ...state,
        todoLists: state.todoLists.map(todoList => {
          if (todoList.id === action.todoListId) {
            return { ...todoList, filterValue: action.newFilterValue };
          } else {
            return todoList;
          }
        })
      };
    case "DELETE-TASK":
      debugger;
      return {
        ...state,
        todoLists: state.todoLists.map(todoList => {
          if (todoList.id === action.todoListId) {
            return {
              ...todoList, //	1 ищем совпадение листа
              tasks: todoList.tasks.filter(task => {
                return task.id !== action.taskId;
              })
            };
          } else {
            return todoList;
          }
        })
      };
    default:
      return state;
  }
};

const reducers = combineReducers({
  todoListsPage: toDoListReducer
});

const store = createStore(reducers);

window.store = store;

export default store;
