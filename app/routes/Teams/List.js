import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import {Teams} from '../../schemas';
import TeamList from '../../components/Teams/TeamList';
import Spinner from '../../components/Utils/Spinner';
import styles from './list.css';
import {Link} from 'react-router';

@reactMixin.decorate(ReactMeteorData)
export default class TeamListRoute extends Component {

  getMeteorData() {
    let handle = Meteor.subscribe("teams");
    return {
      teams: Teams.find({}, {sort: {createdAt: -1}}).fetch(),
      loading: !handle.ready()
    };
  }

  render() {
    if (this.data.loading) {
      return (<div className="wrapper"><Spinner /></div>);
    }
    let teams = this.data.teams;

    return (
      <div className="wrapper">
        <h1 className="title">{teams.length} Teams</h1>
        <div className={styles.grid}>
          <Link to='/teams/add'>
            <button className={styles.btn}>Create new team</button>
          </Link>
          {teams ?
            <TeamList teams={teams} cardStyle={styles.column} makeClickable={true} />
          : null }
        </div>
      </div>
    );
  }
}
