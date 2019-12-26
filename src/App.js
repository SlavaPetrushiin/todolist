import React from "react";
import "./App.css";
import TodoList from "./Component/TodoList";
import AddNewItemForm from "./Component/AddNewItemForm";
import { connect } from "react-redux";

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

  addToDoList = titleNewToDoList => {
    let newToDolist = {
      id: this.nextListId + 1,
      title: titleNewToDoList,
      tasks: []
    };
    this.nextListId++;
    this.props.addToDoList(newToDolist);
  };

  render() {
    let todoLists = this.props.todoLists.map(list => (
      <TodoList
        id={list.id}
        title={list.title}
        key={list.id}
        tasks={list.tasks}
      />
    ));

    return (
      <>
        <AddNewItemForm addItem={this.addToDoList} />
        <div className="App">{todoLists}</div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoLists: state.todoListsPage.todoLists
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addToDoList: newToDoList => {
      const action = {
        type: "ADD-TODOLIST",
        newToDoList: newToDoList
      };
      dispatch(action);
    }
  };
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
