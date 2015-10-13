import React, { PropTypes } from 'react';
import moment from 'moment';
import {Link, History} from 'react-router';
import UserCard from './UserCard.js';
import reactMixin from 'react-mixin';

import styles from './userList.css';

export default class UserList extends React.Component {
  static propTypes = {
  }

  render() {
    let users = this.props.users.map((user) => {
      let email = user.emails && user.emails[0].address ? user.emails[0].address : 'None';
      return (
          <UserCard key={user._id}
                  _id={user._id}
                  name={user.profile.name}
                  avatar={user.profile.avatar}
                  createdAt={user.createdAt}
                  email={email}
                  makeClickable={true}
                  />

      );
    })

    //const { _id, createdAt, createdBy, title, monthlyPrice, setupPrice } = user;
    return (
      <div className={styles.wrapper}>
        <h1>{users.length} Users</h1>
        <div className={styles.grid}>
          {users}
        </div>
      </div>
    );
  }
}
