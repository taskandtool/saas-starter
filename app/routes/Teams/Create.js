import React, { PropTypes } from 'react';
import {handleForms} from '../../components/Forms/FormDecorator';
import {History, Link} from 'react-router';
import reactMixin from 'react-mixin';
import TeamCard from '../../components/Teams/TeamCard.js';
import Helmet from 'react-helmet';
import styles from './create.css';
import {Teams} from '../../schemas';
import TeamForms from '../../components/Teams/TeamForms';


@handleForms
@reactMixin.decorate(History)
export default class TeamCreateRoute extends React.Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.listenForEnter = this.listenForEnter.bind(this);
    this.handleSelectPlan = this.handleSelectPlan.bind(this);
    this.state = {
      shakeBtn: false,
    }
  }


  render() {
    let values = this.props.inputState.values;
    let errors = this.props.inputState.errors;

    let inputsToUse = [
      "name",
      "desc",
      "plans"
    ];

    return (
      <div className={styles.wrapper}>
        <Helmet
          title="Create New Team"
          meta={[
              {"name": "description", "content": "Create New Team"}
          ]}
        />

        <h1 className={styles.title}>Create Team</h1>

        {this.props.inputState.values.name ?
          <div className={styles.card}>
            <h3 className={styles.subtitle}>My Team</h3>
            <TeamCard team={values}  />
          </div>
        : null}

        <h3 className={styles.subtitle}>Add my Team</h3>

        <TeamForms
          buttonText="Create my Team!"
          inputsToUse={inputsToUse}
          inputState={this.props.inputState}
          shakeBtn={this.state.shakeBtn}
          handleChange={this.props.handleChange}
          handleSelectPlan={this.handleSelectPlan}
          handleSubmit={this.handleSubmit}
          team={{}} />

      </div>
    );
  }

  componentDidMount() {
    window.onkeydown = this.listenForEnter;
  }

  listenForEnter(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
      this.handleSubmit(e, this.props.inputState.errors, this.props.inputState.values);
    }
  }

  handleSelectPlan(id) {
    let newValue = _.extend({}, this.props.inputState.values);
    newValue["planId"] = id;
    this.props.setDefaultValues(newValue);
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();
    const {name, desc, planId} = values;

    //don't submit if there's errors showing
    if (errors.name || errors.desc) {
      this.props.showToast('<h3>Sorry...</h3><p>you must fix the errors showing</p>', 'error')
      this.setState({
        shakeBtn: true
      });
      window.setTimeout(() => {
        this.setState({
          shakeBtn: false
        });
      }, 1000);
      return false;
    }

    //Don't submit if all fields aren't filled out
    if (!name || !desc ) {
      this.props.showToast('<h3>Sorry...</h3><p>You have to fill out the name and description fields</p>', 'error')

      this.setState({
        shakeBtn: true
      });
      window.setTimeout(() => {
        this.setState({
          shakeBtn: false
        });
      }, 1000);
      return false;
    }

    Meteor.call('Team.create', {
      name: name,
      desc: desc,
      planId: planId
    }, (error) => {
      if (error) {
        this.props.showToast(error.reason, 'error')
        this.setState({
          shakeBtn: true
        });
        window.setTimeout(() => {
          this.setState({
            shakeBtn: false
          });
        }, 1000);
        return;
      } else {
        this.props.showToast('<h3>Team Created!</h3><p>Invite some friends and create shared public or private todos.</p>', 'success')
        window.setTimeout(() => {
          this.history.pushState(null, `/teams`);
        }, 1000);
      }
    });
  }
}
