import React from "react";
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
  render = () => {
    const tasksElements = this.props.tasks.map(task => {
      return (
        <TodoListTask
          task={task}
          changeTask={this.props.changeTask}
          todoListId={this.props.todoListId}
        />
      );
    });
    return <div className="todoList-tasks">{tasksElements}</div>;
  };
}

export default TodoListTasks;
