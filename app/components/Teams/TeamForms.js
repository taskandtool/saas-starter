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
              handleChange={this.props.handleChange}
              />
          );
        case 'desc':
          return (
            <InputStacked
              key={i}
              type="text"
              name="desc"
              label="Description"
              value={values.desc}
              errorMsg={errors.desc}
              handleChange={this.props.handleChange}
              validateBy="required"
              required="true"
              />
          );
        case 'planId':
          return (
            //should be select field
            <InputStacked
              key={i}
              type="text"
              name="planId"
              label="Planid"
              value={values.planId}
              errorMsg={errors.planId}
              handleChange={this.props.handleChange}
              />
          );
        case 'isDeleted':
          return (
            <InputStacked
              key={i}
              type="checkbox"
              name="isDeleted"
              label="Deleted?"
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
