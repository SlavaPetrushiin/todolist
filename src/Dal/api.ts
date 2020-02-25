import {
    IDeletedToDoList,
    IResCreateToDoList, IResGetTasks,
    ITask,
    ITodoList,
    IUpdateTitleToDoList
} from "../Redux/interfaces";
import axios from "axios"

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "c42da93b-73d1-47c9-9b91-cb5950b4c7d5"}
});

export const api = {
    getToDoLists(): Promise<Array<ITodoList>> {
        return instance.get<Array<ITodoList>>('')
            .then(response => {
                return response.data;
            });
    },

    createToDoList(text: string) : Promise<ITodoList> {
        return instance.post<IResCreateToDoList>("", {title: text}).then(response => {
            let todoList = response.data.data.item;
            return todoList
        });
        ;
    },

    deleteToDoList(todoListId: string) : Promise<number> {
        return instance.delete<IDeletedToDoList>(`/${todoListId}`).then(response => {
            return response.data.resultCode;
        });
    },

    updateTitleToDoList(newTitle: string, todoListId: string) : Promise<IUpdateTitleToDoList> {
        return instance.put<IUpdateTitleToDoList>(`/${todoListId}`, {title: newTitle}).then(response => {
            return response.data
        });;
    },

    getTasks(todoListId: string) : Promise<ITask[]> {
        return instance.get<IResGetTasks>(`/${todoListId}/tasks`).then(response => {

            return response.data.items;
        });
    },

    createTask(newTitleTask: string, todoListId: string) : Promise<ITask>{
        return instance.post(`/${todoListId}/tasks`, {title: newTitleTask}).then(response => {
            if (response.data.resultCode === 0) {

                return response.data.data.item
            }
        });
    },

    deleteTask(taskId: string, todoListId: string) : Promise<number> {
        return instance.delete(`/${todoListId}/tasks/${taskId}`).then(response => {
            return response.data.resultCode
        });
    },

    updateTask(updateTask: ITask, taskId: string, todoListId: string) : Promise<ITask> {
        return instance.put(`/${todoListId}/tasks/${taskId}`, updateTask).then(response => {
            return response.data.data.item
        });
    }
};
