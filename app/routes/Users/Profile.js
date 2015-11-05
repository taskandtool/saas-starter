import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import {Users} from '../../schemas';
import UserCard from '../../components/Users/UserCard';
import styles from './profile.css';
import {Link} from 'react-router';
import Spinner from '../../components/Spinner/Spinner';
import EditProfile from '../../components/Users/EditProfile';
import Helmet from 'react-helmet';

@reactMixin.decorate(ReactMeteorData)
export default class UserProfileRoute extends Component {
  static propTypes = {
    params: PropTypes.object,
    query: PropTypes.object
  }

  constructor() {
    super();
    this.handleAccept = this.handleAccept.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
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
        <div className={styles.wrapper}><Spinner /></div>
      );
    }

    const {id} = this.props.params
    const user = this.data.user;

    //Checks for edit params on route
    const { query } = this.props.location
    const edit = query && query.edit == "true"

    //checks if user owns profile
    let isUser = false;
    if (Meteor.user()){
      isUser = id == Meteor.user()._id
    }

    if (!user) {
      return (
        <div className={styles.wrapper}>No user found at this address</div>
      );
    }

    const email = user.emails && user.emails[0].address ? user.emails[0].address : 'None@none.com';

    if (edit && isUser) {
      return (
        <EditProfile user={user} email={email} />
      )
    }

    if (edit) {
      return (
        <div className={styles.wrapper}>You don't have permission to edit {user.profile.name}'s profile.</div>
      )
    }

    //get roles & teams
    let teams = []
    let teamsRoles = []
    if (this.props.currentUser) {
      let permissions = this.props.currentUser.permissions;
      if (permissions) {
        permissions.map((team, i) => {
          teams.push(<div key={i}><Link to={`/team/${team.teamId}`}>{team.teamName}</Link></div>);
          teamsRoles.push(<div key={i}><strong>{team.teamName}:</strong> <em>{team.roles}</em></div>);
        })
      }
    }



    //see if there's pending invites
    let invites
    if (user.profile.invites) {
      invites = user.profile.invites.map((invite, i) => {
        return (
          <div key={i} className={styles.invite}>
            You've been invited by
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

              <Link to={`/user/${this.props.params.id}/todos`}  >
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
                 {isUser ?
                   <Link to="/teams/add" >
                    <button className={styles.btn}>Create a Team</button>
                   </Link>
                  : null
                 }
                </div>
              : <div>{teams}</div>
              }

             {isUser ?
                <div>
                  <h3 className={styles.marginTopSubtitle}>Roles</h3>
                  {_.isEmpty(teamsRoles) ? 'No roles in any teams yet.' : <div>{teamsRoles}</div>}
                  <h3 className={styles.marginTopSubtitle}>Edit Profile</h3>
                  <Link to={`/user/${this.props.params.id}`} query={{ edit: true }}  >
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

  handleAccept(teamId, teamName, inviterId) {
    //Add user to the team (by adding 'normal' role to team)
    Meteor.call("User.addTeam", 'normal', teamId, teamName);

    //Delete invite
    Meteor.call("User.removeTeamInvite", teamId, inviterId);
  }

  handleDecline(teamId, inviterId) {
    //Delete invite
    Meteor.call("User.removeTeamInvite", teamId, inviterId);
  }
}
