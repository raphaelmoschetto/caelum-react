import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from "./privateRoutes";
import HomePage from './pages/HomePage/index';
import LoginPage from './pages/LoginPage/index';
import NotFoundPage from './pages/NotFoundPage/index';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute path="/" exact component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route component={NotFoundPage} />
            </Switch>
        )
    }
}

export default Routes;