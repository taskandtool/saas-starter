import React, { Component, PropTypes } from 'react';
import ResetPassword from '../../components/Users/ResetPassword';
import reactMixin from 'react-mixin';
import {Link, History} from 'react-router';

@reactMixin.decorate(History)
export default class ResetPasswordRoute extends Component {
  static propTypes = {
    params: PropTypes.object
  }

  constructor() {
    super();
    this.state = {errors: {}};
    this.onSubmit = this.onSubmit.bind(this);
    Accounts.resetPassword = Accounts.resetPassword.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const password = event.target.password.value;
    const confirm = event.target.confirm.value;
    const token = this.props.token;
    const errors = {};

    if (! password) {
      errors.password = 'Password required';
    }

    if (confirm !== password) {
      errors.confirm = 'Please confirm your password';
    }

    this.setState({
      errors: errors
    });

    if (! _.isEmpty(errors)) {
      // Form errors found, do not log in
      return;
    }

    Accounts.resetPassword(this.props.params.token, password, (error) => {
      if (error) {
        this.setState({
          errors: { 'none': error.reason }
        });
        return;
      }
      this.setState ({
        successMessage: 'Password reset successfully! Redirecting to home...'
      });
      setTimeout(this.history.pushState(null, `/`), 7000);
    });
  }

  render() {
    return (
      <ResetPassword token={this.props.params.token} errors={this.state.errors} onSubmit={this.onSubmit} successMessage={this.state.successMessage} />
    )
  }
}
