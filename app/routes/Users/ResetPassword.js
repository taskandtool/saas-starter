import React, { Component, PropTypes } from 'react';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import {handleForms} from '../../components/Forms/FormDecorator';
import UserForms from '../../components/Users/UserForms.js';
import styles from './forgotReset.css';


@handleForms
@reactMixin.decorate(History)
export default class ResetPasswordRoute extends Component {
  static propTypes = {
    params: PropTypes.object
  }

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      formSuccess: "",
      formError: ""
    };
  }

  render() {
    const inputsToUse = ["password", "confirm"];

    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Reset your Password</h2>

        <h6 className={styles.subtitle}>Enter your new password</h6>

        <UserForms
          buttonText="Reset my Password"
          inputsToUse={inputsToUse}
          inputState={this.props.inputState}
          formError={this.state.formError}
          formSuccess={this.state.formSuccess}
          shakeBtn={this.state.shakeBtn}
          handleChange={this.props.handleChange}
          handleSubmit={this.handleSubmit}
          token={this.props.params.token} />
      </div>
    )
  }

  handleSubmit(event, errors, values, token) {
    event.preventDefault();
    const {password, confirm} = values;

    //if there's errors on any field or if confirm password doesn't equal password
    if (errors.password || errors.confim || !password || confirm !== password) {
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

    Accounts.resetPassword(token, password, (error) => {
      if (error) {
        this.setState({
          formError: error.reason,
          shakeBtn: true
        });
        window.setTimeout(() => {
          this.setState({
            shakeBtn: false
          });
        }, 1000);
        return;
      } else {
        this.setState({
          formError: "",
          formSuccess: 'Success! Your password has been reset. Redirecting...'
        });
        window.setTimeout(() => {
          this.history.pushState(null, `/`);
        }, 1000);
      }
    });
  }
}
