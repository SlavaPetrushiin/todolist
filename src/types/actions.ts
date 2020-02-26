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
export const FORM_LOGIN = "TodoList/Reducer/FORM_LOGIN";

//interface для каждого actionCreator

export interface IAddTodolist {
    type : typeof ADD_TODOLIST; //type будет строкой "TodoList/Reducer/ADD-TODOLIST"
    newToDolist : any
};

export interface IAddTask {
    type : typeof ADD_TASK;
    newTask : any;
    todoListId : string;
};

export interface IChangeTask {
    type : typeof CHANGE_TASK;
    updatedTask : any
};

export interface IFilterTasks {
    type : typeof FILTER_TASK;
    newFilterValue : string;
    todoListId : string;
};

export interface IDeleteTask {
    type : typeof DELETE_TASK;
    taskId : string;
    todoListId : string;
};

export interface IDeleteToDoList {
    type : typeof DELETE_TODOLIST;
    todoListId : string;
};

export interface ISetToDoList {
    type : typeof SET_TODOLIST;
    todoLists : any[];
};

export interface ISetTasks {
    type : typeof SET_TASKS;
    tasks : any[];
    todoListId : string;
};

export interface IChangeTitleList {
    type : typeof CHANGE_TITLE_LIST;
    newTitle : string;
    todoListId : string
};

export interface IError {
    type: typeof ERROR
};

export interface ILogin{
    type: typeof FORM_LOGIN
};

// Собираю все interface для reducer
export type allActionTypes =
    | IAddTodolist
    | IAddTask
    | IChangeTask
    | IFilterTasks
    | IDeleteTask
    | IDeleteToDoList
    | ISetToDoList
    | ISetTasks
    | IChangeTitleList
    | IError
    | ILogin


