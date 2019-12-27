import React from "react";
import "./../App.css";
import TodoListFooter from "./TodoListFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";
import { connect } from "react-redux";
import AddNewItemForm from "./AddNewItemForm";

class ToDoList extends React.Component {
  state = {
    filterValue: "Completed"
  };

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
    debugger;
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

  changeTask = (taskId, obj, todoListId) => {
    this.props.changeTask(taskId, obj, todoListId);
    /*     let newTasks = this.props.tasks.map(task => {
      if (task.id !== taskId) return task;
      else {
        return { ...task, ...obj };
      }
    });
    this.setState({ tasks: newTasks }, () => {
      this.saveState();
    }); */
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
            tasks={getFilterTasks(this.props.tasks, this.state.filterValue)}
            changeTask={this.changeTask}
            todoListId={this.props.id} //Уточнить, можно ли так прокидывать???
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
    }
  };
};

const TodoListContainer = connect(null, mapDispatchToProps)(ToDoList);

export default TodoListContainer;
