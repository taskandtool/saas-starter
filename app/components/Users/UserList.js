import React, { PropTypes } from 'react';
import UserItem from './UserItem.js';

export default class UserList extends React.Component {
  static propTypes = {
    users: React.PropTypes.array
  }

  render() {
    let users = this.props.users.map((user) => {
      let email = user.emails && user.emails[0].address ? user.emails[0].address : 'None@none.com';
      return (
        <UserItem
          key={user._id}
          _id={user._id}
          name={user.profile.name}
          avatar={user.profile.avatar}
          clickPreview={this.props.clickPreview} />
      );
    })

    return (
      <div>
        {users}
      </div>
    );
  }
}
