import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import reactMixin from 'react-mixin';
import {History, Link} from 'react-router';
import Icon from '../Icons/Icon.js';
import styles from './teamCard.css';

@reactMixin.decorate(History)
export default class TeamCard extends Component {
  static PropTypes = {
    team: React.PropTypes.object.isRequired
  }

  render() {
    if (!this.props.team) return null;

    let team = this.props.team;

    return (
      <div key={team._id}
        className={styles.container}
        onClick={this.props.linkTo ? () => this.history.push(null, `${this.props.linkTo}`) : null} >
        {team.picture || this.props.picture ?
          <img src={this.props.picture || team.picture} className={styles.picture} />
        : null}
        <div className={styles.info}>
          <h3 className={styles.teamTitle}>{team.name}</h3>
          <p className={styles.desc}><em>{team.desc}</em></p>
        </div>
      </div>
    );
  }
}
