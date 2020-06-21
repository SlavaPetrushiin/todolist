import React from "react";
import "./App.css";
import AddNewItemForm from "./Component/AddNewItemForm";
import TodoList from "./Component/TodoList";
import {connect} from "react-redux";
import {createToDoListThunkCreator, getToDolistThunkCreator} from "./Redux/reducer";
import {RootState} from "./Redux/store";
import {ITodoList} from "./Redux/interfaces";
import LoginForm from "./Component/LoginForm";
import AppBar from "@material-ui/core/AppBar";
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import {Button, IconButton, Toolbar, Typography} from "@material-ui/core";

interface IStateToProps {
  todoLists : Array<ITodoList>;
  authorization : boolean;
}

interface IDispatchToProps {
  getToDolistThunkCreator : () => void;
  createToDoListThunkCreator : (title : string) => void;
}

class App extends React.Component<IStateToProps & IDispatchToProps> {
  componentDidUpdate(prevProps: any, prevState: IStateToProps){
    if(prevProps.authorization !== this.props.authorization ){
      this.props.getToDolistThunkCreator()
    }
  }

  addToDoList = (title : string) => {
    this.props.createToDoListThunkCreator(title)
  };

  render() {
    let todoLists = this.props.todoLists.map((list: ITodoList) => (
      <TodoList
        id={list.id}
        title={list.title}
        key={list.id}
        tasks={list.tasks}
        filterValue={list.filterValue}
      />
    ));

    return (
        <div className={'wrapper'}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">
                TodoList
              </Typography>
              <Button color="inherit">Login</Button>
            </Toolbar>
          </AppBar>

          <Container maxWidth="sm">
            {
              !this.props.authorization ? <LoginForm/> : <>
                <AddNewItemForm addItem={this.addToDoList}/>
                <div className="App">{todoLists}</div>
              </>
            }
          </Container>

        </div>
    );
  }
}

const mapStateToProps = (state : RootState) => {
  return {
    todoLists: state.todoListsPage.todoLists,
    authorization: state.todoListsPage.authorization
  };
};



const ConnectedApp = connect(mapStateToProps, {getToDolistThunkCreator, createToDoListThunkCreator})(App);

export default ConnectedApp;
