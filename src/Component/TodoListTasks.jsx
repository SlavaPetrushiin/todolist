import React from "react";
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
  render = () => {
    const tasksElements = this.props.tasks.map(task => {
      return (
        <TodoListTask
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
