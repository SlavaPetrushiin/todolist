import React from "react";

function TodoListTitle(props) {
  let handleDeleteList = () => {
    debugger;
    props.deleteToDoList();
  };
  return (
    <div className="headerTitle">
      <h3 className="todoList-header__title">{props.title}</h3>
      <span style={{ color: "red" }} onClick={handleDeleteList}>
        &#10008;
      </span>
    </div>
  );
}

export default TodoListTitle;
