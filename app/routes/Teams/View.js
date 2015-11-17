import React, { Component, PropTypes } from 'react';
import TeamCard from '../../components/Teams/TeamCard.js';
import TeamDetails from '../../components/Teams/TeamDetails.js';
import EditTeam from '../../components/Teams/EditTeam.js';
import styles from './view.css';
import {Link} from 'react-router';

export default class TeamViewRoute extends Component {

  static propTypes = {
    query: PropTypes.object
  }

  render() {
    const {team} = this.props;

    if (!team) {
      return (
        <div className={styles.wrapper}>No team found at this address</div>
      );
    }

    const {name, ownerId, _id} = team;

    //Edit params?
    const { query } = this.props.location
    const edit = query && query.edit == "true"

    if (edit && this.props.teamRoles.includes("admin")) {
      return (
        <EditTeam team={team} currUser={this.props.currUser} />
      )
    }

    if (edit) {
      return (
        <div className={styles.wrapper}>You do not have permission to edit {name} team. (Must be team admin)</div>
      )
    }

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.grid}>
          <div className={styles.column}>
            <TeamCard team={team} />
            <Link to={`/team/${_id}/todos`}  >
              <button className={styles.btnTodos}>See Todos</button>
            </Link>
            {this.props.teamRoles.length > 0 ?
              <span>
                <Link to={`/team/${_id}/dashboard`}  >
                  <button className={styles.btnDashboard}>Dashboard</button>
                </Link>
                <Link to={`/team/${_id}/invite`}  >
                  <button className={styles.btnDashboard}>Invite</button>
                </Link>
              </span>
            :
              <p>Must be a member of this team to invite users or see the dashboard</p>
            }
            {this.props.children ?
              React.cloneElement(this.props.children, {
                team: team
              })
              : null
            }
          </div>
          {this.props.teamRoles.includes("admin") ?
          <div className={styles.column}>
            <h3 className={styles.subtitle}>More details</h3>
            <TeamDetails team={team} />
             <Link to={`/team/${_id}`} query={{ edit: true }}  >
               <button className={styles.btn}>Edit Team</button>
             </Link>
             <Link to={`/team/${_id}/manage-users`}  >
               <button className={styles.btnManage}>Manage Team Users</button>
             </Link>
          </div>
          : null }
        </div>
      </div>
    );
  }
}
