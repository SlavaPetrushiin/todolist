import React from "react";
import "./App.css";
import AddNewItemForm from "./Component/AddNewItemForm";
import TodoList from "./Component/TodoList";
import { connect } from "react-redux";
import { addTodolist } from "./Redux/reducer";
import axios from "axios";
import { setToDoList } from "./Redux/reducer";

class App extends React.Component {
  componentDidMount() {
    this.restoreState().then(response => {
      this.props.setToDoList(response);
    });
  }

  restoreState() {
    //запрос всех тудулистов с сервера
    return axios
      .get("https://social-network.samuraijs.com/api/1.1/todo-lists", {
        withCredentials: true,
        headers: { "API-KEY": "4f784e15-0555-4b7d-a7c1-c9d2f74d92fa" }
      })
      .then(response => response.data);
  }

  nextListId = 0;

  addToDoList = text => {
    axios
      .post(
        "https://social-network.samuraijs.com/api/1.1/todo-lists",
        { title: text },
        {
          withCredentials: true,
          headers: { "API-KEY": "4f784e15-0555-4b7d-a7c1-c9d2f74d92fa" }
        }
      )
      .then(response => {
        let todoList = response.data.data.item;
        this.props.addTodolist(todoList);
      });
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
    addTodolist: newToDolist => dispatch(addTodolist(newToDolist)),
    setToDoList: todoLists => dispatch(setToDoList(todoLists))
  };
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
