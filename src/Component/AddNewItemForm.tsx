import React from "react";
import "./Style/AddNewItemForm.css";
import {TextField} from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import { ControlPoint } from "@material-ui/icons";

interface IProps {
    addItem: Function;
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
            this.setState({error: true});
        } else {
            this.setState({error: false, title: ""});
            this.props.addItem(text);
        }
    };

    handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        let word = event.target.value.trimLeft();
        this.setState({error: false, title: word});
    };

    handleEnter = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            this.onAddItemClick();
        }
    };

    render = () => {
        return (
            <div className="todoList-newTaskForm">
                <TextField
                    variant={"outlined"}
                    label={"Type value"}
                    value={this.state.title}
                    error={this.state.error}
                    onChange={this.handleClick}
                    onKeyPress={this.handleEnter}
                />
                <IconButton
                    onClick={this.onAddItemClick}
                >
                    <ControlPoint />
                </IconButton>
            </div>
        );
    };
}

export default AddNewItemForm;
