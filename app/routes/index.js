import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, NotFoundRoute } from 'react-router';
import createHistory from 'react-router/node_modules/history/lib/createBrowserHistory';

import App from './App';
import Home from './Home';
import Docs from './Docs';
import Dashboard from './Dashboard';
import Search from './Search';
import * as Plans from './Plans';
import * as Users from './Users';
import * as Teams from './Teams';
import * as Todos from './Todos';

import NotFoundPage from './NotFoundPage';

var history = createHistory();

Meteor.startup(function () {
  ReactDOM.render(
    <Router history={history}>
      <Route component={App}>
        <Route path="/" component={Home} name="Develop Saas Apps Fast" />
        <Route path="docs" component={Docs} name="Docs" />
        <Route path="search" component={Search} name="Search" />
        <Route path="join" component={Users.Join} name="Get Started" />
        <Route path="signin" component={Users.SignIn} name="Sign In" />
        <Route path="forgot-password" component={Users.ForgotPassword} name="Forgot Password" />
        <Route path="reset-password/:token" component={Users.ResetPassword} name="Reset Password" />
        <Route path="plans" component={Plans.List} name="Plans" />
        <Route path="plan/:planId" component={Plans.View} name="Plan Details" back="/plans" />
        <Route path="teams" component={Teams.List} name="Teams" />
        <Route path="teams/add" component={Teams.Create} name="Create New Team" back="/teams" />
        <Route path="team/:teamId" component={Teams.View} name="Team Details" back="/teams" >
          <Route path="/team/:teamId/invite" component={Teams.InviteUsers} name="Invite Users" back="/teams" />
          <Route path="/team/:teamId/manage-users" component={Teams.ManageUsers} name="Manage Users" back="/teams" />
        </Route>
        <Route path="team/:teamId/dashboard" component={Teams.Dashboard} name="Team Dashboard" back="/teams" />
        <Route path="team/:teamId/todos" component={Todos.TeamTodoList} name="Todos" />
        <Route path="users" component={Users.List} name="Users" />
        <Route path="user/:id" component={Users.Profile} name="User Profile" back="/users" />
        <Route path="user/:id/todos" component={Todos.UserTodoList} name="Todos" />
        <Route path="super-global-dashboard" component={Dashboard} name="Dashboard" />
        <Route path="super-global-dashboard/plan/add" component={Plans.Create} name="Create New Plan" back="/plans" />
        <Route path="*" component={NotFoundPage} />
      </Route>
    </Router>,
    document.getElementById('root')
  );
});
