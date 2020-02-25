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

//Ответ от сервера, создание нового листа
export interface IResCreateToDoList {
    data : {
            item : ITodoList;
        }
}

//Удаление листа
export interface IDeletedToDoList {
    resultCode: number;
    messages?: [];
    data?: {};
}

export interface IUpdateTitleToDoList {
    resultCode: number;
    messages?: [];
    data?: {};
}

export interface IResCreateTask {
    data : {
        item : ITask;
        resultCode: number;
    }
}

export interface IResGetTasks {
    items : ITask[];
}




