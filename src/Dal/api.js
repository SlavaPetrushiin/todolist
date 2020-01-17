import axios from "axios";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
  withCredentials: true,
  headers: { "API-KEY": "c42da93b-73d1-47c9-9b91-cb5950b4c7d5" }
});

export const api = {
  getToDoLists() {
    return instance.get();
  },

  createToDoList(text) {
    return instance.post("", { title: text });
  },

  deleteToDoList(todoListId) {
    return instance.delete(`/${todoListId}`);
  },

  updateTitleToDoList(newTitle, todoListId) {
    return instance.put(`/${todoListId}`, { title: newTitle });
  },

  getTasks(todoListId) {
    return instance.get(`/${todoListId}/tasks`);
  },

  createTask(newTitleTask, todoListId) {
    return instance.post(`/${todoListId}/tasks`, { title: newTitleTask });
  },

  deleteTask(taskId, todoListId) {
    return instance.delete(`/${todoListId}/tasks/${taskId}`);
  },

  updateTask(updateTask, taskId, todoListId) {
    return instance.put(`/${todoListId}/tasks/${taskId}`, updateTask);
  }
};
