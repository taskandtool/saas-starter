import React, { Component } from 'react';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import {handleForms} from '../../components/Forms/FormDecorator';
import AuthForms from '../../components/Users/AuthForms.js';

@handleForms
@reactMixin.decorate(History)
export default class SignInRoute extends Component {
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

    const messages = {
      title: "Get Started!",
      subtitle: "- Or -",
      buttonText: "Login",
    }

    const inputsToUse = ["email", "password"];
    const linksToUse = ["join", "forgot"];

    return (
        <AuthForms
          messages={messages}
          formError={this.state.formError}
          formSuccess={this.state.formSuccess}
          handleSubmit={this.handleSubmit}
          handleChange={this.props.handleChange}
          includeSocialAuth={true}
          socialAuthType="Login"
          inputState={this.props.inputState}
          inputsToUse={inputsToUse}
          linksToUse={linksToUse}
          shakeBtn={this.state.shakeBtn}
          />
    )
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
