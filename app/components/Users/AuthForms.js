import React, { Component, PropTypes } from 'react';
import InputStacked from '../../components/Forms/InputStacked';
import SocialAuth from './SocialAuth';
import {Link} from 'react-router';
import styles from './authForms.css';

export default class AuthForms extends Component {
  static PropTypes = {
    inputState: React.PropTypes.object,
    inputsToUse: React.PropTypes.array,
    formError: React.PropTypes.string,
    formSuccess: React.PropTypes.string,
    messages: React.PropTypes.object,
    includeSocialAuth: React.PropTypes.bool,
    socialAuthType: React.PropTypes.string,
    handleSubmit: React.PropTypes.func,
    handleChange: React.PropTypes.func
  }

  static defaultProps = {
    includeSocialAuth: false,
    socialAuthType: 'Join'
  };

  constructor() {
    super();
  }

  render() {
    const values = this.props.inputState.values;
    const errors = this.props.inputState.errors;
    const {title, subtitle, buttonText} = this.props.messages;
    const inputs = this.props.inputsToUse;
    const links = this.props.linksToUse;

    let inputsToUse = inputs.map(function(name, i){
      if (name == "email") {
        return (
          <InputStacked
            key={i}
            type="email"
            name="email"
            handleChange={this.props.handleChange}
            value={values.email}
            errorMsg={errors.email}
            validateBy="email"
            label="Email Address"
            required="true"  />
        );
      }
      if (name == "password") {
        return (
          <InputStacked
            key={i}
            type="password"
            name="password"
            handleChange={this.props.handleChange}
            value={values.password}
            errorMsg={errors.password}
            validateBy="password"
            label="Password"
            required="true"  />
        );
      }
      if (name == "confirm") {
        return (
          <InputStacked
            key={i}
            type="password"
            name="confirm"
            handleChange={this.props.handleChange}
            value={values.confirm}
            errorMsg={errors.confirm}
            validateBy="confirmPassword"
            label="Confirm Password"
            required="true"  />
        );
      }
    }, this);

    let linksToUse = links.map(function(name, i){
      if (name == "join") {
        return (
          <Link key={i} to="/join" className={styles.links}>
            Need an account? Join Now.
          </Link>
        );
      }
      if (name == "forgot") {
        return (
          <Link key={i} to="/forgot-password" className={styles.links}>
            Forgot Password?
          </Link>
        );
      }
      if (name == "signin") {
        return (
          <Link key={i} to="/signin" className={styles.links}>
            Already have an account? Login
          </Link>
        );
      }
    }, this);

    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
        {this.props.includeSocialAuth ?
          <SocialAuth type={this.props.socialAuthType} />
          :
          null
        }
        <form ref="form" className={styles.form}>
          <h6 className={styles.subtitle}>{subtitle}</h6>
          <fieldset>
            {inputsToUse}
          </fieldset>
        </form>
        <div className={styles.error}>{this.props.formError}</div>
        <div className={styles.success}>{this.props.formSuccess}</div>
        <button
          type="submit"
          className={this.props.shakeBtn ? styles.btnShake : styles.btn} 
          onClick={() => this.props.handleSubmit(event, errors, values, this.props.token)}>

          {buttonText}
        </button>
        {linksToUse}
      </div>
    )
  }
}
