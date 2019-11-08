import React, { Component, Fragment, createRef } from 'react';
import Cabecalho from '../../components/Cabecalho';
import Widget from '../../components/Widget';

import './loginPage.css'

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            loginError: "",
        };
        this.nameRef = createRef();
        this.passwordRef = createRef();
    }

    fazerLogin = infosDoEvento => {
        infosDoEvento.preventDefault();

        const dadosDeLogin = {
            login: this.nameRef.current.value,
            senha: this.passwordRef.current.value,
        };

        fetch("https://twitelum-api.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosDeLogin)
        }).then(async responseDoServer => {
                if (!responseDoServer.ok) {
                    const respostaDeErroDoServidor = await responseDoServer.json();
                    const errorObj = Error(respostaDeErroDoServidor.message);
                    errorObj.status = responseDoServer.status;
                    throw errorObj;
                }
                return responseDoServer.json();
            }).then(dadosDoServidorEmObj => {
                    const { token } = dadosDoServidorEmObj;
                    if (token) {
                        localStorage.setItem("token", token);
                        this.props.history.push("/");
                    }
                }).catch(err => {
                    this.setState({
                        loginError: err.message,
                    }, () => {
                        setTimeout(() => {
                            this.setState({
                                loginError: "",
                            });
                        }, 3000)
                    })
                });
    }

    render() {
        const { loginError } = this.state;
        return (
            <Fragment>
                <Cabecalho />
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <form className="loginPage__form" onSubmit={(e) => this.fazerLogin(e)}>
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="login">Login</label> 
                                    <input ref={this.nameRef} className="loginPage__input" type="text" id="login" name="login"/>
                                </div>
                                <div className="loginPage__inputWrap">
                                    <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                    <input ref={this.passwordRef} className="loginPage__input" type="password" id="senha" name="senha"/>
                                </div>
                                {loginError && (
                                    <div className="loginPage__errorBox">
                                        {loginError}
                                    </div>
                                )}
                                <div className="loginPage__inputWrap">
                                    <button className="loginPage__btnLogin" type="submit">
                                        Logar
                                    </button>
                                </div>
                            </form>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default LoginPage;