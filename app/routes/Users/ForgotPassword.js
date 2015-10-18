import React, { Component } from 'react';
import reactMixin from 'react-mixin';
import {handleForms} from '../../components/Forms/FormDecorator';
import AuthForms from '../../components/Users/AuthForms.js';

@handleForms
export default class ForgotPasswordRoute extends React.Component {
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
      title: "Recover your Password",
      subtitle: "Enter your email",
      buttonText: "Reset my Password",
    }

    const inputsToUse = ["email"];
    const linksToUse = [];

    return (
      <AuthForms
        messages={messages}
        formError={this.state.formError}
        formSuccess={this.state.formSuccess}
        handleSubmit={this.handleSubmit}
        handleChange={this.props.handleChange}
        includeSocialAuth={false}
        inputState={this.props.inputState}
        inputsToUse={inputsToUse}
        linksToUse={linksToUse}
        />
    )
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();
    const {email, password, confirm} = values;

    if (errors.password || errors.email || errors.confirm) {
      return false;
    }

    Accounts.forgotPassword({email: email}, (error) => {
      if (error) {
        this.setState({
          formError: error.reason
        });
        return;
      } else {
        this.setState ({
          formError: "",
          formSuccess: 'Success! An email with the option to reset your password has been sent! Please check your inbox.'
        });
      }
    });
  }
}
