import React from 'react';
import {History, Link} from 'react-router';
import InputStacked from '../Forms/InputStacked';
import reactMixin from 'react-mixin';
import {handleForms} from '../Forms/FormDecorator';

import styles from './forgotPassword.css'

@handleForms
export default class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      formFail: "",
      successMessage: ""
    };
  }

  render() {
    let values = this.props.formState.values;
    let errors = this.props.formState.errors;
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Recover Your Password</h2>
        <form ref="form" className={styles.form}>
          <fieldset>
            <p className={styles.message} >
              Enter your email and we'll send you an option to reset it.
            </p>

            <InputStacked
              type="email"
              name="email"
              handleChange={this.props.handleChange}
              value={values.email}
              errorMsg={errors.email}
              validateBy="email"
              label="Email Address"
              required="true"  />
          </fieldset>
        </form>
        <div className={styles.error}>{this.state.formFail}</div>
        <div className={styles.success}>{this.state.successMessage}</div>
        <div className="pure-controls">
          <button type="submit" className={styles.btn} onClick={() => this.handleSubmit(event, errors, values)}>
            Send me an email to reset my password
          </button>
        </div>

        <Link to="/join" className={styles.links}>
          Need an account? Join Now.
        </Link>
      </div>
    )
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();
    const {email, password} = values;

    Accounts.forgotPassword({email: email}, (error) => {
      if (error) {
        this.setState({
          formFail: error.reason
        });
        return;
      }
      this.setState ({
        formFail: "",
        successMessage: 'Success: An email with the option to reset your password has been sent! Please check your inbox.'
      });
    });
  }
}
