import React from "react";
import "./App.css";
import AddNewItemForm from "./Component/AddNewItemForm";
import TodoList from "./Component/TodoList";
import { connect } from "react-redux";
import { createToDoListThunkCreator, getToDolistThunkCreator} from "./Redux/reducer";

class App extends React.Component<any> {
  componentDidMount() {
    this.props.getToDolistThunkCreator()
  }

  addToDoList = (title : string) => {
    this.props.createToDoListThunkCreator(title)
  };

  render() {
    let todoLists = this.props.todoLists.map((list: any) => (
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

const mapStateToProps = (state : any) => {
  return {
    todoLists: state.todoListsPage.todoLists
  };
};

const mapDispatchToProps = (dispatch : any) => {
  return {
    getToDolistThunkCreator : () => dispatch(getToDolistThunkCreator()),
    createToDoListThunkCreator: (title : string) => dispatch(createToDoListThunkCreator(title))
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
