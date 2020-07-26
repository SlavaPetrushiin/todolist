import React from "react";
import { ITask } from "../Redux/interfaces";
import { IconButton, Checkbox, TextField } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import "./Style/TodoList.css";

interface IProps {
	key: string;
	task: ITask;
	changeTask: Function;
	deleteTask: Function;
};

interface IState {
	addMode: boolean;
	title: string;
}


class TodoListTask extends React.Component<IProps, IState> {
	state = {
		addMode: false,
		title: this.props.task.title
	};

	activeEditMode = () => {
		//активация поля ввода на таске
		this.setState({ addMode: true });
	};

	deactivateEditMode = () => {
		//деактивация поля ввода на таске
		this.setState({ addMode: false });
		this.props.changeTask(this.props.task.id, { title: this.state.title });
	};

	//изменение чекбокса
	onIsDoneChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		let status = event.currentTarget.checked ? 2 : 0;
		this.props.changeTask(
			this.props.task.id, //id таски
			{ status }
		);
	};

	//изменение глобальной таски по изменению инпута
	onTitleChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
		let title = event.currentTarget.value;
		this.setState({ title });
	};

	handleDeleteTask = () => {
		this.props.deleteTask(this.props.task.id);
	};

	handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		let priority;
		switch (event.target.value) {
			case "Low":
				priority = 0;
				break;
			case "Middle":
				priority = 1;
				break;
			case "Hi":
				priority = 2;
				break;
			case "Urgently":
				priority = 3;
				break;
			case "Later":
				priority = 4;
				break;
		}
		this.props.changeTask(
			this.props.task.id, //id таски
			{ priority }
		);
	}

	render = () => {
		let status = this.props.task.status === 2 ? true : false;
		let classForTask = status ? "done" : "";
		let priority;
		switch (this.props.task.priority) {
			case 0:
				priority = "Low";
				break;
			case 1:
				priority = "Middle";
				break;
			case 2:
				priority = "Hi";
				break;
			case 3:
				priority = "Urgently";
				break;
			case 4:
				priority = "Later";
				break;
		}

		return (
			<div className="todoList-task">
				<div>
					<Checkbox
						onChange={this.onIsDoneChanged}
						checked={!!classForTask}
					/>
					{this.state.addMode ? (
						<TextField
							value={this.state.title}
							autoFocus={true}
							onBlur={this.deactivateEditMode}
							onChange={this.onTitleChanged}
						/>
					) : (
							<>
								<span className={classForTask + ' ' + 'my-flex-box'} onClick={this.activeEditMode}>
									{this.state.title}, {priority}
								</span>
								<select value={priority} onChange={this.handleChangeSelect} className={'my-flex-box'}>
									<option value="Low">Low</option>
									<option value="Middle">Middle</option>
									<option selected value="Hi">Hi</option>
									<option value="Urgently">Urgently</option>
									<option value="Later">Later</option>
								</select>
							</>
						)}
				</div>
				<IconButton onClick={this.handleDeleteTask}>
					<Delete />
				</IconButton>
			</div>
		);
	};
}

export default TodoListTask;
