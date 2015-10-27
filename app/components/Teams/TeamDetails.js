import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import styles from './teamDetails.css';

export default class SingleTeam extends Component {
  static propTypes = {
    team: PropTypes.object
  }

  render() {
    const { team } = this.props;

    const { _id, createdAt, updatedAt, ownerId, name, desc, planId, userCount, todoCount, isDeleted } = team;

    return (
        <ul className={styles.listGroup}>
          <li>{desc}</li>
          <li>There are {userCount} people on this team</li>
          <li>This team has {todoCount} todos</li>
          <li>Created: {moment({createdAt}).format('MMMM DD, YYYY')}</li>
          <li>Updated: {moment({updatedAt}).format('MMMM DD, YYYY')}</li>
          <li>Is Deleted? {isDeleted ? 'True' : 'False'}</li>
          <li>Team ID: {_id}</li>
        </ul>
    );
  }
}
