import React from "react";

interface IProps {
  addItem : Function;
}

interface IState {
  error: boolean;
  title: string;
}

class AddNewItemForm extends React.Component<IProps, IState> {
  state = {
    error: false,
    title: ""
  };

  onAddItemClick = () => {
    let text = this.state.title;

    if (text === "") {
      this.setState({ error: true });
    } else {
      this.setState({ error: false, title: "" });
      this.props.addItem(text);
    }
  };

  handleClick = (event : React.ChangeEvent<HTMLInputElement>) => {
    let word = event.target.value.trimLeft();
    this.setState({ error: false, title: word });
  };

  handleEnter = (event : React.KeyboardEvent) => {
    if (event.key === "Enter") {
      this.onAddItemClick();
    }
  };

  render = () => {
    let classForInput = this.state.error ? "error" : "";
    return (
      <div className="todoList-newTaskForm">
        <input
          value={this.state.title}
          type="text"
          placeholder="New task name"
          className={classForInput}
          onChange={this.handleClick}
          onKeyPress={this.handleEnter}
        />
        <button onClick={this.onAddItemClick}>Add</button>
      </div>
    );
  };
}

export default AddNewItemForm;
