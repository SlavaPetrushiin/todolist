import React from "react";
import "./../App.css";
import TodoListFooter from "./TodoListFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import AddNewItemForm from "./AddNewItemForm";
import {
    filterTasks, showError,
    createTaskThunkCreator, deleteTaskThunkCreator,
    deleteToDoListThunkCreator,
    getTasksThunkCreator, updateTaskThunkCreator,
    updateTitleToDoListThunkCreator
} from "../Redux/reducer";
import {Dispatch} from "redux";

interface IProps {
    id : string;
    title : string;
    key : string;
    tasks : any[];
    filterValue : string;
    filterTasks : Function;
    showErrorMessage : Function;
    deleteToDoListThunkCreator : Function;
    updateTitleToDoListThunkCreator : Function;
    getTasksThunkCreator : Function;
    createTaskThunkCreator : Function;
    deleteTaskThunkCreator : Function;
    updateTaskThunkCreator : Function;
    errorMessage : string
};

class ToDoList extends React.Component<IProps> {
    componentDidMount() {
        let todoListId = this.props.id;
        this.props.getTasksThunkCreator(todoListId);
    }

    addTask = (newTitleTask : string) => {
        let todoListId = this.props.id;
        this.props.createTaskThunkCreator(newTitleTask, todoListId)
    };

    changeTask = (taskId : string, obj : any) => {
        let todoListId = this.props.id;
        let changeUserTask = this.props.tasks.find((task: any) => task.id === taskId);
        let updateTask = {
            ...changeUserTask,
            ...obj
        };
        this.props.updateTaskThunkCreator(updateTask, taskId, todoListId);
    };

    changeFilter = (newFilterValue : string) => {
        let todoListId = this.props.id;
        this.props.filterTasks(newFilterValue, todoListId);
    };

    deleteTask = (taskId : string) => {
        let todoListId = this.props.id;
        this.props.deleteTaskThunkCreator(taskId, todoListId);
    };

    deleteToDoList = () => {
        let todoListId = this.props.id;
        this.props.deleteToDoListThunkCreator(todoListId);
    };

    changeTitleList = ({title} : any) => {
        let todoListId = this.props.id;
        this.props.updateTitleToDoListThunkCreator(title, todoListId);
    };

    render() {
        const getFilterTasks = (tasks : any, filter : string) => {
            return tasks.filter((task : any) => {
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

        let errorMessage = this.props.errorMessage && "Error"; //вывожу ошибку по запросам

        return (
            <div className="App">
                <div className="todoList">
                    <header className="header">
                        <TodoListTitle
                            title={this.props.title}
                            deleteToDoList={this.deleteToDoList}
                            changeTitleList={this.changeTitleList}
                        />
                        <AddNewItemForm addItem={this.addTask}/>
                    </header>
                    <TodoListTasks
                        tasks={getFilterTasks(this.props.tasks, this.props.filterValue)}
                        changeTask={this.changeTask}
                        deleteTask={this.deleteTask}
                    />
                    <TodoListFooter
                        changeFilter={this.changeFilter}
                        filterValue={this.props.filterValue}
                    />
                </div>
                {errorMessage}
            </div>
        );
    }
}

const mapStateToProps = (state : any) => {
    return {
        errorMessage: state.todoListsPage.errorMessage
    };
};


interface IMapDispatchToProps  {
    filterTasks : (newFilterValue : string, todoListId : string) => void;
    showErrorMessage : () => void;
    deleteToDoListThunkCreator : (todoListId : string) => void;
    updateTitleToDoListThunkCreator : (newTitle : string, todoListId : string) => void;
    getTasksThunkCreator : (todoListId : string) => void;
    createTaskThunkCreator : (newTask : any, todoListId : string) => void;
    deleteTaskThunkCreator : (taskId : any, todoListId : string) => void;
    updateTaskThunkCreator : (updatedTask : any, taskId : string, todoListId : string) => void;
}


const mapDispatchToProps = (dispatch : Dispatch) : IMapDispatchToProps => {//Не забудь проработать!!!!!
    return {
        filterTasks: (newFilterValue, todoListId) => {
            dispatch(filterTasks(newFilterValue, todoListId));
        },
        showErrorMessage: () => {
            dispatch(showError());
        },
        deleteToDoListThunkCreator: (todoListId) => {
            dispatch(deleteToDoListThunkCreator(todoListId))
        },
        updateTitleToDoListThunkCreator: (newTitle, todoListId) => {
            dispatch(updateTitleToDoListThunkCreator(newTitle, todoListId))
        },
        getTasksThunkCreator: (todoListId ) => {
            dispatch(getTasksThunkCreator(todoListId));
        },
        createTaskThunkCreator: (newTask, todoListId) => {
            dispatch(createTaskThunkCreator(newTask, todoListId));
        },
        deleteTaskThunkCreator: (taskId, todoListId) => {
            dispatch(deleteTaskThunkCreator(taskId, todoListId));
        },
        updateTaskThunkCreator: (updatedTask, taskId, todoListId) => {
            dispatch(updateTaskThunkCreator(updatedTask, taskId, todoListId));
        }
    };
};

const TodoListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ToDoList);

export default TodoListContainer;
