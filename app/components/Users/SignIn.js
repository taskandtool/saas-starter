import React from 'react';
import {History, Link} from 'react-router';
import InputStacked from '../Forms/InputStacked';
import reactMixin from 'react-mixin';
import {handleForms} from '../Forms/FormDecorator';
import SocialAuth from './SocialAuth';

import styles from './joinSignin.css'

@handleForms
@reactMixin.decorate(History)
export default class SignIn extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loginFail: ""
    };
  }

  render() {
    let values = this.props.formState.values;
    let errors = this.props.formState.errors;

    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Get Started!</h2>

        <SocialAuth type="Login" />

        <form ref="form" className={styles.form}>
          <h6 className={styles.subtitle}>- Or -</h6>
          <fieldset>

            <InputStacked
              type="email"
              name="email"
              handleChange={this.props.handleChange}
              value={values.email}
              errorMsg={errors.email}
              validateBy="email"
              label="Email Address"
              required="true"  />

            <InputStacked
              type="password"
              name="password"
              handleChange={this.props.handleChange}
              value={values.password}
              errorMsg={errors.password}
              validateBy="password"
              label="Password"
              required="true"  />
          </fieldset>
        </form>
        <div className={styles.error}>{this.state.loginFail}</div>
        <div className="pure-controls">
          <button type="submit" className={styles.btn} onClick={() => this.handleSubmit(event, errors, values)}>
            Login
          </button>
        </div>

        <Link to="/join" className={styles.links}>
          Need an account? Join Now.
        </Link>
        <Link to="/forgot-password" className={styles.links}>
          Forgot Password?
        </Link>

      </div>
    )
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();
    const {email, password} = values;

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        this.setState({
          loginFail: error.reason
        });

        return false;
      }
      this.history.pushState(null, `/`);
    });
  }
}
