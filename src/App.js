import React from "react";
import "./App.css";
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";

class App extends React.Component {
  state = {
    todoLists: []
  };

  nextListId = 0;

  componentDidMount() {
    this.restoreState();
  }

  saveState = () => {
    //сохранение стейта а локолстор
    let stateAsString = JSON.stringify(this.state);
    localStorage.setItem("our-state", stateAsString);
  };

  restoreState = () => {
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
  };

  addToDoList = text => {
    let newToDolist = { id: this.nextListId + 1, title: text };
    this.nextListId++;
    this.setState(
      {
        ...this.state,
        todoLists: [...this.state.todoLists, newToDolist]
      },
      () => this.saveState()
    );
  };

  render() {
    let todoLists = this.state.todoLists.map(list => (
      <TodoList id={list.id} title={list.title} key={list.id} />
    ));

    return (
      <>
        <AddNewItemForm addItem={this.addToDoList} />
        <div className="App">{todoLists}</div>
      </>
    );
  }
}

export default App;
