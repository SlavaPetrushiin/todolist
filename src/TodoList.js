import React from "react";
import "./App.css";
import TodoListFooter from "./TodoListFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";

class TodoList extends React.Component {
  state = {
    tasks: [],
    filterValue: "Completed"
  };

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
    this.nextTAskId++;
    let newTasks = [...this.state.tasks, newTask];
    this.setState({ tasks: newTasks }, () => {
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
            tasks={getFilterTasks(this.state.tasks, this.state.filterValue)}
            changeTask={this.changeTask}
          />
          <TodoListFooter
            changeFilter={this.changeFilter}
            filterValue={this.state.filterValue}
          />
        </div>
      </div>
    );
  }
}

export default TodoList;
