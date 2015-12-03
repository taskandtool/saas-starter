import React, { Component } from 'react';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import {handleForms} from '../../components/Forms/FormDecorator';
import UserForms from '../../components/Users/UserForms.js';
import AuthLinks from '../../components/Users/AuthLinks.js';
import md5 from 'blueimp-md5';
import styles from './joinLogin.css';
import SocialAuth from '../../components/Users/SocialAuth';

@handleForms
@reactMixin.decorate(History)
export default class JoinRoute extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.listenForEnter = this.listenForEnter.bind(this);
    this.state = {
      shakeBtn: false
    };
  }

  render() {

    const inputsToUse = ["email", "password", "confirm"];
    const linksToUse = ["signin", "forgot"];

    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Get Started!</h2>

        <SocialAuth />

        <h6 className={styles.subtitle}>- Or -</h6>

        <UserForms
          buttonText="Join with Email"
          inputsToUse={inputsToUse}
          inputState={this.props.inputState}
          shakeBtn={this.state.shakeBtn}
          handleChange={this.props.handleChange}
          handleSubmit={this.handleSubmit} />

        <AuthLinks linksToUse={linksToUse} />
      </div>
    )
  }

  componentDidMount() {
    window.onkeydown = this.listenForEnter;
  }

  listenForEnter(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }

  handleSubmit() {
    const values = this.props.inputState.values
    const {email, password, confirm} = values
    const errors = this.props.inputState.errors

    //if errors showing don't submit
    if (_.some(errors, function(str){ return str !== '' && str !== undefined; })) {
      this.props.showToast('You have errors showing', 'error')
      this.setState({
        shakeBtn: true
      });
      window.setTimeout(() => {
        this.setState({
          shakeBtn: false
        });
      }, 1000);
      return false;
    }
    //if any values missing showing don't submit
    if (Object.keys(values).length < 3) {
      this.props.showToast('Please fill out all fields', 'error')
      this.setState({
        shakeBtn: true
      });
      window.setTimeout(() => {
        this.setState({
          shakeBtn: false
        });
      }, 1000);
      return false;
    }

    Accounts.createUser({
      email: email,
      password: password,
      profile: {
        name: email.substring(0, email.indexOf('@')),
        avatar: "http://www.gravatar.com/avatar/" + md5(email.trim().toLowerCase()) + "?s=50&d=mm", //actual image picked by user to display
        images: ["http://www.gravatar.com/avatar/" + md5(email.trim().toLowerCase()) + "?s=50&d=mm"] //collection of images in users account
      }
    }, (error, result) => {
      if (error) {
        this.props.showToast(error.reason, 'error')
        this.setState({
          shakeBtn: true
        });
        window.setTimeout(() => {
          this.setState({
            shakeBtn: false
          });
        }, 1000);
        return;
      } else {
        //create initial todos, reverse order
        Meteor.call('Todo.create', {
          text: 'Create a team and invite users',
          isCompleted: false,
          isDeleted: false,
          isPrivate: false,
          teamId: ''
        })
        Meteor.call('Todo.create', {
          text: 'Edit your profile to see live updates',
          isCompleted: false,
          isDeleted: false,
          isPrivate: false,
          teamId: ''
        })
        Meteor.call('Todo.create', {
          text: 'Click on your profile to the right',
          isCompleted: false,
          isDeleted: false,
          isPrivate: false,
          teamId: ''
        })
        Meteor.call('Todo.create', {
          text: 'See how clicking the lock instantly shows/hides the todo to the other user',
          isCompleted: false,
          isDeleted: false,
          isPrivate: false,
          teamId: ''
        })
        Meteor.call('Todo.create', {
          text: 'Open this page in a different browser or phone',
          isCompleted: false,
          isDeleted: false,
          isPrivate: false,
          teamId: ''
        })
        Meteor.call('Todo.create', {
          text: 'Sign up',
          isCompleted: true,
          isDeleted: false,
          isPrivate: true,
          teamId: ''
        })
        this.props.showToast('<h3>Welcome Back!</h3><p>Taking you to your to do\'s</p>', 'success')
        window.setTimeout(() => {
          this.history.pushState(null, `/user/${Meteor.user()._id}/todos`);
        }, 2000);
      }
    });
  }
}
