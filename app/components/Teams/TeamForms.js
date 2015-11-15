import React, { Component, PropTypes } from 'react';
import InputStacked from '../../components/Forms/InputStacked';
import styles from './teamForms.css';

export default class TeamForms extends Component {
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
    let inputs = this.getInputsToUse();

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
          onClick={() => this.props.handleSubmit(event, errors, values)} >
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
        case 'name':
          return (
            <InputStacked
              key={i}
              type="text"
              name="name"
              value={values.name}
              errorMsg={errors.name}
              label="Team Name"
              validateBy="required"
              handleChange={this.props.handleChange}
              />
          );
        case 'desc':
          return (
            <InputStacked
              key={i}
              type="text"
              name="desc"
              label="Brief Description"
              value={values.desc}
              errorMsg={errors.desc}
              handleChange={this.props.handleChange}
              validateBy="required"
              required="true"
              />
          );
        case 'planId':
          return (
            <InputStacked
              key={i}
              type="select"
              name="planId"
              label="Choose your Plan"
              value={values.planId}
              handleChange={this.props.handleChange}
              populate={this.props.populate}
              validateBy="required"
              />
          );
        case 'isDeleted':
          return (
            <InputStacked
              key={i}
              type="checkbox"
              name="isDeleted"
              label="Delete?"
              value={values.isDeleted}
              errorMsg={errors.isDeleted}
              handleChange={this.props.handleChange}
              />
          );
      }
    });
    return inputsToUse
  }
}
