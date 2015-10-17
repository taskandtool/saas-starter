import React from 'react';
import SignIn from '../../components/Users/SignIn';

export default class SignInRoute extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    Meteor.logout();
    this.history.pushState(null, `/`);
  }

  render() {
    if (Meteor.user()) {
      return (
        <div>
          <p>You're currently signed in as {Meteor.user().profile.name}.</p>
          <button onClick={ this.logout } >Logout</button>
        </div>
      )
    }
    return (
      <SignIn />
    )
  }
}
