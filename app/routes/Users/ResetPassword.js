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
    this.listenForEnter = this.listenForEnter.bind(this);
    this.state = {
      shakeBtn: false
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
          shakeBtn={this.state.shakeBtn}
          handleChange={this.props.handleChange}
          handleSubmit={this.handleSubmit}
          token={this.props.params.token} />
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

    const {password, confirm} = values;

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

    Accounts.resetPassword(this.props.params.token, password, (error) => {
      if (error) {
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
        this.props.showToast('<h3>Success! Your password has been reset.</h3> <p>Redirecting...</p>', 'success')
        window.setTimeout(() => {
          this.history.pushState(null, `/`);
        }, 1000);
      }
    });
  }
}
