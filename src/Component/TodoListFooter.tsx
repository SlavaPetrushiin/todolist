import React from "react";
import "./Style/TodoListFooter.css";

interface IProps{
  changeFilter : Function;
  filterValue : string;
}

interface IState{
  isHidden: boolean;
}

class TodoListFooter extends React.Component<IProps, IState> {
  state = {
    isHidden: false
  };

  onAllFilterClick = () => {
    this.props.changeFilter("All");
  };

  onCompletedFilterClick = () => {
    this.props.changeFilter("Completed");
  };

  onActiveFilterClick = () => {
    this.props.changeFilter("Active");
  };

  onShowFiltersClick = () => {
    this.setState({ isHidden: false });
  };

  onHideFiltersClick = () => {
    this.setState({ isHidden: true });
  };

  render = () => {
    let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
    let classForCompleted =
      this.props.filterValue === "Completed" ? "filter-active" : "";
    let classForActive =
      this.props.filterValue === "Active" ? "filter-active" : "";
    return (
      <div className="todoList-footer">
        {!this.state.isHidden && (
          <div>
            <button onClick={this.onAllFilterClick} className={classForAll + ' ' + 'buttonSort' + ' ' + 'buttonSort1'}>
              All
            </button>
            <button
              onClick={this.onCompletedFilterClick}
              className={classForCompleted + ' ' + 'buttonSort' + ' ' + 'buttonSort1'}
            >
              Completed
            </button>
            <button
              onClick={this.onActiveFilterClick}
              className={classForActive + ' ' + 'buttonSort' + ' ' + 'buttonSort1'}
            >
              Active
            </button>
          </div>
        )}

        {!this.state.isHidden && (
          <span onClick={this.onHideFiltersClick}>hide</span>
        )}
        {this.state.isHidden && (
          <span onClick={this.onShowFiltersClick}>show</span>
        )}
      </div>
    );
  };
}

export default TodoListFooter;
