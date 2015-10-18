import React, { Component } from 'react';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import {handleForms} from '../../components/Forms/FormDecorator';
import AuthForms from '../../components/Users/AuthForms.js';
import md5 from 'blueimp-md5';

@handleForms
@reactMixin.decorate(History)
export default class JoinRoute extends React.Component {
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
      title: "Get Started!",
      subtitle: "- Or -",
      buttonText: "Join with Email",
    }

    const inputsToUse = ["email", "password", "confirm"];
    const linksToUse = ["signin", "forgot"];

    return (
      <AuthForms
        messages={messages}
        formError={this.state.formError}
        formSuccess={this.state.formSuccess}
        handleSubmit={this.handleSubmit}
        handleChange={this.props.handleChange}
        includeSocialAuth={true}
        socialAuthType="Join"
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

    Accounts.createUser({
      email: email,
      password: password,
      profile: {
        name: email.substring(0, email.indexOf('@')),
        avatar: "http://www.gravatar.com/avatar/" + md5(email.trim().toLowerCase()) + "?s=50&d=mm", //actual image picked by user to display
        images: ["http://www.gravatar.com/avatar/" + md5(email.trim().toLowerCase()) + "?s=50&d=mm"] //collection of images in users account
      }
    }, (error) => {
      if (error) {
        this.setState({
          formError: error.reason
        });
        return;
      } else {
        this.setState({
          formError: "",
          formSuccess: "Success! Thanks for Joining!"
        });
        window.setTimeout(() => {
          this.history.pushState(null, `/`);
        }, 1000);
      }
    });
  }
}
