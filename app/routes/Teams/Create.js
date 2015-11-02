import React, { PropTypes } from 'react';
import {handleForms} from '../../components/Forms/FormDecorator';
import {History, Link} from 'react-router';
import reactMixin from 'react-mixin';
import TeamCard from '../../components/Teams/TeamCard.js';
import Helmet from 'react-helmet';
import styles from './create.css';
import {Teams, Plans} from '../../schemas';
import TeamForms from '../../components/Teams/TeamForms';
import PlanCard from '../../components/Plans/PlanCard.js';


@handleForms
@reactMixin.decorate(History)
@reactMixin.decorate(ReactMeteorData)
export default class TeamCreateRoute extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      shakeBtn: false,
      formError: '',
      formSuccess: ''
    }
  }

  getMeteorData() {
    let handle = Meteor.subscribe("plans");
    return {
      plans: Plans.find().fetch(),
      loading: !handle.ready()
    };
  }

  render() {
    let values = this.props.inputState.values;
    let errors = this.props.inputState.errors;

    //set Plan Title value by whichever planId is currently selected
    //Also shows planCard with whichever plan is selected
    let selectedPlan
    this.data.plans.map((plan) => {
      if (plan._id == values.planId) {
         values.planName = plan.title
         selectedPlan = plan
      }
    });

    //get plans to populate option select field in forms
    let planTitle = this.data.plans.map((plan) => {
      return <option key={plan._id} value={plan._id}>{plan.title}</option>
    });

    let inputsToUse = [
      "name",
      "desc",
      "planId"
    ];

    return (
      <div className={styles.wrapper}>
        <Helmet
          title="Create New Team"
          meta={[
              {"name": "description", "content": "Create New Team"}
          ]}
        />

        <h1 className={styles.title}>Add your Team</h1>

        <div className={styles.grid}>
          <div className={styles.column}>
            <TeamForms
              buttonText="Create my Team"
              inputsToUse={inputsToUse}
              inputState={this.props.inputState}
              formError={this.state.formError}
              formSuccess={this.state.formSuccess}
              shakeBtn={this.state.shakeBtn}
              handleChange={this.props.handleChange}
              handleSubmit={this.handleSubmit}
              handleAddFeature={this.handleAddFeature}
              populate={planTitle} />
          </div>
          <div className={styles.column}>
            <h3 className={styles.subtitle}>Your Team</h3>
            <TeamCard team={values}  />
            {selectedPlan ?
              <div className={styles.planShowing}>
                <h3 className={styles.subtitle}>Your chosen plan (can change later)</h3>
                <PlanCard plan={selectedPlan} makeClickable={false} />
              </div>
              :
              null
            }
          </div>
        </div>
      </div>
    );
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();
    const {name, desc, planId, planName} = values;

    //don't submit if there's errors showing
    if (errors.name || errors.desc || errors.planId) {
      this.setState({
        shakeBtn: true
      });
      window.setTimeout(() => {
        this.setState({
          shakeBtn: false
        });
      }, 3000);
      return false;
    }

    //Don't submit if all fields aren't filled out
    if (!name || !desc || !planId ) {
      this.setState({
        formError: "Please fill out all fields",
        shakeBtn: true
      });
      window.setTimeout(() => {
        this.setState({
          shakeBtn: false
        });
      }, 3000);
      return false;
    }

    Meteor.call('Team.create', {
      name: name,
      desc: desc,
      planId: planId,
      planName: planName
    }, (error) => {
      if (error) {
        this.setState({
          formError: error.reason,
          shakeBtn: true
        });
        window.setTimeout(() => {
          this.setState({
            shakeBtn: false
          });
        }, 3000);
        return;
      } else {
        this.setState({
          formError: "",
          formSuccess: "Success! Team Created!"
        });
        window.setTimeout(() => {
          this.history.pushState(null, `/teams`);
        }, 1000);
      }
    });
  }
}
