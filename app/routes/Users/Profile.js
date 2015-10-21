import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import {Users} from '../../schemas';
import EditUserImages from '../../components/Users/EditUserImages';
import EditUserInfo from '../../components/Users/EditUserInfo';
import UserCard from '../../components/Users/UserCard';
import styles from './profile.css';
import {Link} from 'react-router'

@reactMixin.decorate(ReactMeteorData)
export default class UserProfileRoute extends Component {
  static propTypes = {
    params: PropTypes.object
  }

  constructor() {
    super();
  }

  getMeteorData() {
    let handle = Meteor.subscribe("users");
    return {
      loading: !handle.ready(),
      user: Meteor.users.findOne(this.props.params.id)
    };
  }

  render() {
    if (this.data.loading) {
      return (
        <div>Loading</div>
      );
    }

    const user = this.data.user;
    const createdAt = user.createdAt;
    const email = user.emails && user.emails[0].address ? user.emails[0].address : 'None@none.com';


    let canEdit = false;
    if (Meteor.user()){
      canEdit = this.data.user._id == Meteor.user()._id
    }

    return (
      <div className="wrapper">
        <h1 className="title">{user.profile.name}</h1>
        <div className={styles.grid}>
          <div className={styles.column}>
            <UserCard
              user={user}
              name={user.profile.name}
              avatar={user.profile.avatar}
              role={user.profile.role}
              bio={user.profile.bio}
              createdAt={user.createdAt}
              email={email}
               />
           </div>
           <div className={styles.column}>
             <h1>More details</h1>
             <p>ie. Member of these teams:</p>
           </div>
         </div>

        {canEdit ? <Link to={`/user/${this.props.params.id}/edit`} ><button>Edit Profile</button></Link> : null }

      </div>
    );
  }
}
