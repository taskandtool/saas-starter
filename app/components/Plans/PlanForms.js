import React, { Component, PropTypes } from 'react';
import InputStacked from '../../components/Forms/InputStacked';
import styles from './planForms.css';

export default class PlanForms extends Component {
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
    let featureCount = -1;
    let featureStyle = {
      width: '80%'
    }

    let inputsToUse = this.props.inputsToUse.map((input, i) => {
      switch (input) {
        case 'title':
          return (
            <InputStacked
              key={i}
              type="text"
              name={styles.title}
              value={values.title}
              errorMsg={errors.title}
              label="Plan Title"
              handleChange={this.props.handleChange}
              />
          );
        case 'monthlyPrice':
          return (
            <InputStacked
              key={i}
              type="number"
              name="monthlyPrice"
              label="Monthly Price"
              value={values.monthlyPrice}
              errorMsg={errors.monthlyPrice}
              handleChange={this.props.handleChange}
              validateBy="isNumber"
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
              />
          );
        case 'setupPrice':
          return (
            <InputStacked
              key={i}
              type="number"
              name="setupPrice"
              label="Setup Price"
              value={values.setupPrice}
              errorMsg={errors.setupPrice}
              handleChange={this.props.handleChange}
              validateBy="isNumber"
              />
          );
        case 'displayOnMainSite':
          return (
            <InputStacked
              key={i}
              type="checkbox"
              name="displayOnMainSite"
              label="Display On Main Site?"
              value={values.displayOnMainSite}
              errorMsg={errors.displayOnMainSite}
              handleChange={this.props.handleChange}
              required={false}
              validateBy={null}
              />
          );
        case 'currAvail':
          return (
            <InputStacked
              key={i}
              type="checkbox"
              name="currAvail"
              label="Currently Available?"
              value={values.currAvail}
              errorMsg={errors.currAvail}
              handleChange={this.props.handleChange}
              required={false}
              validateBy={null}
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
              required={false}
              validateBy={null}
              />
          );
        case 'freeTrialDays':
          return (
            <InputStacked
              key={i}
              type="number"
              name="freeTrialDays"
              label="Free Trial Days"
              value={values.freeTrialDays}
              errorMsg={errors.freeTrialDays}
              handleChange={this.props.handleChange}
              validateBy="isNumber"
              required={false}
              />
          );
        case 'maxItems':
          return (
            <InputStacked
              key={i}
              type="number"
              name="maxItems"
              label="Max Items (0 for unlimited)"
              value={values.maxItems}
              errorMsg={errors.maxItems}
              handleChange={this.props.handleChange}
              validateBy="isNumber"
              />
          );
        case 'maxProjects':
          return (
            <InputStacked
              key={i}
              type="number"
              name="maxProjects"
              label="Max Projects (0 for unlimited)"
              value={values.maxProjects}
              errorMsg={errors.maxProjects}
              handleChange={this.props.handleChange}
              validateBy="isNumber"
              />

          );
        case 'feature':
          featureCount = featureCount + 1
          return (
            <div key={i}>
              <InputStacked
                styles={styles.inputFeatures}
                type="text"
                name={"feature" + i}
                label={"Feature"}
                value={values.feature ? values.feature[i] : null}
                defaultValue={this.props.plan ? this.props.plan.features[featureCount] : null}
                handleChange={this.props.handleChange} />
              <div className={styles.btnHolder}>
                <a href="#" className={styles.btnFeatures} onClick={this.props.handleAddFeature}>+</a>
              </div>
            </div>
          );
      }
    });
    return inputsToUse
  }
}
