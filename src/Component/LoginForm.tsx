import React, { Component } from 'react';
import "./Style/LoginForm.css";
import { connect } from "react-redux";
import { authorizationUser } from "../Redux/reducer";
import { Grid, Typography, TextField, Button } from '@material-ui/core';

interface IDispatchToProps {
	authorizationUser: (email: string, password: string, rememberMe: boolean) => void;
}

interface IState {
	email: string;
	password: string;
	rememberMe: boolean
}

class LoginForm extends Component<IDispatchToProps> {
	state: IState = {
		email: 'petrushin.vyac@yandex.ru',
		password: '488661632',
		rememberMe: false
	};

	onHandleSubmit = (e: any) => {
		e.preventDefault();
		const { email, password, rememberMe } = this.state;
		this.props.authorizationUser(email, password, rememberMe)
	};

	render() {
		const { email, password } = this.state;
		const disabledBtn = email !== 'petrushin.vyac@yandex.ru' && password !== '488661632';
		return (
			<Grid
				container
				className="authorization"
			>
				<Grid
					className={"register-bg"}
					item sm={6}
					xs={12}
				>
					<div className={'login-photo'} />
					<Typography variant="h5">Регистрация</Typography>
				</Grid>
				<Grid item sm={6} xs={12}>
					<form className={'login-form'} onSubmit={this.onHandleSubmit}>
						<TextField
							id="outlined-uncontrolled"
							label="Email"
							defaultValue={email}
							type="email"
							className={'login-field'}
						/>
						<TextField
							id="outlined-uncontrolled"
							label="Password"
							defaultValue={password}
							type="password"
							className={'login-field'}
						/>
						<Button
							type="submit" disabled={disabledBtn}
							variant="contained"
							color="primary"
						>
							Отправить
						</Button>
					</form>
				</Grid>
			</Grid>

		);
	};
}

export default connect(null, { authorizationUser })(LoginForm);
