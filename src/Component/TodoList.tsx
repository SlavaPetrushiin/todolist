import React from "react";
import "./../App.css";
import TodoListFooter from "./TodoListFooter";
import TodoListTasks from "./TodoListTasks";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";
import AddNewItemForm from "./AddNewItemForm";
import {
    filterTasks,
    createTaskThunkCreator, deleteTaskThunkCreator,
    deleteToDoListThunkCreator,
    getTasksThunkCreator, updateTaskThunkCreator,
    updateTitleToDoListThunkCreator
} from "../Redux/reducer";
import {RootState} from "../Redux/store";

interface IProps {
    id : string;
    title : string;
    key : string;
    tasks : any[];
    filterValue : string;
};

interface IMapStateToProps {
    errorMessage : boolean
}

interface IDispatchStateToProps {
    filterTasks : (newFilterValue : string, todoListId : string) => void;
    deleteToDoListThunkCreator : (todoListId : string) => void;
    updateTitleToDoListThunkCreator : (newTitle : string, todoListId : string) => void;
    getTasksThunkCreator : (todoListId : string) => void;
    createTaskThunkCreator : (newTask : any, todoListId : string) => void;
    deleteTaskThunkCreator : (taskId : string, todoListId : string) => void;
    updateTaskThunkCreator : (updatedTask : any, taskId : string, todoListId : string) => void;
}

class ToDoList extends React.Component<IProps & any & IDispatchStateToProps> {
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


const mapStateToProps = (state : RootState) : IMapStateToProps => {
    return {
        errorMessage: state.todoListsPage.errorMessage
    };
};

const TodoListContainer = connect(
    mapStateToProps,
    {
        filterTasks, deleteToDoListThunkCreator, updateTitleToDoListThunkCreator,
        getTasksThunkCreator, createTaskThunkCreator,  deleteTaskThunkCreator, updateTaskThunkCreator
    }
)(ToDoList);

export default TodoListContainer;
