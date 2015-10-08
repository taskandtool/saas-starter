//import styles from './styles.styl';

import React, { PropTypes } from 'react';
import moment from 'moment';
import {Link} from 'react-router';
//import CSSModules from 'react-css-modules';

//@CSSModules(styles)
export default class UserList extends React.Component {
  static propTypes = {
    users: PropTypes.array
  }

  render() {
    let users = this.props.users.map((user) => {
      return (
        <tr key={user._id}>
          <th><Link to={`/user/${user._id}`}>{user._id}</Link></th>
          <th>{moment(user.createdAt).format('MMMM DD, YYYY')}</th>
          <th>{user.profile && user.profile.name ? user.profile.name : ''}</th>
        </tr>
      );
    })

    //const { _id, createdAt, createdBy, title, monthlyPrice, setupPrice } = user;
    return (
      <div styleName="wrapper">
        <h1>User list - {this.props.users.length} Total</h1>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </table>

      </div>
    );
  }
}
