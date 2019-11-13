import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const NotFoundPage = ({ location }) => {
    return (
        <Fragment>
            <Header />
            <div className="loginPage">
                <div className="container">
                    A URL <strong>{location.pathname}</strong> não existe no Twitelum. <br />Se quiser voltar para a Página Inicial <Link to="/">clique aqui</Link>
                </div>
            </div>
        </Fragment>
    );
}

export default NotFoundPage;