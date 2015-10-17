import React, { Component, PropTypes } from 'react';
import ResetPassword from '../../components/Users/ResetPassword';
import {History, Link} from 'react-router';
import reactMixin from 'react-mixin';
import {handleForms} from '../../components/Forms/FormDecorator';

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
      formFail: ""
    };
  }

  render() {
    return (
      <ResetPassword token={this.props.params.token}
          formState={this.props.formState}
          formFail={this.state.formFail}
          successMessage={this.props.successMessage}
          handleSubmit={this.handleSubmit}
          handleChange={this.props.handleChange}
          />
    )
  }

  handleSubmit(event, errors, values, token) {
    event.preventDefault();
    const {password, confirm} = values;

    Accounts.resetPassword(token, password, (error) => {
      if (error) {
        this.setState({
          formFail: error.reason
        });
        return;
      }
      this.history.pushState(null, `/`);
    });
  }
}
