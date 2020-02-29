import React, {Component} from 'react';
import "./Style/LoginForm.css";
import {connect} from "react-redux";
import {authorizationUser} from "../Redux/reducer";

interface IDispatchToProps {
    authorizationUser : (email : string, password : string, rememberMe : boolean) => void;
}

interface IState {
    email : string;
    password : string;
    rememberMe : boolean
}

class LoginForm extends Component<IDispatchToProps> {
    state : IState ={
        email : 'petrushin.vyac@yandex.ru',
        password : '488661632',
        rememberMe : false
    };

    onHandleSubmit = (e : any) => {
        e.preventDefault();
        const {email, password, rememberMe} = this.state;
        this.props.authorizationUser(email, password, rememberMe)
    };

    render() {
        const {email, password} = this.state;
        const disabledBtn = email !== 'petrushin.vyac@yandex.ru' && password !== '488661632';
        return (
            <div className="form-wrap">
                <div className="profile">
                    <div className={'login-photo'}/>
                    <h1>Регистрация</h1>
                </div>
                <form  className={'login-form'} onSubmit={this.onHandleSubmit}>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" placeholder={'free@samuraijs.com'} value={email} required />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required placeholder={'free'} value={password}/>
                    </div>
                    <button type="submit" disabled={disabledBtn}>Отправить</button>
                </form>
            </div>
        );
    };
}

export default connect(null, {authorizationUser})(LoginForm);
