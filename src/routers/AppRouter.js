import React from 'react';
import {Router, Route, Switch, Link, NavLink} from 'react-router-dom';
import { createBrowserHistory } from 'history';   // This allows us to access history outside a component - in this case for the Firebase login in app.js
import DashboardPage from '../components/DashboardPage';
import ErrorPage from '../components/ErrorPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={ history }>
    <div>
      <Switch>
        <PublicRoute exact path='/' component={LoginPage} />
        <PrivateRoute path='/dashboard' component={DashboardPage} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter;


// NOTE: <BrowserRouter> has in-built history, so need to use <Router> to define own history package