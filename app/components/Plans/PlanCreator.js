import React, { PropTypes } from 'react';
import InputStacked from '../Forms/InputStacked';
import {handleForms} from '../../components/Forms/FormDecorator';
import {History, Link} from 'react-router';
import reactMixin from 'react-mixin';
import PlanItem from './PlanItem.js';
import ReactDOM from 'react-dom';
import styles from './PlanCreator.css';

@handleForms
@reactMixin.decorate(History)
export default class PlanCreator extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    let values = this.props.formState.values;
    let errors = this.props.formState.errors;
    let success = this.props.formState.success;

    return (
      <div className={styles.section}>
        <div className={styles.formBox}>
          <h2 className={styles.title}>Add a New Plan</h2>
          <form className={styles.form} onSubmit={() => this.handleSubmit(event, errors, values)}>
            <fieldset>
            <InputStacked
              type="text"
              name="title"
              value={values.title}
              errorMsg={errors.title}
              label="Plan Title"
              handleChange={this.props.handleChange}
              success={success.title} />

            <InputStacked
              type="number"
              name="monthlyPrice"
              label="Monthly Price"
              value={values.monthlyPrice}
              errorMsg={errors.monthlyPrice}
              handleChange={this.props.handleChange}
              validateBy="isNumber"
              success={success.monthlyPrice} />

            <InputStacked
              type="number"
              name="setupPrice"
              label="Setup Price"
              value={values.setupPrice}
              errorMsg={errors.setupPrice}
              handleChange={this.props.handleChange}
              success={success.setupPrice}
              validateBy="isNumber"
              />

            <InputStacked
              type="text"
              name="desc"
              label="Description"
              value={values.desc}
              errorMsg={errors.desc}
              handleChange={this.props.handleChange}
              success={success.desc}
              />

            <InputStacked
              type="number"
              name="maxProjects"
              label="Max Projects (0 for unlimited)"
              value={values.maxProjects}
              errorMsg={errors.maxProjects}
              handleChange={this.props.handleChange}
              validateBy="isNumber"
              success={success.maxProjects}
              />

            <InputStacked
              type="number"
              name="maxItems"
              label="Max Items (0 for unlimited)"
              value={values.maxItems}
              errorMsg={errors.maxItems}
              handleChange={this.props.handleChange}
              validateBy="isNumber"
              success={success.maxItems}
              />

            <InputStacked
              type="number"
              name="freeTrialDays"
              label="Free Trial Days"
              value={values.freeTrialDays}
              errorMsg={errors.freeTrialDays}
              handleChange={this.props.handleChange}
              validateBy="isNumber"
              required={false}
              success={success.freeTrialDays} />

            <InputStacked
              type="checkbox"
              name="currAvail"
              label="Currently Available?"
              value={values.currAvail}
              errorMsg={errors.currAvail}
              handleChange={this.props.handleChange}
              required={false}
              />

            <InputStacked
              type="checkbox"
              name="custom"
              label="Custom Plan?"
              value={values.custom}
              errorMsg={errors.custom}
              handleChange={this.props.handleChange}
              required={false}
              />

            <div>
              <button className={styles.btn}
                      type="submit"
                      disabled={(Object.keys(errors).length) ? true : false} >
                Create Plan
              </button>
            </div>
            </fieldset>
          </form>
        </div>
        <PlanItem plan={values} />
      </div>
    );
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();

    const {title, monthlyPrice, setupPrice, desc, maxProjects, maxItems, freeTrialDays, currAvail, custom} = values;

    Meteor.call('Plan.create', {
      title: title,
      monthlyPrice: parseInt(monthlyPrice),
      setupPrice: parseInt(setupPrice),
      desc: desc,
      maxItems: parseInt(maxItems),
      maxProjects: parseInt(maxProjects),
      freeTrialDays: parseInt(freeTrialDays),
      currAvail: !!currAvail,
      custom: !!custom
    }, (error) => {
      if (error) {
        console.log(error.reason);
        console.log(styles);
        //Apply red styling to inputs with 'required' by using []required
        return;
      }

      this.history.pushState(null, `/plans`);
    });
  }
}
