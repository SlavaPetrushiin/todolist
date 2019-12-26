import React from "react";
import "./App.css";
import AddNewItemForm from "./AddNewItemForm";
import { connect } from "react-redux";
import ToDoList from "./TodoList";

class App extends React.Component {
  nextListId = 0;

  /*   componentDidMount() {
    this.restoreState();
  } */
  /*   saveState = () => {
    //сохранение стейта а локолстор
    let stateAsString = JSON.stringify(this.state);
    localStorage.setItem("our-state", stateAsString);
  }; */
  /*   restoreState = () => {
    let state = {
      todoLists: []
    };
    let stateAsString = localStorage.getItem("our-state");

    if (stateAsString !== null) {
      state = JSON.parse(stateAsString);
    }

    this.setState(state, () => {
      this.state.todoLists.forEach(list => {
        if (list.id >= this.nextTAskId) {
          this.nextListId = list.id + 1;
        }
      });
    });
  }; */

  addToDoList = text => {
    let newToDolist = { id: this.nextListId + 1, title: text, tasks: [] };
    this.nextListId++;
    this.props.addTodolist(newToDolist);
  };

  render() {
    debugger;
    let todoLists = this.props.todoLists.map(list => (
      <ToDoList
        id={list.id}
        title={list.title}
        key={list.id}
        tasks={list.tasks}
      />
    ));

    return (
      <React.Fragment>
        <AddNewItemForm addItem={this.addToDoList} />
        <div className="App">{todoLists}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoLists: state.todoLists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodolist: newToDolist => {
      const action = {
        type: "ADD-TODOLIST",
        newToDolist: newToDolist
      };

      dispatch(action);
    }
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
