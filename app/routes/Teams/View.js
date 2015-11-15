import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import {Teams} from '../../schemas';
import Spinner from '../../components/Spinner/Spinner';
import TeamCard from '../../components/Teams/TeamCard.js';
import TeamDetails from '../../components/Teams/TeamDetails.js';
import EditTeam from '../../components/Teams/EditTeam.js';
import styles from './view.css';
import {Link} from 'react-router';

@reactMixin.decorate(ReactMeteorData)
export default class TeamViewRoute extends Component {

  static propTypes = {
    params: PropTypes.object,
    query: PropTypes.object
  }

  getMeteorData() {
    let handle = Meteor.subscribe("teams");
    return {
      team: Teams.findOne(this.props.params.teamId),
      loading: !handle.ready()
    };
  }

  render() {
    if (this.data.loading) {
      return (<div className={styles.wrapper}><Spinner /></div>);
    }

    const team = this.data.team;
    if (!team) {
      return (
        <div className={styles.wrapper}>No team found at this address</div>
      );
    }

    const {name, ownerId} = team;

    //Edit params?
    const { query } = this.props.location
    const edit = query && query.edit == "true"

    //Check user's permissions on this team.
    let roles = new Set();
    if (this.props.currentUser) {
      let permissions = this.props.currentUser.permissions;
      if (permissions) {
        permissions.map((permission, i) => {
          if (permission.teamId === this.props.params.teamId) {
            permission.roles.map((role) => {
              roles.add(role)
            })
          }
        })
      }
    }
    // This uses babel ES2015
    // Can use something like roles.has("admin") that returns a boolean
    // Or check if person has any roles with roles.size (if 0, no roles)

    if (edit && roles.has("admin")) {
      return (
        <EditTeam team={team} currentUser={this.props.currentUser} />
      )
    }

    if (edit) {
      return (
        <div className={styles.wrapper}>You don't have permission to edit {team.name} team. (Must be team admin)</div>
      )
    }

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.grid}>
          <div className={styles.column}>
            <TeamCard team={team} />
            <Link to={`/team/${this.props.params.teamId}/todos`}  >
              <button className={styles.btnTodos}>See Todos</button>
            </Link>
            {roles.size > 0 ?
              <span>
                <Link to={`/team/${this.props.params.teamId}/dashboard`}  >
                  <button className={styles.btnDashboard}>Dashboard</button>
                </Link>
                <Link to={`/team/${this.props.params.teamId}/invite`}  >
                  <button className={styles.btnDashboard}>Invite</button>
                </Link>
              </span>
            :
              <p>Must be a member of this team to invite users or see the dashboard</p>
            }
            {this.props.children ?
              React.cloneElement(this.props.children, {
                team: this.data.team
              })
              : null
            }
          </div>
          {roles.has("admin") ?
          <div className={styles.column}>
            <h3 className={styles.subtitle}>More details</h3>
            <TeamDetails team={team} />
             <Link to={`/team/${this.props.params.teamId}`} query={{ edit: true }}  >
               <button className={styles.btn}>Edit Team</button>
             </Link>
             <Link to={`/team/${this.props.params.teamId}/manage-users`}  >
               <button className={styles.btnManage}>Manage Team Users</button>
             </Link>
          </div>
          : null }
        </div>
      </div>
    );
  }
}
