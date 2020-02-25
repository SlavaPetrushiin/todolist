import React from "react";
import "./Style/TodoListTitle.css";

interface IProps{
  title : string;
  changeTitleList : Function;
}

interface IState{
  addMode: boolean;
  title: string;
}

class TodoListTitle extends React.Component<IProps, IState> {
  state = {
    addMode: false,
    title: this.props.title
  };

  activateEditMode = () => this.setState({ addMode: true });

  deactivateEditMode = () => {
    this.setState({ addMode: false });
    let newTitleList = this.state.title;
    this.props.changeTitleList(newTitleList); //передаю наверх новый тайтл
  };

  onTitleChanged = (event : React.ChangeEvent<HTMLInputElement>) => {
    let title = event.currentTarget.value;
    this.setState({ title });
  };

  render() {
    return (
      <div className="headerTitle">
        {this.state.addMode ? (
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
      </div>
    );
  }
}

export default TodoListTitle;