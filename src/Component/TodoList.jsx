import React from "react";
import "./../App.css";
import TodoListFooter from "./TodoListFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";
import { connect } from "react-redux";
import AddNewItemForm from "./AddNewItemForm";
import { api } from "./../Dal/api";
import {
  addTask,
  changeTask,
  filterTasks,
  deleteTask,
  deleteToDoList,
  showError,
  setTasks,
  changeTitleList
} from "./../Redux/reducer";

class ToDoList extends React.Component {
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
    let todoListId = this.props.id;
    return api.getTasks(todoListId);
  }

  addTask = newTitleTask => {
    let todoListId = this.props.id;
    api
      .createTask(newTitleTask, todoListId)
      .then(response => {
        if (response.data.resultCode === 0) {
          debugger
          let newTask = {
            ...response.data.data.item
          };
          this.props.addTask(newTask, todoListId);
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

    api.updateTask(updateTask, taskId, todoListId).then(response => {
      let updatedTask = response.data.data.item;
      this.props.changeTask(updatedTask); //мне не нравиться, что пришла вся таска, а отдаем obj
    });
  };

  changeFilter = newFilterValue => {
    let todoListId = this.props.id;
    this.props.filterTasks(newFilterValue, todoListId);
  };

  deleteTask = taskId => {
    let todoListId = this.props.id;
    api
      .deleteTask(taskId, todoListId)
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
    let todoListId = this.props.id;
    api.deleteToDoList(todoListId).then(response => {
      if (response.data.resultCode === 0) {
        this.props.deleteToDoList(this.props.id);
      }
    });
  };

  changeTitleList = ({ title }) => {
    let todoListId = this.props.id;
    api.updateTitleToDoList(title, todoListId).then(response => {
      this.props.changeTitleList(title, todoListId);
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
              todoListId={this.props.id}
              deleteToDoList={this.deleteToDoList}
              changeTitleList={this.changeTitleList}
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
    changeTask: updatedTask => {
      dispatch(changeTask(updatedTask));
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
    },
    changeTitleList: (newTitle, todoListId) => {
      dispatch(changeTitleList(newTitle, todoListId));
    }
  };
};

const TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDoList);

export default TodoListContainer;
