export interface ITask {
    description: string;
    title: string;
    completed: boolean;
    status: number;
    priority: number;
    startDate?: string | null;
    deadline?: string | null;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};

export interface ITodoList {
    id: string;
    title: string;
    filterValue: string;
    addedDate?: string;
    order?: number;
    tasks : Array<ITask>;
};

//Интерфейс обновления тасок
export interface IObjChangeTask{
    title? : string;
    status? : number;
    priority? : number;
}



// interface for thunk ******************
// common interface *************
interface headersResponse {
    'cache-control': string;
    'content-length': string;
    'content-type': string;
    'expires': string;
    'pragma': string;
}

interface DeleteAndUpdateToDoList{
    data: {};
    messages : string[];
    resultCode : number;
}

// Получение листов
export interface IResGetToDoLists{
    data: Array<ITodoList>;
    status: number;
    statusText: string;
    headers: headersResponse;
    config: object;
    request: object;
}

//Создание нового листа
interface IForCreateNewToDoList{
    data: {item : ITodoList};
    messages : string[];
    resultCode : number;
}

export interface ICreateNewToDoList{
    data: IForCreateNewToDoList
    status: number;
    statusText: string;
    headers: headersResponse;
    config: object;
    request: object;
}

//Удаление листа
export interface IResDeleteToDoList{
    data: DeleteAndUpdateToDoList
    status: number;
    statusText: string;
    headers: headersResponse;
    config: object;
    request: object;
}

//Обновление названия листа
export interface IResUpdateTitleToDoList{
    data: DeleteAndUpdateToDoList
    status: number;
    statusText: string;
    headers: headersResponse;
    config: object;
    request: object;
}


//Запрос на получение тасок
interface IResForTasksData{
    items : Array<ITask>;
    totalCount: number;
    error: string | null;
}

export interface IResGetTasks{
    data: IResForTasksData;
    status: number;
    statusText: string;
    headers: headersResponse;
    config: object;
    request: object;
}

//Создание новой таски
interface IForCreateNewTask{
    data: {item : ITask};
    messages : string[];
    resultCode : number;
}

export interface IResCreateNewTask{
    data: IForCreateNewTask
    status: number;
    statusText: string;
    headers: headersResponse;
    config: object;
    request: object;
}
//Удаление таски
export interface IResDeleteTask{
    data: DeleteAndUpdateToDoList
    status: number;
    statusText: string;
    headers: headersResponse;
    config: object;
    request: object;
}

//Обновление таски
interface IForUpdateTitleTask{
    data: {item : ITask};
    messages : string[];
    resultCode : number;
}

export interface IResUpdateTitleTask{
    data: IForUpdateTitleTask
    status: number;
    statusText: string;
    headers: headersResponse;
    config: object;
    request: object;
}

//*********************
type data = IForUpdateTitleTask | DeleteAndUpdateToDoList




