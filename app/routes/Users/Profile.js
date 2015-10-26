import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import {Users} from '../../schemas';
import UserCard from '../../components/Users/UserCard';
import styles from './profile.css';
import {Link} from 'react-router';
import Spinner from '../../components/Utils/Spinner';
import EditProfile from '../../components/Users/EditProfile';

@reactMixin.decorate(ReactMeteorData)
export default class UserProfileRoute extends Component {
  static propTypes = {
    params: PropTypes.object,
    query: PropTypes.object
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
        <div className="wrapper"><Spinner /></div>
      );
    }

    const {id} = this.props.params
    const user = this.data.user;

    //Checks for edit params and permissions
    const { query } = this.props.location
    const edit = query && query.edit == "true"
    let canEdit = false;
    if (Meteor.user()){
      canEdit = id == Meteor.user()._id
    }

    if (!user) {
      return (
        <div className="wrapper">No user found at this address</div>
      );
    }

    const email = user.emails && user.emails[0].address ? user.emails[0].address : 'None@none.com';

    if (edit && canEdit) {
      return (
        <EditProfile user={user} email={email} />
      )
    }

    if (edit) {
      return (
        <div className="wrapper">You don't have permission to edit {user.profile.name}'s profile.</div>
      )
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
              email={email} />
           </div>
           <div className={styles.column}>
             <h1>More details</h1>
             <p>ie. Member of these teams:</p>
             {canEdit ?
              <Link to={`/user/${this.props.params.id}`} query={{ edit: true }}  >
                <button className={styles.btn}>Edit Profile</button>
              </Link>
              : null }
           </div>
         </div>
      </div>
    );
  }
}
