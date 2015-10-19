import React from 'react';
import UserList from '../../components/Users/UserList';
import reactMixin from 'react-mixin';
import {Users} from '../../schemas';
import styles from './list.css';

@reactMixin.decorate(ReactMeteorData)
export default class UserListRoute extends React.Component {

  getMeteorData() {
    let handle = Meteor.subscribe("users");
    return {
      users: Meteor.users.find({}, {sort: {createdAt: -1}}).fetch(),
      loading: !handle.ready()
    };
  }

  render() {
    if (this.data.loading) {
      return (<p>'loading'</p>);
    }
    return (
      <div className={styles.wrapper}>
        <h1>{this.data.users.length} Users</h1>
        <UserList users={this.data.users} />
      </div>
    )
  }
}
