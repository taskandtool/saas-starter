import React, {Component, PropTypes} from 'react';
import reactMixin from 'react-mixin';
import {Users} from '../../schemas';
import UserCard from '../../components/Users/UserCard';
import Spinner from '../../components/Spinner/Spinner';
import UserList from '../../components/Users/UserList';
import styles from './list.css';


@reactMixin.decorate(ReactMeteorData)
export default class UserListRoute extends Component {
  static PropTypes = {
    query: PropTypes.object
  }

  getMeteorData() {
    let handle = Meteor.subscribe("users");
    return {
      users: Meteor.users.find({}, {sort: {createdAt: -1}}).fetch(),
      loading: !handle.ready()
    };
  }

  render() {
    if (this.data.loading) {
      return (<div className={styles.wrapper}><Spinner /></div>);
    }
    
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{this.data.users.length} Users</h1>
        <div className={styles.grid}>
          <div className={styles.list} >
            <UserList users={this.data.users} />
          </div>
        </div>
      </div>
    )
  }
}
