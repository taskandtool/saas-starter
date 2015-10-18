import React, { Component, PropTypes } from 'react';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import {handleForms} from '../../components/Forms/FormDecorator';
import AuthForms from '../../components/Users/AuthForms.js';

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
    const messages = {
      title: "Reset your Password",
      subtitle: "Enter your new password",
      buttonText: "Reset my Password",
    }

    const inputsToUse = ["password", "confirm"];
    const linksToUse = [];

    return (
      <AuthForms
        messages={messages}
        formError={this.state.formError}
        formSuccess={this.state.formSuccess}
        handleSubmit={this.handleSubmit}
        handleChange={this.props.handleChange}
        inputState={this.props.inputState}
        inputsToUse={inputsToUse}
        linksToUse={linksToUse}
        token={this.props.params.token}
        />
    )
  }

  handleSubmit(event, errors, values, token) {
    event.preventDefault();
    const {password, confirm} = values;

    if (errors.password || errors.confim) {
      return false;
    }

    Accounts.resetPassword(token, password, (error) => {
      if (error) {
        this.setState({
          formError: error.reason
        });
        return;
      } else {
        this.setState ({
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
