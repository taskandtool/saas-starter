import React, { PropTypes } from 'react';
import {handleForms} from '../../components/Forms/FormDecorator';
import {History, Link} from 'react-router';
import reactMixin from 'react-mixin';
import TeamCard from '../../components/Teams/TeamCard.js';
import Helmet from 'react-helmet';
import styles from './create.css';
import {Teams, Plans} from '../../schemas';
import TeamForms from '../../components/Teams/TeamForms';
import {Typeahead} from 'react-typeahead';

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

    //get plans
    let planTitle = this.data.plans.map((plan) => {
      return <option key={plan._id} value={plan._id}>{plan.title}</option>
    });

    let inputsToUse = [
      "name",
      "desc",
      "planId"
    ];

    return (
      <div className="wrapper">
        <Helmet
          title="Create New Team"
          meta={[
              {"name": "description", "content": "Create New Team"}
          ]}
        />


        <h1 className="title">Add a New Team</h1>

        <div className={styles.grid}>
          <div className={styles.column}>
            <TeamForms
              buttonText="Add Team"
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
            <TeamCard team={values}  />
          </div>
        </div>
      </div>
    );
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();
    const {name, desc, planId} = values;

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
      planId: planId
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
