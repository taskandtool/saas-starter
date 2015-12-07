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

  handleSubmit() {
    const {errors, values} = this.props.inputState;
    const {email, password} = values;


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
    if (Object.keys(values).length < 2) {
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

    Meteor.loginWithPassword(email, password, (error) => {
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
        this.props.showToast('<h3>Welcome Back!</h3><p>Taking you to your to do\'s</p>', 'success')
        window.setTimeout(() => {
          this.history.push(null, `/user/${Meteor.user()._id}/todos`);
        }, 1000);
      }
    });
  }
}
