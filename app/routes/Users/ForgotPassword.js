import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import {handleForms} from '../../components/Forms/FormDecorator';
import UserForms from '../../components/Users/UserForms.js';
import styles from './forgotReset.css';

@handleForms
export default class ForgotPasswordRoute extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.listenForEnter = this.listenForEnter.bind(this);
    this.state = {
      shakeBtn: false
    };
  }

  render() {
    const inputsToUse = ["email"];

    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Recover your Password</h2>

        <h6 className={styles.subtitle}>Enter your email to reset your password</h6>

        <UserForms
          buttonText="Reset my Password"
          inputsToUse={inputsToUse}
          inputState={this.props.inputState}
          shakeBtn={this.state.shakeBtn}
          handleChange={this.props.handleChange}
          handleSubmit={this.handleSubmit} />
      </div>
    )
  }

  componentDidMount() {
    window.onkeydown = this.listenForEnter;
  }

  listenForEnter(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  handleSubmit() {
    let errors = this.props.inputState.errors
    let values = this.props.inputState.values

    const {email} = values;

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
    if (Object.keys(values).length < 1) {
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

    Accounts.forgotPassword({email: email}, (error) => {
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
        this.props.showToast('<h3>Success!</h3> <p>Please check your inbox for the link to finish resetting your password.</p>', 'success')
      }
    });
  }
}
