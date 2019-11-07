import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/index';
import LoginPage from './pages/LoginPage/index';

class Routes extends React.Component {
    render() {
        return (
            <Switch>
            <Route path="/" exact={true} component={HomePage} />
            <Route path="/login" component={LoginPage} />
        </Switch>
        )
    }
}

export default Routes;