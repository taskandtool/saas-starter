import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import {Users} from '../../schemas';
import Spinner from '../../components/Spinner/Spinner';
import styles from './manageUsers.css';
import Icon from '../../components/Icons/Icon.js';

@reactMixin.decorate(ReactMeteorData)
export default class ManageUsersRoute extends Component {

  constructor() {
    super();
    this.handleAddRole = this.handleAddRole.bind(this);
    this.handleRemoveRole = this.handleRemoveRole.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
    this.state = {
      success: false
    }
  }

  getMeteorData() {
    let handle = Meteor.subscribe("users.belongingToTeam", this.props.team._id);
    return {
      users: Users.find({'permissions.teamId': this.props.team._id }).fetch(),
      loading: !handle.ready()
    };
  }

  render() {
    if (this.data.loading) {
      return (<div className={styles.wrapper}><Spinner /></div>);
    }

    const {name, _id} = this.props.team;

    let users = this.data.users.map((user) => {
      return (
        <div key={user._id} className={styles.item}>
          {user.profile.name} <em>{user.profile.title}</em><br />

          {user.permissions.map((team, i) => {
            if (team.teamId === this.props.team._id) {
              return (
                <div key={i}>
                  Roles:<br/>
                  {team.roles.includes('admin') ?
                    <div>
                      <Icon size="1.2em" icon="check" color='green' onClick={() => this.handleRemoveRole(user._id, 'admin')} />
                      Admin
                    </div>
                    :
                    <div><Icon size="1.2em" icon="check" color='#ddd' onClick={() => this.handleAddRole(user._id, 'admin')} /> Admin</div>
                  }

                  {team.roles.includes('normal') ?
                    <div><Icon size="1.2em" icon="check" color='green' onClick={() => this.handleRemoveRole(user._id, 'normal')} /> Normal</div>
                    :
                    <div><Icon size="1.2em" icon="check" color='#ddd' onClick={() => this.handleAddRole(user._id, 'normal')} /> Normal</div>
                  }

                  {team.roles.includes('secret') ?
                    <div><Icon size="1.2em" icon="check" color='green' onClick={() => this.handleRemoveRole(user._id, 'secret')} /> Secret</div>
                    :
                    <div><Icon size="1.2em" icon="check" color='#ddd' onClick={() => this.handleAddRole(user._id, 'secret')} /> Secret</div>
                  }

                </div>
              )
            }
          })
          }

          <button className={styles.btn} onClick={this.handleRemoveUser}>
            Remove From Team
          </button>
        </div>
      )
    })

    return (
      <div className={styles.wrapper}>
        <h3 className={styles.subtitle}>Manage Users</h3>
        {users}
        {this.state.success ?
          <div className={styles.success}>Users successfully changed</div>
        : null}
      </div>
    );
  }

  handleAddRole(userId, role){
    const {_id, name} = this.props.team

    Meteor.call("User.changeRole", userId, _id, role)

    this.setState({
      success: true
    });
    window.setTimeout(() => {
      this.setState({
        success: false
      });
    }, 3000);
  }

  handleRemoveRole(userId, role){
    const {_id} = this.props.team

    Meteor.call("User.changeRole", userId, _id, role)

    this.setState({
      success: true
    });
    window.setTimeout(() => {
      this.setState({
        success: false
      });
    }, 3000);
  }

  handleRemoveUser(userId){
    const {_id} = this.props.team

    Meteor.call("User.removeFromTeam", userId, _id)

    this.setState({
      success: true
    });
    window.setTimeout(() => {
      this.setState({
        success: false
      });
    }, 3000);
  }
}
