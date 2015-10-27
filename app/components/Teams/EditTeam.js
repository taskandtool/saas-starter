import React, { PropTypes, Component } from 'react';
import {handleForms} from '../Forms/FormDecorator';
import {History, Link} from 'react-router';
import reactMixin from 'react-mixin';
import TeamCard from './TeamCard.js';
import Helmet from 'react-helmet';
import styles from './editTeam.css';
import {Teams} from '../../schemas';
import TeamForms from './TeamForms';

@handleForms
@reactMixin.decorate(History)
export default class EditTeam extends Component {
  static propTypes = {
    team: React.PropTypes.object
  }

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.listenForEnter = this.listenForEnter.bind(this);
    this.state = {
      shakeBtn: false,
      formError: '',
      formSuccess: ''
    }
  }

  render() {
    let values = this.props.inputState.values;
    let errors = this.props.inputState.errors;

    //Establishes team inputs, including indeterminate amount of features
    let inputsToUse = [
      "name",
      "desc",
      "planId",
      "isDeleted",
    ];

    return (
      <div className="wrapper">
        <Helmet
          title="Edit Team"
          meta={[
              {"name": "description", "content": "Edit Team"}
          ]}
        />

        <h1 className="title">Edit Team: {this.props.team.title}</h1>
        <div className={styles.grid}>
          <div className={styles.column}>
            <TeamForms
              buttonText="Update Team"
              inputsToUse={inputsToUse}
              inputState={this.props.inputState}
              formError={this.state.formError}
              formSuccess={this.state.formSuccess}
              shakeBtn={this.state.shakeBtn}
              handleChange={this.props.handleChange}
              handleSubmit={this.handleSubmit}
              handleAddFeature={this.handleAddFeature}
              team={this.props.team} />
          </div>
          <div className={styles.column}>
            <TeamCard team={values}  />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    let team = this.props.team
    const {name, desc, planId, isDeleted} = team

    let data = {
      name: name,
      desc: desc,
      planId: planId,
      isDeleted: !!isDeleted,
    }

    //sets default values in handle forms decorators
    this.props.setDefaultValues(data);

    window.onkeydown = this.listenForEnter;
  }

  listenForEnter(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
      this.handleSubmit(e);
    }
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();

    const {name, desc, planId, isDeleted} = values;

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

    Meteor.call('Team.update', this.props.team._id, {
      name: name,
      desc: desc,
      planId: planId,
      isDeleted: isDeleted
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
          formSuccess: "Team Successfully Changed!"
        });
        window.setTimeout(() => {
          this.history.pushState(null, `/teams`);
        }, 1000);
      }
    });
  }
}
