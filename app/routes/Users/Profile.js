import React, { Component, PropTypes } from 'react';
import UserCard from '../../components/Users/UserCard';
import styles from './profile.css';
import {Link} from 'react-router';
import EditProfile from '../../components/Users/EditProfile';
import Helmet from 'react-helmet';

export default class UserProfileRoute extends Component {
  static propTypes = {
    query: PropTypes.object,
    user: PropTypes.object,
    currUser: PropTypes.object,
    ownsProfile: PropTypes.bool
  }

  constructor() {
    super();
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  render() {
    const {user, ownsProfile, currUser} = this.props;

    //Checks for edit query on route
    const { query } = this.props.location
    const edit = query && query.edit == "true"

    //if id params don't link to a user...
    if (!user) {
      return (
        <div className={styles.wrapper}>No user found at this address</div>
      );
    }

    const email = user.emails && user.emails[user.emails.length - 1].address ? user.emails[user.emails.length - 1].address : 'None@none.com';

    //if user is looking at their own profile and edit query is on on route
    if (edit && ownsProfile) {
      return (
        <EditProfile user={currUser} email={email} />
      )
    }

    //if user doesn't own profile but is trying to edit it...
    if (edit) {
      return (
        <div className={styles.wrapper}>You don't have permission to edit {user.profile.name}'s profile.</div>
      )
    }

    //diplay roles & teams
    let teams = []
    let teamsRoles = []
    if (user) {
      let permissions = user.permissions;
      if (permissions) {
        permissions.map((team, i) => {
          teams.push(<div key={i}><Link to={`/team/${team.teamId}`}>{team.teamName}</Link></div>);
          teamsRoles.push(<div key={i}><strong>{team.teamName}:</strong> <em>{team.roles.join(', ')}</em></div>);
        })
      }
    }

    //see if there's pending team invites.
    let invites
    if (ownsProfile && user.profile.invites) {
      invites = currUser.profile.invites.map((invite, i) => {
        return (
          <div key={i} className={styles.invite}>
            You have been invited by
              <Link to={`user/${invite.inviterId}`} className={styles.link}> {invite.inviterName}</Link> to
              <Link to={`user/${invite.teamId}`} className={styles.link}> {invite.teamName}</Link>
            <p>
              <button
                className={styles.btnAccept}
                onClick={() => this.handleAccept(invite.teamId, invite.teamName, invite.inviterId)}>
                Accept?
              </button>
              <button
                className={styles.btnDecline}
                onClick={() => this.handleDecline(invite.teamId, invite.inviterId)}>
                Decline
              </button>
            </p>
          </div>
        )
      })
    }

    return (
      <div className={styles.wrapper}>

        <Helmet
          title={user.profile.name}
          meta={[
              {"name": "description", "content": user.profile.name + "\'s profile"}
          ]}
        />

        <h1 className={styles.title}>{user.profile.name}</h1>
        <div className={styles.grid}>
          <div className={styles.column}>
            <UserCard
              user={user}
              name={user.profile.name}
              avatar={user.profile.avatar}
              title={user.profile.title}
              bio={user.profile.bio}
              createdAt={user.createdAt}
              email={email} />

              <Link to={`/user/${user._id}/todos`}  >
                <button className={styles.btnTodos}>See Todos</button>
              </Link>
           </div>
           <div className={styles.column}>
            {!_.isEmpty(invites) ?
              <div>
                <h3 className={styles.subtitle}>Pending invites</h3>
                {invites}
              </div>
            : null}
             <h3 className={styles.subtitle}>Teams</h3>
             {_.isEmpty(teams) ?
               <div>
                 Not a member of any teams yet.<br />
                </div>
              :
              <div>
                {teams}
              </div>
              }

             {ownsProfile ?
                <div>
                  <Link to="/teams/add" >
                   <button className={styles.btn}>Create a Team</button>
                  </Link>
                  <h3 className={styles.marginTopSubtitle}>Roles</h3>
                  {_.isEmpty(teamsRoles) ? 'No roles in any teams yet.' : <div>{teamsRoles}</div>}
                  <h3 className={styles.marginTopSubtitle}>Edit Profile</h3>
                  <Link to={`/user/${user._id}`} query={{ edit: true }}  >
                    <button className={styles.btn}>Edit Profile</button>
                  </Link>
                </div>
                : null
              }
           </div>
         </div>
      </div>
    );
  }

  //Accept or decline team invite.
  handleAccept(teamId, teamName, inviterId) {
    //Add user to the team (by adding 'normal' role to team)
    Meteor.call("User.addTeam", 'normal', teamId, teamName);
    //delete invite
    Meteor.call("User.removeTeamInvite", teamId, inviterId);
  }

  handleDecline(teamId, inviterId) {
    Meteor.call("User.removeTeamInvite", teamId, inviterId);
  }
}
