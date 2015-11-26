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
      formSuccess: "",
      formError: "",
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
          formError={this.state.formError}
          formSuccess={this.state.formSuccess}
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
      this.handleSubmit(e, this.props.inputState.errors, this.props.inputState.values);
    }
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();
    const {email, password, confirm} = values;

    //if errors or confirm field is empty, shake button and don't submit
    if (errors.password || errors.email || errors.confirm || !confirm) {
      this.props.showToast('You have errors showing', 'error')
      this.setState({
        shakeBtn: true
      });
      window.setTimeout(() => {
        this.setState({
          shakeBtn: false
        });
      }, 3000);
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
    }, (error) => {
      if (error) {
        this.props.showToast(error.reason)
        this.setState({
          formError: error.reason,
          shakeBtn: true
        });
        window.setTimeout(() => {
          this.setState({
            shakeBtn: false
          });
        }, 3000);
        return;
      } else {
        this.setState({
          formError: "",
          formSuccess: "Success! Thanks for Joining!"
        });
        window.setTimeout(() => {
          this.history.pushState(null, `/user/${Meteor.user()._id}/todos`);
        }, 1000);
      }
    });
  }
}
