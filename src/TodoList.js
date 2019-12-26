import React, { useDebugValue } from "react";
import "./App.css";
import TodoListFooter from "./TodoListFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";
import { connect } from "react-redux";

class TodoList extends React.Component {
  componentDidMount() {
    this.restoreState();
  }

  nextTAskId = 0;

  saveState = () => {
    //сохранение стейта а локолстор
    let stateAsString = JSON.stringify(this.state);
    localStorage.setItem("our-state-" + this.props.id, stateAsString);
  };

  restoreState = () => {
    //стартовый стейт
    let state = {
      tasks: [],
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
  };

  addTask = text => {
    let newText = text;
    let newTask = {
      id: this.nextTAskId,
      title: newText,
      isDone: false,
      priority: "high"
    };

    this.props.addTask(newTask);
    this.nextTAskId++;
    /*     let newTasks = [...this.state.tasks, newTask];
    this.setState({ tasks: newTasks }, () => {
      this.saveState();
    }); */
  };

  deleteTask = task => {
    let tasksCopy = this.state.tasks.filter(stateTask => {
      return stateTask !== task;
    });
    this.setState({ tasks: tasksCopy }, () => {
      this.saveState();
    });
  };

  changeTask = (taskId, obj) => {
    let newTasks = this.state.tasks.map(task => {
      if (task.id !== taskId) return task;
      else {
        return { ...task, ...obj };
      }
    });
    this.setState({ tasks: newTasks }, () => {
      this.saveState();
    });
  };

  changeFilter = newFilterValue => {
    this.setState(
      {
        filterValue: newFilterValue
      },
      () => {
        this.saveState();
      }
    );
  };

  render() {
    debugger;
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
          <header>
            <TodoListTitle title={this.props.title} />
            <AddNewItemForm addItem={this.addTask} />
          </header>
          <TodoListTasks
            tasks={
              !this.props.tasks.length
                ? getFilterTasks(this.props.tasks, "All")
                : "No tasks"
            }
            changeTask={this.changeTask}
            deleteTask={this.deleteTask}
          />
          <TodoListFooter
            changeFilter={this.changeFilter}
            filterValue={"All"}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTask: newTask => {
      const action = {
        type: "ADD-TASK",
        newTask: newTask
      };

      dispatch(action);
    }
  };
};

const ConnectedToDoList = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedToDoList;
