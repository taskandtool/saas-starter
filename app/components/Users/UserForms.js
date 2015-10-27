import React, { Component, PropTypes } from 'react';
import InputStacked from '../../components/Forms/InputStacked';
import styles from './userForms.css';

export default class UserForms extends Component {
  static PropTypes = {
    inputState: React.PropTypes.object,
    inputsToUse: React.PropTypes.array,
    formError: React.PropTypes.string,
    formSuccess: React.PropTypes.string,
    handleSubmit: React.PropTypes.func,
    handleChange: React.PropTypes.func
  }

  constructor() {
    super();
    this.getInputsToUse = this.getInputsToUse.bind(this);
  }

  render() {
    const values = this.props.inputState.values;
    const errors = this.props.inputState.errors;
    const inputs = this.getInputsToUse();

    //FYI this.props.token in handleSubmit below is used only for the ResetPassword route.
    return (
      <div>
        <form className={styles.form}>
          {inputs}
        </form>
        <div className={styles.error}>{this.props.formError}</div>
        <div className={styles.success}>{this.props.formSuccess}</div>
        <button
          type="submit"
          className={this.props.shakeBtn ? styles.btnShake : styles.btn}
          onClick={() => this.props.handleSubmit(event, errors, values, this.props.token)} >
          {this.props.buttonText}
        </button>
      </div>
    )
  }

  getInputsToUse() {
    const values = this.props.inputState.values;
    const errors = this.props.inputState.errors;

    let inputsToUse = this.props.inputsToUse.map((input, i) => {
      switch (input) {
        case 'email':
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
        case 'password':
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
        case 'confirm':
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
        case 'oldPassword':
          return (
            <InputStacked
              key={i}
              type="password"
              name="oldPassword"
              handleChange={this.props.handleChange}
              value={values.oldPassword}
              errorMsg={errors.oldPassword}
              validateBy="password"
              label="Old Password"
              required="true"  />
          );
        case 'title':
          return (
            <InputStacked
              key={i}
              type="text"
              name="title"
              handleChange={this.props.handleChange}
              value={values.title}
              errorMsg={errors.title}
              label="Title (ie. Designer)"
              />
          );
        case 'name':
          return (
            <InputStacked
              key={i}
              type="text"
              name="name"
              handleChange={this.props.handleChange}
              value={values.name}
              errorMsg={errors.name}
              label="Name"
              />
          );
        case 'bio':
          return (
            <InputStacked
              key={i}
              type="text"
              name="bio"
              handleChange={this.props.handleChange}
              value={values.bio}
              errorMsg={errors.bio}
              label="Bio"
              />
          );
        case 'role':
          return (
            <InputStacked
              key={i}
              type="text"
              name="role"
              handleChange={this.props.handleChange}
              value={values.role}
              errorMsg={errors.role}
              label="Role"
              />
          );
        case 'team':
          return (
            <InputStacked
              key={i}
              type="text"
              name="team"
              handleChange={this.props.handleChange}
              value={values.team}
              errorMsg={errors.team}
              label="Team"
              />
          );
      }
    });
    return inputsToUse
  }
}
