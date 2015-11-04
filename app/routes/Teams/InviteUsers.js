import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import {Users} from '../../schemas';
import Spinner from '../../components/Spinner/Spinner';
import styles from './inviteUsers.css';
import {Tokenizer} from 'react-typeahead';


@reactMixin.decorate(ReactMeteorData)
export default class InviteUsersRoute extends Component {

  constructor() {
    super();
    this.handleInvite = this.handleInvite.bind(this);
    this.displayOption = this.displayOption.bind(this);
    this.state = {
      success: false
    }
  }

  getMeteorData() {
    let handle = Meteor.subscribe("users");
    return {
      users: Meteor.users.find().fetch(),
      loading: !handle.ready()
    };
  }

  render() {
    if (this.data.loading) {
      return (<div className={styles.wrapper}><Spinner /></div>);
    }

    const {name, _id} = this.props.team;

    //populate typeahead
    let email
    let users = this.data.users.map((user) => {
      email = user.emails && user.emails[0].address ? user.emails[0].address : 'None@none.com';
      user.profile.id = user._id
      user.profile.email = email
      return user.profile
    })

    return (
      <div className={styles.wrapper}>
        <h3 className={styles.subtitle}>Invite Users to {name}</h3>

        <Tokenizer
          options={users}
          ref="tokenizer"
          filterOption="name"
          displayOption={ this.displayOption }
          maxVisible={5}
          placeholder="Search for users..."
          className={styles.typeahead}
          customClasses={{
            input: styles.input,
            results: styles.results,
            listItem: styles.listItem,
            listAnchor: styles.listItem
          }}
        />
        {this.state.success ?
          <div className={styles.success}>Users successfully invited</div>
        : null}
        <button className={styles.btn} onClick={this.handleInvite}>
          Invite these users
        </button>
      </div>
    );
  }

  displayOption(option) {
    return option.name + ' | ' + option.email
  }

  handleInvite(){
    let users = this.refs.tokenizer.getSelectedTokens()
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
