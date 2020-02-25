import React from "react";
import "./Style/TodoListFooter.css";

interface IProps {
    changeFilter: Function;
    filterValue: string;
}


class TodoListFooter extends React.Component<IProps> {
    onAllFilterClick = () => {
        this.props.changeFilter("All");
    };

    onCompletedFilterClick = () => {
        this.props.changeFilter("Completed");
    };

    onActiveFilterClick = () => {
        this.props.changeFilter("Active");
    };

    render = () => {
        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";
        return (
            <div className="todoList-footer">
                <div>
                    <button onClick={this.onAllFilterClick}
                            className={classForAll + ' ' + 'buttonSort' + ' ' + 'buttonSort1'}>
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


            </div>
        );
    };
}

export default TodoListFooter;
