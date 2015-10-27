import React, {Component, PropTypes} from 'react';
import reactMixin from 'react-mixin';
import {Users} from '../../schemas';
import UserCard from '../../components/Users/UserCard';
import Spinner from '../../components/Utils/Spinner';
import UserList from '../../components/Users/UserList';
import styles from './list.css';


@reactMixin.decorate(ReactMeteorData)
export default class UserListRoute extends Component {
  static PropTypes = {
    query: PropTypes.object
  }

  getMeteorData() {
    let handle = Meteor.subscribe("users");
    const { query } = this.props.location;
    const id = query && query.id;
    return {
      users: Meteor.users.find({}, {sort: {createdAt: -1}}).fetch(),
      user: Meteor.users.findOne(id),
      loading: !handle.ready()
    };
  }

  render() {
    if (this.data.loading) {
      return (<div className="wrapper"><Spinner /></div>);
    }
    //for user Preview
    const user = this.data.user;
    const email = user && user.emails && user.emails[0].address ? user.emails[0].address : 'None@none.com';

    return (
      <div className="wrapper">
        <h1 className={styles.title}>{this.data.users.length} Users</h1>
        <div className={styles.grid}>
          <div className={user ? styles.closeList : styles.list} >
            <UserList users={this.data.users} clickPreview={true} />
          </div>
          {user ?
            <div className={styles.card} >
              <UserCard
                user={user}
                name={user.profile.name}
                avatar={user.profile.avatar}
                title={user.profile.title}
                bio={user.profile.bio}
                createdAt={user.createdAt}
                email={email}
                makeClickable={true} />
            </div>
          : null }
        </div>
      </div>
    )
  }
}
