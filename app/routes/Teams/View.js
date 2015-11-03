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
      team: Teams.findOne(this.props.params.id),
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

    //Edit permissions?
    let isUser = false;
    if (Meteor.user()) {
      isUser = ownerId == Meteor.user()._id
    }

    if (edit && isUser) {
      return (
        <EditTeam team={team} />
      )
    }

    if (edit) {
      return (
        <div className={styles.wrapper}>You don't have permission to edit {title} team.</div>
      )
    }

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{name}</h1>
        <div className={styles.grid}>
          <div className={styles.column}>
            <TeamCard team={team} />
             <Link to={`/team/${this.props.params.id}/todos`}  >
               <button className={styles.btnTodos}>See Todos</button>
             </Link>
          </div>
          {isUser ?
          <div className={styles.column}>
            <h3 className={styles.subtitle}>More details</h3>
            <TeamDetails team={team} />
             <Link to={`/team/${this.props.params.id}`} query={{ edit: true }}  >
               <button className={styles.btn}>Edit Team</button>
             </Link>
          </div>
          : null }
        </div>
      </div>
    );
  }
}
