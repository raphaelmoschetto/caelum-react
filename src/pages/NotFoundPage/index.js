import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Cabecalho from '../../components/Cabecalho';

const NotFoundPage = ({ location }) => {
    console.log(location);
    return (
        <Fragment>
            <Cabecalho />
            <div className="loginPage">
                <div className="container">
                    A URL <strong>{location.pathname}</strong> não existe no Twitelum. <br />Se quiser voltar para a Página Inicial <Link to="/">clique aqui</Link>
                </div>
            </div>
        </Fragment>
    );
}

export default NotFoundPage;