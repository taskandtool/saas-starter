import React from 'react';
import reactMixin from 'react-mixin';
import {Link, History} from 'react-router';
import SignIn from '../../components/Users/SignIn';

@reactMixin.decorate(History)
export default class SignInRoute extends React.Component {
  constructor() {
    super();
    this.state = {errors: {}};
    this.onSubmit = this.onSubmit.bind(this);
    this.logout = this.logout.bind(this);
    Meteor.loginWithPassword = Meteor.loginWithPassword.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const errors = {};

    if (! email) {
      errors.email = 'Email required';
    }

    if (! password) {
      errors.password = 'Password required';
    }

    this.setState({
      errors: errors
    });

    if (! _.isEmpty(errors)) {
      // Form errors found, do not log in
      return;
    }

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        this.setState({
          errors: { 'none': error.reason }
        });

        return;
      }
      this.history.pushState(null, `/`);
    });
  }

  logout() {
    Meteor.logout();
    this.history.pushState(null, `/`);
  }

  render() {
    if (Meteor.user()) {
      return (
        <div>
          <p>You're currently signed in.</p>
          <button onClick={ this.logout } >Logout</button>
        </div>
      )
    }
    return (
      <SignIn onSubmit={this.onSubmit} errors={this.state.errors} />
    )
  }
}
