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

  handleSelectPlan(id, amount) {
    let newValue = _.extend({}, this.props.inputState.values);
    newValue["planId"] = id;
    newValue["amount"] = (amount * 100);
    this.props.setDefaultValues(newValue);
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();

    //needs to use var instead of const below so they're accessable in Stripe call.
    var {name, desc, planId, amount} = values;
    var user = this.props.currUser
    var email =
      user.emails && user.emails[0].address ?
      user.emails[0].address :
      'None@none.com';


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

    //Setup Stripe's checkout.js
    const handler = StripeCheckout.configure({
      key: Meteor.settings.public.testPublishableKey,
      token: function(token) {
        //Subscribe to plan on server
        Meteor.call('Team.charge', token, planId, email, user, (error, res) => {
          console.log(error, res)
        })
      }
    });

    //Open pop-up to ask for CC details
    handler.open({
      name: 'SaaS Starter',
      amount: amount
    })

    //Create actual team in app
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
      }
    });
  }
}
