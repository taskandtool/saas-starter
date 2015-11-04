import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import {Users} from '../../schemas';
import Spinner from '../../components/Spinner/Spinner';
import styles from './inviteUsers.css';
import {Tokenizer} from 'react-typeahead';

@reactMixin.decorate(ReactMeteorData)
export default class ManageUsersRoute extends Component {

  constructor() {
    super();
    this.handleChangeRole = this.handleChangeRole.bind(this);
    this.handleRemoveUser = this.handleRemoveUser.bind(this);
    this.state = {
      success: false
    }
  }

  getMeteorData() {
    let handle = Meteor.subscribe("users.belongingToTeam", this.props.team._id);
    return {
      users: Users.find().fetch(),
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
        <div key={user._id}>
          {user.profile.name}
          {console.log(user.roles)}
          <button className={styles.btn} onClick={this.handleRemoveUser}>
            Remove User
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

  handleChangeRole(){
    const {_id, name} = this.props.team
    users.map((user) => {
      Meteor.call("User.teamInvite", user.id, name, _id)
    })
    this.setState({
      success: true
    });
    window.setTimeout(() => {
      this.setState({
        success: false
      });
    }, 3000);
  }

  handleRemoveUser(){
    const {_id, name} = this.props.team
    users.map((user) => {
      Meteor.call("User.teamInvite", user.id, name, _id)
    })
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
