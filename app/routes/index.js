import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, NotFoundRoute } from 'react-router';
import createHistory from 'react-router/node_modules/history/lib/createBrowserHistory';

import App from './App';
import Home from './Home';
import Dashboard from './Dashboard';
import Search from './Search';
import * as Plans from './Plans';
import * as Users from './Users';
//import Dashboard from './Dashboard.jsx';

var history = createHistory();

ReactDOM.render(
  <Router history={history}>
    <Route component={App}>
      <Route path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/join" component={Users.Join} />
      <Route path="/signin" component={Users.SignIn} />
      <Route path="/forgot-password" component={Users.ForgotPassword} />
      <Route path="/reset-password/:token" component={Users.ResetPassword} />
      <Route path="/plans" component={Plans.List} />
      <Route path="/plan/:id" component={Plans.View} />
      <Route path="/users" component={Users.List} />
      <Route path="/user/:id" component={Users.Profile} />
      <Route path="/super-global-dashboard" component={Dashboard} />
      <Route path="/super-global-dashboard/plan/add" component={Plans.Create} />
    </Route>
  </Router>,
  document.getElementById('root')
);
