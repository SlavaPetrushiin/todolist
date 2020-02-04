import React from "react";
import TodoListTask from "./TodoListTask";
import {ITask} from "../Redux/interfaces";

interface IProps{
  tasks: Array<ITask>;
  changeTask : Function;
  deleteTask : Function;
};

class TodoListTasks extends React.Component<IProps> {
  render = () => {
    const tasksElements = this.props.tasks.map((task : ITask) => {
      return (
        <TodoListTask
          key={task.id}
          task={task}
          changeTask={this.props.changeTask}
          deleteTask={this.props.deleteTask}
        />
      );
    });
    return tasksElements.length !== 0 ? (
      <div className="todoList-tasks">{tasksElements}</div>
    ) : null;
  };
}

export default TodoListTasks;
