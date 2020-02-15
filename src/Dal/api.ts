import {IResGetToDoLists, ITask, ITodoList} from "../Redux/interfaces";
const axios = require('axios');

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
  withCredentials: true,
  headers: { "API-KEY": "c42da93b-73d1-47c9-9b91-cb5950b4c7d5" }
});

export const api = {
  getToDoLists() : Promise<Array<ITodoList>>{
    return instance.get().then((response: IResGetToDoLists) => {
      return response.data;
    });
  },

  createToDoList(text : string) {
    return instance.post("", { title: text });
  },

  deleteToDoList(todoListId : string) {
    return instance.delete(`/${todoListId}`);
  },

  updateTitleToDoList(newTitle : string, todoListId : string) {
    return instance.put(`/${todoListId}`, { title: newTitle });
  },

  getTasks(todoListId : string) {
    return instance.get(`/${todoListId}/tasks`);
  },

  createTask(newTitleTask : string, todoListId : string) {
    return instance.post(`/${todoListId}/tasks`, { title: newTitleTask });
  },

  deleteTask(taskId : string, todoListId : string) {
    return instance.delete(`/${todoListId}/tasks/${taskId}`);
  },

  updateTask(updateTask : ITask, taskId : string, todoListId : string) {
    return instance.put(`/${todoListId}/tasks/${taskId}`, updateTask);
  }
};
