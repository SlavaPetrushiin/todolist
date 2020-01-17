export const ADD_TODOLIST = "TodoList/Reducer/ADD-TODOLIST";
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const CHANGE_TASK = "TodoList/Reducer/CHANGE-TASK";
export const FILTER_TASK = "TodoList/Reducer/FILTER-TASK";
export const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const SET_TODOLIST = "TodoList/Reducer/SET-TODOLIST";
export const SET_TASKS = "TodoList/Reducer/SET-TASKS";
export const ERROR = "TodoList/Reducer/ERROR";
export const CHANGE_TITLE_LIST = "TodoList/Reducer/CHANGE_TITLE_LIST";

const initialState = {
  todoLists: [],
  errorMessage: false
};

export const toDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return {
        ...state,
        errorMessage: true
      };

    case ADD_TODOLIST:
      return {
        ...state,
        todoLists: [
          ...state.todoLists,
          { ...action.newToDolist, tasks: [], filterValue: "All" }
        ]
      };

    case CHANGE_TITLE_LIST:
      return {
        ...state,
        todoLists: state.todoLists.map(todoList => {
          if (todoList.id === action.todoListId) {
            debugger;
            return { ...todoList, title: action.newTtitle };
          } else {
            return todoList;
          }
        })
      };
    case ADD_TASK: //Добавление новых тасок в лист
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
    case CHANGE_TASK:
      return {
        ...state,
        todoLists: state.todoLists.map(todoList => {
          if (todoList.id === action.updatedTask.todoListId) {
            return {
              ...todoList, //	1 ищем совпадение листа
              tasks: todoList.tasks.map(task => {
                if (task.id === action.updatedTask.id) {
                  return { ...task, ...action.updatedTask };
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
    case FILTER_TASK:
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
    case DELETE_TASK:
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
    case DELETE_TODOLIST:
      return {
        ...state,
        todoLists: state.todoLists.filter(list => list.id !== action.todoListId)
      };
    case SET_TODOLIST:
      let todoLists = action.todoLists.map(todoList => {
        return {
          ...todoList,
          tasks: [],
          filterValue: "All"
        };
      });
      return {
        ...state,
        todoLists: todoLists
      };
    case SET_TASKS:
      return {
        ...state,
        todoLists: state.todoLists.map(todoList => {
          if (todoList.id === action.todoListId) {
            return {
              ...todoList,
              tasks: [...todoList.tasks, ...action.tasks]
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

//ActionCreater
export const addTodolist = newToDolist => {
  return {
    type: ADD_TODOLIST,
    newToDolist: newToDolist
  };
};

export const addTask = (newTask, todoListId) => {
  return {
    type: ADD_TASK,
    newTask,
    todoListId
  };
};

export const changeTask = updatedTask => {
  return {
    type: CHANGE_TASK,
    updatedTask
  };
};

export const filterTasks = (newFilterValue, todoListId) => {
  return {
    type: FILTER_TASK,
    newFilterValue,
    todoListId
  };
};

export const deleteTask = (taskId, todoListId) => {
  return {
    type: DELETE_TASK,
    taskId,
    todoListId
  };
};

export const deleteToDoList = todoListId => {
  return {
    type: DELETE_TODOLIST,
    todoListId
  };
};

export const setToDoList = todoLists => {
  return {
    type: SET_TODOLIST,
    todoLists
  };
};

export const setTasks = (tasks, todoListId) => ({
  type: SET_TASKS,
  tasks,
  todoListId
});

export const changeTitleList = (newTtitle, todoListId) => ({
  type: CHANGE_TITLE_LIST,
  newTtitle,
  todoListId
});

export const showError = () => ({ type: ERROR });
