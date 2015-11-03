import React, { Component, PropTypes } from 'react';
import InputStacked from '../../components/Forms/InputStacked';
import styles from './todoForms.css';


export default class TodoForms extends Component {
  static PropTypes = {
    inputState: PropTypes.object,
    inputsToUse: PropTypes.array,
    formError: PropTypes.string,
    formSuccess: PropTypes.string,
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func
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
        <button
          type="submit"
          className={this.props.shakeBtn ? styles.btnShake : styles.btn}
          onClick={() => this.props.handleSubmit(event, errors, values)} >
          {this.props.buttonText}
        </button>
        <div className={styles.error}>{this.props.formError}</div>
        <div className={styles.success}>{this.props.formSuccess}</div>

      </div>
    )
  }

  getInputsToUse() {
    const values = this.props.inputState.values;
    const errors = this.props.inputState.errors;

    let inputsToUse = this.props.inputsToUse.map((input, i) => {
      switch (input) {
        case 'text':
          return (
            <InputStacked
              key={i}
              type="text"
              name="text"
              value={values.text}
              styles={styles.text}
              handleChange={this.props.handleChange}
              placeholder="Type your todo"
              />
          );
      }
    });
    return inputsToUse
  }
}
