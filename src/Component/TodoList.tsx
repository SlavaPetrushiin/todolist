import React from "react";
import "./../App.css";
import "./Style/TodoList.css";
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
import {IObjChangeTask, ITask} from "../Redux/interfaces";

interface IProps {
    id : string;
    title : string;
    key : string;
    tasks : Array<ITask>;
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
    createTaskThunkCreator : (newTitleTask: string, todoListId : string) => void;
    deleteTaskThunkCreator : (taskId : string, todoListId : string) => void;
    updateTaskThunkCreator : (updatedTask : ITask, taskId : string, todoListId : string) => void;
}

class ToDoList extends React.Component<IProps & IMapStateToProps & IDispatchStateToProps> {
    componentDidMount() {
        let todoListId = this.props.id;
        this.props.getTasksThunkCreator(todoListId);
    }

    addTask = (newTitleTask : string) => {
        let todoListId = this.props.id;
        this.props.createTaskThunkCreator(newTitleTask, todoListId);
    };

    changeTask = (taskId : string, obj : IObjChangeTask) => {
        let todoListId = this.props.id;
        let changeUserTask = this.props.tasks.find((task: ITask) => task.id === taskId);
        if(changeUserTask) {
            let updateTask = {
                ...changeUserTask,
                ...obj
            };
            this.props.updateTaskThunkCreator(updateTask, taskId, todoListId);
        }
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

    changeTitleList = (newTitleList : string) => {
        let todoListId = this.props.id;
        this.props.updateTitleToDoListThunkCreator(newTitleList, todoListId);
    };

    render() {
        const getFilterTasks = (tasks : Array<ITask>, filter : string) => {
            return tasks.filter((task : ITask) => {
                switch (filter) {
                    case "All":
                        return true;
                    case "Completed":
                        return task.status === 2;
                    case "Active":
                        return task.status === 0;
                }
            });
        };

        let errorMessage = this.props.errorMessage && "Error"; //вывожу ошибку по запросам

        return (
            <div className="wrapper_todoList">
                <div className="todoList">
                    <div className='wrapper_deleted' onClick={this.deleteToDoList}>
                        &#10008;
                    </div>
                    <header className="header">
                        <TodoListTitle
                            title={this.props.title}
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
