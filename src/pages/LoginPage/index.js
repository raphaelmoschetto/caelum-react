import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho';
import Widget from '../../components/Widget';
import FormManager from '../../components/FormManager';
import InputFormField from '../../components/InputFormField';

import './loginPage.css'
import { LoginService } from './loginService';
import { NotificationContext } from '../../contexts/NotificationContext';

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            values: {
                inputLogin: '',
                inputPassword: '',
            },
            errors: {},
        };
    }

    formValidations = values => {
        const errors = {};
        if (!values.inputLogin) {
            errors.inputLogin = "Esse campo é obrigatório";
        }
        if (!values.inputPassword) {
            errors.inputPassword = "Esse campo é obrigatório";
        }
        return errors;
    }

    fazerLogin = (infosDoEvento, values) => {
        infosDoEvento.preventDefault();

        const dadosDeLogin = {
            login: values.inputLogin,
            senha: values.inputPassword,
        };

        LoginService.logar(dadosDeLogin)
            .then(() => {
                this.context.setMsg("Bem vindo ao Twitelum, login feito com sucesso!");
                this.props.history.push("/");
            })
            .catch(err => {
                this.context.setMsg(err.message);
            });
    }

    static contextType = NotificationContext;

    render() {
        return (
            <Fragment>
                <Cabecalho />
                <div className="loginPage">
                    <div className="container">
                        <Widget>
                            <h2 className="loginPage__title">Seja bem vindo!</h2>
                            <FormManager
                                initialValues={{ inputLogin: "", inputPassword: "" }}
                                onFormValidation={this.formValidations}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    onFormFieldChange,
                                    onFormFieldBlur,
                                }) => (
                                    <form className="loginPage__form" onSubmit={(e) => this.fazerLogin(e, values)}>
                                        <InputFormField
                                            id="inputLogin"
                                            label="Login: "
                                            onChange={onFormFieldChange}
                                            onBlur={onFormFieldBlur}
                                            value={values}
                                            error={errors}
                                            touched={touched}
                                        />
                                        <InputFormField
                                            id="inputPassword"
                                            label="Senha: "
                                            type="password"
                                            onChange={onFormFieldChange}
                                            onBlur={onFormFieldBlur}
                                            value={values}
                                            error={errors}
                                            touched={touched}
                                        />
                                        <div className="loginPage__inputWrap">
                                            <button className="loginPage__btnLogin" type="submit">
                                                Logar
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </FormManager>
                        </Widget>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default LoginPage;