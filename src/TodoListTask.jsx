import React from "react";

class TodoListTask extends React.Component {
  state = {
    aditMode: false
  };

  activeEditMode = () => {
    //активация поля ввода на таске
    this.setState({ aditMode: true });
  };

  deactivateEditMode = () => {
    //деактивация поля ввода на таске
    this.setState({ aditMode: false });
  };

  //изменение чекбокса
  onIsDoneChanged = event => {
    let isDone = event.currentTarget.checked;
    this.props.changeTask(this.props.task.id, { isDone: isDone });
  };

  //изменение глобальной таски по изменению инпута
  onTitleChanged = event => {
    let title = event.currentTarget.value;
    this.props.changeTask(this.props.task.id, { title: title });
  };

  render = () => {
    let classForTask = this.props.task.isDone ? "todoList-task done" : "";
    return (
      <div className="todoList-task">
        <input
          type="checkbox"
          checked={this.props.task.isDone}
          onChange={this.onIsDoneChanged}
          className={classForTask}
        />
        {this.state.aditMode ? (
          <input
            type="text"
            value={this.props.task.title}
            autoFocus={true}
            onBlur={this.deactivateEditMode}
            onChange={this.onTitleChanged}
          />
        ) : (
          <span className={classForTask} onClick={this.activeEditMode}>
            {this.props.task.id} - {this.props.task.title},
            {this.props.task.priority}
          </span>
        )}
      </div>
    );
  };
}

export default TodoListTask;
