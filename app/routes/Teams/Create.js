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
    this.state = {
      shakeBtn: false,
      formError: '',
      formSuccess: ''
    }
  }


  render() {
    let values = this.props.inputState.values;
    let errors = this.props.inputState.errors;

    let inputsToUse = [
      "name",
      "desc"
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

        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.subtitle}>Add my Team</h3>

            <TeamForms
              buttonText="Create my Team"
              inputsToUse={inputsToUse}
              inputState={this.props.inputState}
              formError={this.state.formError}
              formSuccess={this.state.formSuccess}
              shakeBtn={this.state.shakeBtn}
              handleChange={this.props.handleChange}
              handleSubmit={this.handleSubmit} />
          </div>
          {this.props.inputState.values.name ?
          <div className={styles.column}>
            <h3 className={styles.subtitle}>My Team</h3>
            <TeamCard team={values}  />
          </div>
          : null}
        </div>
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

  handleSubmit(event, errors, values) {
    event.preventDefault();
    const {name, desc} = values;

    //don't submit if there's errors showing
    if (errors.name || errors.desc) {
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
    if (!name || !desc ) {
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
      desc: desc
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
