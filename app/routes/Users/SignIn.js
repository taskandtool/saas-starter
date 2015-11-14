import React, { Component } from 'react';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import {handleForms} from '../../components/Forms/FormDecorator';
import UserForms from '../../components/Users/UserForms.js';
import AuthLinks from '../../components/Users/AuthLinks.js';
import SocialAuth from '../../components/Users/SocialAuth';
import styles from './joinLogin.css';


@handleForms
@reactMixin.decorate(History)
export default class SignInRoute extends Component {
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
    const inputsToUse = ["email", "password"];
    const linksToUse = ["join", "forgot"];

    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Get Started!</h2>

        <SocialAuth type="Login" />

        <h6 className={styles.subtitle}>- Or -</h6>

        <UserForms
          buttonText="Login"
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
    const {email, password} = values;

    if (errors.password || errors.email) {
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

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
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
        this.setState ({
          formError: "",
          formSuccess: 'Success!'
        });
        window.setTimeout(() => {
          this.history.pushState(null, `/`);
        }, 1000);
      }
    });
  }
}
