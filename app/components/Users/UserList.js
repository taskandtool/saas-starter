import React, { PropTypes } from 'react';
import moment from 'moment';
import {Link, History} from 'react-router';
import UserCard from './UserCard.js';

import styles from './userList.css';

export default class UserList extends React.Component {
  static propTypes = {
  }

  render() {
    let users = this.props.users.map((user) => {
      let email = user.emails && user.emails[0].address ? user.emails[0].address : 'None@none.com';
      return (
        <div className={styles.column} key={user._id}>
          <UserCard
              _id={user._id}
              name={user.profile.name}
              avatar={user.profile.avatar}
              role={user.profile.role}
              bio={user.profile.bio}
              createdAt={user.createdAt}
              email={email}
              makeClickable={true}
              />

        </div>
      );
    })

    return (
        <div className={styles.grid}>
          {users}
        </div>
    );
  }
}
