import React, { Component, PropTypes } from 'react';
import styles from './ResetPassword.css'
import InputStacked from '../../components/Forms/InputStacked';

export default class ResetPassword extends Component {
  static propTypes = {
    formState: React.PropTypes.object,
    messages: React.PropTypes.object,
    handleSubmit: React.PropTypes.func,
    handleChange: React.PropTypes.func
  }

  render() {
    let values = this.props.formState.values;
    let errors = this.props.formState.errors;
    let {title, subtitle, buttonText} = this.props.messages;

    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{title}</h2>
        <form ref="form" className={styles.form}>
          <h6 className={styles.subtitle}>{subtitle}</h6>
          <fieldset>

            <InputStacked
              type="password"
              name="password"
              handleChange={this.props.handleChange}
              value={values.password}
              errorMsg={errors.password}
              validateBy="password"
              label="Password"
              required="true"  />

            <InputStacked
              type="password"
              name="confirm"
              handleChange={this.props.handleChange}
              value={values.confirm}
              errorMsg={errors.confirm}
              validateBy="confirmPassword"
              label="Confirm Password"
              required="true"  />

          </fieldset>
        </form>
        <div className={styles.error}>{this.props.formFail}</div>
        <div className={styles.success}>{this.props.successMessage}</div>
        <button type="submit" className={styles.btn} onClick={() => this.props.handleSubmit(event, errors, values, this.props.token)}>
          {buttonText}
        </button>
      </div>
    )
  }
}
