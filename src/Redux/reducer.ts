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
    ISetTasks,
    IChangeTitleList,
} from "../types/actions";
import {
    ITask,
    ITodoList,
    IUpdateTitleToDoList
} from "./interfaces";

interface IState {
    todoLists: Array<ITodoList>;
    errorMessage: boolean;
}

const initialState: IState = {
    todoLists: [],
    errorMessage: false
};

export const toDoListReducer = (
    state = initialState,
    action: allActionTypes
) => {
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
                todoLists: state.todoLists.map((todoList: ITodoList) => {
                    if (todoList.id === action.todoListId) {
                        ;
                        return {...todoList, title: action.newTitle};
                    } else {
                        return todoList;
                    }
                })
            };
        case ADD_TASK: //Добавление новых тасок в лист
            return {
                ...state,
                todoLists: state.todoLists.map((todoList: ITodoList) => {
                    if (todoList.id === action.todoListId) {
                        return {...todoList, tasks: [...todoList.tasks, action.newTask]};
                    } else {
                        return todoList;
                    }
                })
            };
        case CHANGE_TASK:
            ;
            return {
                ...state,
                todoLists: state.todoLists.map((todoList: ITodoList) => {
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
                todoLists: state.todoLists.map((todoList: ITodoList) => {
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
                todoLists: state.todoLists.map((todoList: ITodoList) => {
                    if (todoList.id === action.todoListId) {
                        return {
                            ...todoList, //	1 ищем совпадение листа
                            tasks: todoList.tasks.filter((task: any) => {
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
            let todoLists = action.todoLists.map((todoList: ITodoList) => {
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
                todoLists: state.todoLists.map((todoList: ITodoList) => {
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
export const addTodolist = (newToDolist: ITodoList): IAddTodolist => ({
    type: ADD_TODOLIST,
    newToDolist
});
export const addTask = (newTask: ITask, todoListId: string): IAddTask => ({
    type: ADD_TASK,
    newTask,
    todoListId
});
export const changeTask = (updatedTask: ITask): IChangeTask => ({
    type: CHANGE_TASK,
    updatedTask
});
export const filterTasks = (
    newFilterValue: string,
    todoListId: string
): IFilterTasks => ({type: FILTER_TASK, newFilterValue, todoListId});
export const deleteTask = (
    taskId: string,
    todoListId: string
): IDeleteTask => ({type: DELETE_TASK, taskId, todoListId});
export const deleteToDoList = (todoListId: string): IDeleteToDoList => ({
    type: DELETE_TODOLIST,
    todoListId
});
export const setToDoList = (todoLists: Array<ITodoList>): ISetToDoList => ({
    type: SET_TODOLIST,
    todoLists
});
export const setTasks = (
    tasks: Array<ITask>,
    todoListId: string
): ISetTasks => ({type: SET_TASKS, tasks, todoListId});
export const changeTitleList = (
    newTitle: string,
    todoListId: string
): IChangeTitleList => ({type: CHANGE_TITLE_LIST, newTitle, todoListId});


//thunk
export const getToDolistThunkCreator = () => (dispatch: Dispatch): void => {
    api.getToDoLists()
        .then((response: Array<ITodoList>) => {
            dispatch(setToDoList(response));
        });
};

export const createToDoListThunkCreator = (title: string) => (dispatch: Dispatch): void => {
    api.createToDoList(title)
        .then((todoList: ITodoList) => {
            dispatch(addTodolist(todoList));
        });
};

export const deleteToDoListThunkCreator = (todoListId: string) => (dispatch: Dispatch): void => {
    api.deleteToDoList(todoListId)
        .then(resultCode => {
            if (resultCode === 0) {
                dispatch(deleteToDoList(todoListId));
            }
        });
};

export const updateTitleToDoListThunkCreator = (title: string, todoListId: string) => (dispatch: Dispatch): void => {
    api.updateTitleToDoList(title, todoListId)
        .then((response: IUpdateTitleToDoList) => {
            dispatch(changeTitleList(title, todoListId));
        });
};

export const getTasksThunkCreator = (todoListId: string) => (dispatch: Dispatch): void => {
    api.getTasks(todoListId).then(tasks => {
        dispatch(setTasks(tasks, todoListId));
    });
};

export const createTaskThunkCreator = (newTitleTask: string, todoListId: string) => (dispatch: Dispatch): void => {
    api.createTask(newTitleTask, todoListId)
        .then(response => {
            dispatch(addTask(response, todoListId));
        });
};

export const deleteTaskThunkCreator = (taskId: string, todoListId: string) => (dispatch: Dispatch): void => {
    api.deleteTask(taskId, todoListId)
        .then((resultCode) => {
            if (resultCode === 0) {
                dispatch(deleteTask(taskId, todoListId));
            }
        });
};

export const updateTaskThunkCreator = (updateTask: ITask, taskId: string, todoListId: string) => (dispatch: Dispatch): void => {
    api.updateTask(updateTask, taskId, todoListId)
        .then((task) => {
            dispatch(changeTask(task));
        });
};

