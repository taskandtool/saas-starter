import React from 'react';
import ForgotPassword from '../../components/Users/ForgotPassword';


export default class ForgotPasswordRoute extends React.Component {

  constructor() {
    super();
    this.state = {errors: {}};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const errors = {};

    if (! email) {
      errors.email = 'Email required';
    }

    this.setState({
      errors: errors
    });

    if (! _.isEmpty(errors)) {
      // Form errors found, do not log in
      return;
    }

    Accounts.forgotPassword({email: email}, (error) => {
      if (error) {
        this.setState({
          errors: { 'none': error.reason }
        });
        return;
      }
      this.setState ({
        successMessage: 'Success: An email with the option to reset your password has been sent! Please check your inbox.'
      });
    });
  }

  logout() {
    Meteor.logout();
    // this.history.pushState(null, `/`); *Waiting for react-router decorators in 1.x
  }

  render() {
    return (
      <ForgotPassword onSubmit={this.onSubmit} errors={this.state.errors} successMessage={this.state.successMessage} />
    )
  }
}
