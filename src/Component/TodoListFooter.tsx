import React from "react";
import "./Style/TodoListFooter.css";
import {Button} from "@material-ui/core";

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
                <Button
                    onClick={this.onAllFilterClick}
                    variant={classForAll ? 'contained' : 'text'}
                >
                    All
                </Button>
                <Button
                    onClick={this.onCompletedFilterClick}
                    color={"primary"}
                    variant={classForCompleted ? 'contained' : 'text'}
                >
                    Completed
                </Button>
                <Button
                    onClick={this.onActiveFilterClick}
                    color={"secondary"}
                    variant={classForActive ? 'contained' : 'text'}
                >
                    Active
                </Button>
            </div>
        );
    };
}

export default TodoListFooter;
