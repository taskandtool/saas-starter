import React, {propTypes} from 'react';
import JoinBox from '../../components/Users/JoinBox';
import {History} from 'react-router';
import reactMixin from 'react-mixin';

@reactMixin.decorate(History)
export default class JoinComponent extends React.Component {
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
      <JoinBox />
    )
  }
}
