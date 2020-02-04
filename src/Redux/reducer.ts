import {api} from "../Dal/api";
import {Dispatch} from "redux";
import {
    allActionTypes,
    ADD_TASK,
    ADD_TODOLIST,
    CHANGE_TASK,
    CHANGE_TITLE_LIST,
    DELETE_TASK,
    DELETE_TODOLIST,
    FILTER_TASK,
    SET_TASKS,
    SET_TODOLIST,
    IAddTodolist,
    IAddTask,
    IChangeTask,
    IFilterTasks,
    IDeleteTask,
    IDeleteToDoList,
    ISetToDoList,
    ISetTasks, IChangeTitleList, ERROR
} from "../types/actions";
import {ITask, ITodoList} from "./interfaces";



interface IState {
    todoLists : Array<ITodoList>;
    errorMessage : boolean;
}

const initialState : IState = {
    todoLists: [],
    errorMessage: false
};

export const toDoListReducer = (state = initialState, action : allActionTypes) => {
    switch (action.type) {
        // case ERROR:
        //     return {
        //         ...state,
        //         errorMessage: true
        //     };

        case ADD_TODOLIST:
            return {
                ...state,
                todoLists: [
                    ...state.todoLists,
                    {...action.newToDolist, tasks: [], filterValue: "All"}
                ]
            };

        case CHANGE_TITLE_LIST:
            return {
                ...state,
                todoLists: state.todoLists.map((todoList :ITodoList) => {
                    if (todoList.id === action.todoListId) {
                        debugger;
                        return {...todoList, title: action.newTitle};
                    } else {
                        return todoList;
                    }
                })
            };
        case ADD_TASK: //Добавление новых тасок в лист
            return {
                ...state,
                todoLists: state.todoLists.map((todoList :ITodoList) => {
                    if (todoList.id === action.todoListId) {
                        return {...todoList, tasks: [...todoList.tasks, action.newTask]};
                    } else {
                        return todoList;
                    }
                })
            };
        case CHANGE_TASK:
            debugger
            return {
                ...state,
                todoLists: state.todoLists.map((todoList :ITodoList) => {
                    if (todoList.id === action.updatedTask.todoListId) {
                        return {
                            ...todoList, //	1 ищем совпадение листа
                            tasks: todoList.tasks.map((task: any) => {
                                if (task.id === action.updatedTask.id) {
                                    return {...task, ...action.updatedTask};
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
                todoLists: state.todoLists.map((todoList :ITodoList) => {
                    if (todoList.id === action.todoListId) {
                        return {...todoList, filterValue: action.newFilterValue};
                    } else {
                        return todoList;
                    }
                })
            };
        case DELETE_TASK:
            return {
                ...state,
                todoLists: state.todoLists.map((todoList :ITodoList) => {
                    if (todoList.id === action.todoListId) {
                        return {
                            ...todoList, //	1 ищем совпадение листа
                            tasks: todoList.tasks.filter((task : any) => {
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
            let todoLists = action.todoLists.map((todoList :ITodoList) => {
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
                todoLists: state.todoLists.map((todoList :ITodoList) => {
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
export const addTodolist = (newToDolist : ITodoList) : IAddTodolist => ({type: ADD_TODOLIST, newToDolist});
export const addTask = (newTask : ITask, todoListId : string ) : IAddTask  => ({type: ADD_TASK, newTask, todoListId});
export const changeTask = (updatedTask : ITask) : IChangeTask => ({type: CHANGE_TASK, updatedTask});
export const filterTasks = (newFilterValue : string, todoListId : string) : IFilterTasks => ({type: FILTER_TASK, newFilterValue, todoListId});
export const deleteTask = (taskId : string, todoListId : string) : IDeleteTask => ({type: DELETE_TASK, taskId, todoListId});
export const deleteToDoList = (todoListId : string) : IDeleteToDoList => ({type: DELETE_TODOLIST, todoListId});
export const setToDoList = (todoLists : Array<ITodoList>) : ISetToDoList => ({type: SET_TODOLIST, todoLists});
export const setTasks = (tasks : Array<ITask>, todoListId : string) : ISetTasks => ({type: SET_TASKS, tasks, todoListId});
export const changeTitleList = (newTitle : string, todoListId : string) : IChangeTitleList => ({type: CHANGE_TITLE_LIST, newTitle, todoListId});


//thunk
export const getToDolistThunkCreator : Function = () : Function => (dispatch : Dispatch) : void => {
    api.getToDoLists().then((response : any) => {
        debugger
        return response.data;
    }).then((response : any) => {
        dispatch(setToDoList(response));
    });
}

export const createToDoListThunkCreator : Function = (title : string) : Function => (dispatch : Dispatch) : void => {
    api.createToDoList(title).then((response : any) => {
        let todoList = response.data.data.item;
        dispatch(addTodolist(todoList));
    });
};

export const deleteToDoListThunkCreator : Function = (todoListId : string) : Function => (dispatch : Dispatch) : void => {
    api.deleteToDoList(todoListId).then((response : any) => {
        if (response.data.resultCode === 0) {
            dispatch(deleteToDoList(todoListId));
        }
    });
};

export const updateTitleToDoListThunkCreator : Function = (title : string, todoListId : string) : Function => (dispatch : Dispatch) : void => {
    api.updateTitleToDoList(title, todoListId).then((response: any) => {
        dispatch(changeTitleList(title, todoListId));
    });
};

export const getTasksThunkCreator : Function = (todoListId : string) : Function => (dispatch : Dispatch) : void => {
  api.getTasks(todoListId)
      .then((response : any) => {
        let tasks = response.data.items;
        dispatch(setTasks(tasks, todoListId));
      })
};

export const createTaskThunkCreator : Function = (newTitleTask : string, todoListId : string) : Function => (dispatch : Dispatch) : void => {
  api.createTask(newTitleTask, todoListId)
      .then((response : any)  => {
        if (response.data.resultCode === 0) {
          let newTask = {
            ...response.data.data.item
          };
          dispatch(addTask(newTask, todoListId));
        }
      })
};

export const deleteTaskThunkCreator : Function = (taskId : string, todoListId : string) : Function => (dispatch : Dispatch) : void => {
  api.deleteTask(taskId, todoListId)
      .then((response : any) => {
        if (response.data.resultCode === 0) {
          dispatch(deleteTask(taskId, todoListId));
        }
      })
};

export const updateTaskThunkCreator : Function = (updateTask : any, taskId : string, todoListId : string) : Function => (dispatch : Dispatch)  : void=> {
  api.updateTask(updateTask, taskId, todoListId)
      .then((response : any) => {
        dispatch(changeTask(response.data.data.item)); //мне не нравиться, что пришла вся таска, а отдаем obj
      })
}

export const showError = () => ({type: ERROR});


