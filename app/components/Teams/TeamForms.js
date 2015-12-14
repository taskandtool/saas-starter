import React, { Component, PropTypes } from 'react';
import InputStacked from '../Forms/InputStacked';
import styles from './teamForms.css';
import reactMixin from 'react-mixin';
import {Plans} from '../../schemas';
import PlanCard from '../Plans/PlanCard'


@reactMixin.decorate(ReactMeteorData)
export default class TeamForms extends Component {
  static PropTypes = {
    inputState: React.PropTypes.object,
    inputsToUse: React.PropTypes.array,
    handleSubmit: React.PropTypes.func,
    handleChange: React.PropTypes.func
  }

  constructor() {
    super();
    this.getInputsToUse = this.getInputsToUse.bind(this);
  }

  getMeteorData() {
    //need to do this to prepopulate plan selection for teams
    let handle = Meteor.subscribe("plans");
    return {
      plans: Plans.find().fetch(),
      loading: !handle.ready()
    };
  }

  render() {
    const values = this.props.inputState.values;
    const errors = this.props.inputState.errors;
    let inputs = this.getInputsToUse();

    return (
      <div>
        <form className={styles.grid}>
          {inputs}
        </form>
        <div  className={styles.inputCol}>
          <button
            type="submit"
            className={this.props.shakeBtn ? styles.btnShake : styles.btn}
            onClick={() => this.props.handleSubmit(event, errors, values)} >
            {this.props.buttonText}
          </button>
        </div>
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
            <div key={i} className={styles.inputCol}>
              <InputStacked
                type="text"
                name="name"
                value={values.name}
                errorMsg={errors.name}
                label="Team Name"
                validateBy="required"
                handleChange={this.props.handleChange}
                />
              </div>
          );
        case 'desc':
          return (
            <div key={i} className={styles.inputCol}>
              <InputStacked
                type="text"
                name="desc"
                label="Brief Description"
                value={values.desc}
                errorMsg={errors.desc}
                handleChange={this.props.handleChange}
                validateBy="required"
                required="true"
                />
            </div>
          );
        case 'isDeleted':
          return (
            <div key={i} className={styles.inputCol}>
              <InputStacked
                type="checkbox"
                name="isDeleted"
                label="Delete?"
                value={values.isDeleted}
                errorMsg={errors.isDeleted}
                handleChange={this.props.handleChange}
                />
            </div>
          );
        case 'plans':
          let planList = this.data.plans.map((plan, i) => {
            return (<div
                      key={i}
                      onClick={() => this.props.handleSelectPlan(plan._id, plan.monthlyPrice)}
                      className={styles.column}>
                      {this.props.team.planId == plan._id ? 'Current Plan' : <br/> }
                      <div className={values.planId == plan._id ? styles.selected : styles.unselected}>
                        <PlanCard plan={plan} />
                      </div>
                    </div>)
          });
          return (<div key='plans' className={styles.grid}>
                    <h3 className={styles.subtitle}>Choose my Plan</h3>
                    {planList}
                  </div>)
      }
    });
    return inputsToUse
  }
}
