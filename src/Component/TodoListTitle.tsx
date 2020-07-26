import React from "react";
import "./Style/TodoListTitle.css";
import { Typography, TextField } from "@material-ui/core";

interface IProps {
	title: string;
	changeTitleList: Function;
}

interface IState {
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

	onTitleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		let title = event.currentTarget.value;
		this.setState({ title });
	};

	render() {
		return (
			<div>
				{this.state.addMode ? (
					<TextField
						type="text"
						value={this.state.title}
						onBlur={this.deactivateEditMode}
						onChange={this.onTitleChanged}
						label="Change title"
					/>
				) : (
						<Typography
							onClick={this.activateEditMode}
							variant="h5"
						>
							{this.state.title}
						</Typography>
					)}
			</div>
		);
	}
}

export default TodoListTitle;
