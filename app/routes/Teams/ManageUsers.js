import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import {Users} from '../../schemas';
import Spinner from '../../components/Spinner/Spinner';
import styles from './manageUsers.css';
import Icon from '../../components/Icons/Icon.js';
import {Link} from 'react-router';

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

    let users = this.data.users.map((user, i) => {
      return (
        <div key={i} className={styles.item}>
          {user.profile.name} <em>{user.profile.title}</em><br />
          Roles:<br/>

          {user.permissions.map((permission) => {
            //not sure how to do this better. Looping through all the user's
            //permissions until we find the one that matches this team. Maybe should
            //use 'teamId' as an object key in user.permissions instead of
            //making it an array of objects?
            if (permission.teamId === this.props.team._id) {
              let rolesToCheck = ['admin', 'normal', 'secret'];
              let roles
                {_.each(rolesToCheck, (role) => {
                  permission.roles.includes(role) ?

                  roles =
                      <div key={i}>
                        <Icon
                          size="1.2em"
                          icon="check"
                          color='green'
                          onClick={() => this.handleRemoveRole(user._id, role)} />
                        {role}
                      </div>
                    :
                  roles =
                      <div key={i}>
                        <Icon
                          size="1.2em"
                          icon="check"
                          color='#ddd'
                          onClick={() => this.handleAddRole(user._id, role)} />
                          {role}
                      </div>

                  })
                return roles
                }
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

    Meteor.call("User.addRole", userId, _id, role)

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

    Meteor.call("User.removeRole", userId, _id, role)

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
