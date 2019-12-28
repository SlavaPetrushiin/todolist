import React from "react";
import "./App.css";
import AddNewItemForm from "./Component/AddNewItemForm";
import TodoList from "./Component/TodoList";
import { connect } from "react-redux";

class App extends React.Component {
  nextListId = 0;

  addToDoList = text => {
    let newToDolist = {
      id: this.nextListId + 1,
      title: text,
      tasks: [],
      filterValue: "All"
    };
    this.nextListId++;
    this.props.addTodolist(newToDolist);
  };

  render() {
    let todoLists = this.props.todoLists.map(list => (
      <TodoList
        id={list.id}
        title={list.title}
        key={list.id}
        tasks={list.tasks}
        filterValue={list.filterValue}
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
    todoLists: state.todoListsPage.todoLists
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
