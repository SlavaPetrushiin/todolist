import React from "react";
import "./../App.css";
import TodoListFooter from "./TodoListFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";
import { connect } from "react-redux";
import AddNewItemForm from "./AddNewItemForm";
import axios from "axios";
import {
  addTask,
  changeTask,
  filterTasks,
  deleteTask,
  deleteToDoList,
  showError,
  setTasks
} from "./../Redux/reducer";

class ToDoList extends React.Component {
  nextTAskId = 0;

  componentDidMount() {
    this.restoreState()
      .then(response => {
        let tasks = response.data.items;
        let todoListId = this.props.id;
        this.props.setTasks(tasks, todoListId);
      })
      .catch(() => {
        this.props.showErrorMessage();
      });
  }

  restoreState() {
    return axios.get(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
      {
        withCredentials: true,
        headers: {
          "API-KEY": "4f784e15-0555-4b7d-a7c1-c9d2f74d92fa"
        }
      }
    );
  }

  addTask = text => {
    axios
      .post(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
        { title: text },
        {
          withCredentials: true,
          headers: {
            "API-KEY": "4f784e15-0555-4b7d-a7c1-c9d2f74d92fa"
          }
        }
      )
      .then(response => {
        if (response.data.resultCode === 0) {
          let newTask = {
            ...response.data.data.item,
            isDone: false,
            priority: "high"
          };
          this.props.addTask(newTask, this.props.id);
        }
      })
      .catch(() => {
        this.props.showErrorMessage();
      });
  };

  changeTask = (taskId, obj) => {
    let todoListId = this.props.id;
    let changeUserTask = this.props.tasks.find(task => task.id === taskId);
    let updateTask = {
      title: changeUserTask.title,
      description: changeUserTask.description,
      completed: changeUserTask.completed,
      status: changeUserTask.status,
      priority: changeUserTask.priority,
      startDate: changeUserTask.startDate,
      deadline: changeUserTask.deadline,
      ...obj
    };

    axios
      .put(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}/tasks/${taskId}`,
        updateTask,
        {
          withCredentials: true,
          headers: {
            "API-KEY": "4f784e15-0555-4b7d-a7c1-c9d2f74d92fa"
          }
        }
      )
      .then(response => {
        this.props.changeTask(taskId, obj, todoListId); //мне не нравиться, что пришла вся таска, а отдаем obj
      });
  };

  changeFilter = newFilterValue => {
    let todoListId = this.props.id;
    this.props.filterTasks(newFilterValue, todoListId);
  };

  deleteTask = taskId => {
    axios
      .delete(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
        {
          withCredentials: true,
          headers: {
            "API-KEY": "4f784e15-0555-4b7d-a7c1-c9d2f74d92fa"
          }
        }
      )
      .then(response => {
        if (response.data.resultCode === 0) {
          this.props.deleteTask(taskId, this.props.id);
        }
      })
      .catch(() => {
        this.props.showErrorMessage();
      });
  };

  deleteToDoList = () => {
    axios
      .delete(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
        {
          withCredentials: true,
          headers: {
            "API-KEY": "4f784e15-0555-4b7d-a7c1-c9d2f74d92fa"
          }
        }
      )
      .then(response => {
        if (response.data.resultCode === 0) {
          this.props.deleteToDoList(this.props.id);
        }
      });
  };

  render() {
    const getFilterTasks = (tasks, filter) => {
      return tasks.filter(task => {
        // eslint-disable-next-line default-case
        switch (filter) {
          case "All":
            return true;
          case "Completed":
            return !task.isDone;
          case "Active":
            return task.isDone;
        }
      });
    };

    let errorMessage = this.props.errorMessage && "Error"; //вывожу ошибку по запросам

    return (
      <div className="App">
        <div className="todoList">
          <header className="header">
            <TodoListTitle
              title={this.props.title}
              deleteToDoList={this.deleteToDoList}
            />
            <AddNewItemForm addItem={this.addTask} />
          </header>
          <TodoListTasks
            tasks={getFilterTasks(this.props.tasks, this.props.filterValue)}
            changeTask={this.changeTask}
            deleteTask={this.deleteTask}
          />
          <TodoListFooter
            changeFilter={this.changeFilter}
            filterValue={this.props.filterValue}
          />
        </div>
        {errorMessage}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.todoListsPage.errorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTask: (newTask, todoListId) => {
      dispatch(addTask(newTask, todoListId));
    },
    changeTask: (taskId, obj, todoListId) => {
      dispatch(changeTask(taskId, obj, todoListId));
    },
    filterTasks: (newFilterValue, todoListId) => {
      dispatch(filterTasks(newFilterValue, todoListId));
    },
    deleteTask: (taskId, todoListId) => {
      dispatch(deleteTask(taskId, todoListId));
    },
    deleteToDoList: todoListId => {
      dispatch(deleteToDoList(todoListId));
    },
    setTasks: (tasks, todoListId) => {
      dispatch(setTasks(tasks, todoListId));
    },
    showErrorMessage: () => {
      dispatch(showError());
    }
  };
};

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoList);

export default TodoListContainer;
