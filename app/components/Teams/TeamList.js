import React, { PropTypes } from 'react';
import TeamCard from './TeamCard.js';

export default class TeamList extends React.Component {
  static propTypes = {
    teams: PropTypes.array.isRequired
  }

  render() {
    let teams = this.props.teams.map((team) => {
      return (
        <div key={team._id} className={this.props.cardStyle} >
          <TeamCard team={team} linkTo={`/team/${team._id}/todos`} />
        </div>
      );
    })

    return (
      <div>
        {teams}
      </div>
    );
  }
}
