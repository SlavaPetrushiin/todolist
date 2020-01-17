import React from "react";

class TodoListTitle extends React.Component {
  state = {
    aditMode: false,
    title: this.props.title
  };

  handleDeleteList = () => {
    this.props.deleteToDoList();
  };

  activateEditMode = () => this.setState({ aditMode: true });

  deactivateEditMode = () => {
    this.setState({ aditMode: false });
    this.props.changeTitleList({ title: this.state.title }); //передаю наверх новый тайтл
  };

  onTitleChanged = event => {
    let title = event.currentTarget.value;
    this.setState({ title });
  };

  render() {
    return (
      <div className="headerTitle">
        {this.state.aditMode ? (
          <input
            type="text"
            value={this.state.title}
            onBlur={this.deactivateEditMode}
            onChange={this.onTitleChanged}
          />
        ) : (
          <h3
            className="todoList-header__title"
            onClick={this.activateEditMode}
          >
            {this.state.title}
          </h3>
        )}

        <span style={{ color: "red" }} onClick={this.handleDeleteList}>
          &#10008;
        </span>
      </div>
    );
  }
}

export default TodoListTitle;
