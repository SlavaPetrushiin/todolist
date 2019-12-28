import React from "react";
import "./../App.css";
import TodoListFooter from "./TodoListFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";
import { connect } from "react-redux";
import AddNewItemForm from "./AddNewItemForm";

class ToDoList extends React.Component {
  nextTAskId = 0;

  /*  componentDidMount() {
    this.restoreState();
  } */
  /*   saveState = () => {
    //сохранение стейта а локолстор
    let stateAsString = JSON.stringify(this.state);
    localStorage.setItem("our-state-" + this.props.id, stateAsString);
  }; */
  /*   restoreState = () => {
    //стартовый стейт
    let state = {
      filterValue: "Completed"
    };

    let stateAsString = localStorage.getItem("our-state-" + this.props.id);
    if (stateAsString !== null) {
      state = JSON.parse(stateAsString);
    }
    this.setState(state, () => {
      this.state.tasks.forEach(task => {
        if (task.id >= this.nextTAskId) {
          this.nextTAskId = task.id + 1;
        }
      });
    });
  }; */

  addTask = text => {
    let newText = text;
    let newTask = {
      id: this.nextTAskId,
      title: newText,
      isDone: false,
      priority: "high"
    };
    this.nextTAskId++;
    this.props.addTask(newTask, this.props.id);
  };

  changeTask = (taskId, obj) => {
    this.props.changeTask(taskId, obj, this.props.id);
  };

  changeFilter = newFilterValue => {
    this.props.filterTasks(newFilterValue, this.props.id);
  };

  deleteTask = taskId => {
    this.props.deleteTask(taskId, this.props.id);
  };

  deleteToDoList = () => {
    this.props.deleteToDoList(this.props.id);
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
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTask: (newTask, todoListId) => {
      const action = {
        type: "ADD-TASK",
        newTask,
        todoListId
      };
      dispatch(action);
    },
    changeTask: (taskId, obj, todoListId) => {
      const action = {
        type: "CHANGE-TASK",
        taskId,
        obj, //объект с title
        todoListId
      };
      dispatch(action);
    },
    filterTasks: (newFilterValue, todoListId) => {
      const action = {
        type: "FILTER-TASK",
        newFilterValue,
        todoListId
      };
      dispatch(action);
    },
    deleteTask: (taskId, todoListId) => {
      const action = {
        type: "DELETE-TASK",
        taskId,
        todoListId
      };
      dispatch(action);
    },
    deleteToDoList: todoListId => {
      const action = {
        type: "DELETE-TODOLIST",
        todoListId
      };
      dispatch(action);
    }
  };
};

const TodoListContainer = connect(null, mapDispatchToProps)(ToDoList);

export default TodoListContainer;
