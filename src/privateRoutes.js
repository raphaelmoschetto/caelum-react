import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
    estaAutenticado = () => {
        return !!localStorage.getItem('token');
    }

    render() {
        const { component: Component, ...params } = this.props;
        return this.estaAutenticado() ? <Component {...params} /> : <Redirect to="/login" />
    }
}

export default PrivateRoute;