import React from "react";

class TodoListTask extends React.Component {
  state = {
    aditMode: false,
    title: this.props.task.title
  };

  activeEditMode = () => {
    //активация поля ввода на таске
    this.setState({ aditMode: true });
  };

  deactivateEditMode = () => {
    //деактивация поля ввода на таске
    this.setState({ aditMode: false });
    this.props.changeTask(this.props.task.id, { title: this.state.title });
  };

  //изменение чекбокса
  onIsDoneChanged = event => {
    let status = event.currentTarget.checked ? 2 : 0;
    this.props.changeTask(
      this.props.task.id, //id таски
      { status }
    );
  };

  //изменение глобальной таски по изменению инпута
  onTitleChanged = event => {
    let title = event.currentTarget.value;
    this.setState({ title });
    //this.props.changeTask(this.props.task.id, { title: title });
  };
  handleDeleteTask = event => {
    this.props.deleteTask(this.props.task.id);
  };

  render = () => {
    let status = this.props.task.status === 2 ? true : false;
    let classForTask = status ? "done" : "";
    return (
      <div className="todoList-task">
        <input
          type="checkbox"
          checked={status}
          onChange={this.onIsDoneChanged}
          className={classForTask}
        />
        {this.state.aditMode ? (
          <input
            type="text"
            value={this.state.title}
            autoFocus={true}
            onBlur={this.deactivateEditMode}
            onChange={this.onTitleChanged}
          />
        ) : (
          <span className={classForTask} onClick={this.activeEditMode}>
            {this.state.title},{this.props.task.priority}
          </span>
        )}
        <span style={{ color: "red" }} onClick={this.handleDeleteTask}>
          &#10008;
        </span>
      </div>
    );
  };
}

export default TodoListTask;
