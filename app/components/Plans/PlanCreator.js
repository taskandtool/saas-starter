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

    return (
      <div className={styles.wrapper}>
        <div className={styles.formBox}>
          <h1>Add a New Plan</h1>
          <form id="form" className={styles.form} onSubmit={() => this.handleSubmit(event, errors, values)}>
            <fieldset>
            <InputStacked
              type="text"
              name="title"
              value={values.title}
              errorMsg={errors.title}
              label="Plan Title"
              handleChange={this.props.handleChange}
              />

            <InputStacked
              type="number"
              name="monthlyPrice"
              label="Monthly Price"
              value={values.monthlyPrice}
              errorMsg={errors.monthlyPrice}
              handleChange={this.props.handleChange}
              validateBy="isNumber"
              />

            <InputStacked
              type="number"
              name="setupPrice"
              label="Setup Price"
              value={values.setupPrice}
              errorMsg={errors.setupPrice}
              handleChange={this.props.handleChange}
              validateBy="isNumber"
              />

            <InputStacked
              type="text"
              name="desc"
              label="Description"
              value={values.desc}
              errorMsg={errors.desc}
              handleChange={this.props.handleChange}
              />

            <InputStacked
              type="number"
              name="maxProjects"
              label="Max Projects (0 for unlimited)"
              value={values.maxProjects}
              errorMsg={errors.maxProjects}
              handleChange={this.props.handleChange}
              validateBy="isNumber"
              />

            <InputStacked
              type="number"
              name="maxItems"
              label="Max Items (0 for unlimited)"
              value={values.maxItems}
              errorMsg={errors.maxItems}
              handleChange={this.props.handleChange}
              validateBy="isNumber"
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
              />

            <InputStacked
              type="checkbox"
              name="currAvail"
              label="Currently Available?"
              value={values.currAvail}
              errorMsg={errors.currAvail}
              handleChange={this.props.handleChange}
              required={false}
              validateBy={null}
              />

            <InputStacked
              type="checkbox"
              name="custom"
              label="Custom Plan?"
              value={values.custom}
              errorMsg={errors.custom}
              handleChange={this.props.handleChange}
              required={false}
              validateBy={null}
              />

            <div>
              <button className={styles.btn}
                      type="submit" >

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

    //Safari doesn't prevent form submission with required input attr.
    //this goes through all inputs with required fields and sees if they have values.
    //if no, an error is set.
    let thisRef = this;
    $("#form [required]").each(function(index) {
      let val = $(this).val();
      if (!val) {
        let name = $(this).attr("name");
        thisRef.props.formValidateRequired(name, val);
      }
    });

    //don't submit if there's errors showing
    //underscore method to ensure all errors are empty strings
    let errorValues = _.values(errors);
    if (! _.every(errorValues, function(str){ return str === ''; })) {
      console.log('This should not submit because there\'s errors');
      return false; //prevent form submission
    }

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
        this.setState({showRequired: true})
        return false; //doesn't work in chrome.
      }

      this.history.pushState(null, `/plans`);
    });
  }
}
