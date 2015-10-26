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
    this.state = {
      formSuccess: "",
      formError: "",
      shakeBtn: false
    };
  }

  render() {
    const inputsToUse = ["email"];

    return (
      <div className={styles.wrapper}>
        <h2 className="title">Recover your Password</h2>

        <h6 className="subtitle">Enter your email to reset your password</h6>

        <UserForms
          buttonText="Reset my Password"
          inputsToUse={inputsToUse}
          inputState={this.props.inputState}
          formError={this.state.formError}
          formSuccess={this.state.formSuccess}
          shakeBtn={this.state.shakeBtn}
          handleChange={this.props.handleChange}
          handleSubmit={this.handleSubmit} />
      </div>
    )
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();
    const {email} = values;

    if (errors.email || !email) {
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

    Accounts.forgotPassword({email: email}, (error) => {
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
        this.setState({
          formError: "",
          formSuccess: "Success! Please check your inbox for your reset password link!"
        });
      }
    });
  }
}
