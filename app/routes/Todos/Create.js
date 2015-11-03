import React, { PropTypes } from 'react';
import {handleForms} from '../../components/Forms/FormDecorator';
import {History, Link} from 'react-router';
import reactMixin from 'react-mixin';
import TodoCard from '../../components/Todos/TodoCard.js';
import Helmet from 'react-helmet';
import styles from './create.css';
import {Todos} from '../../schemas';
import TodoForms from '../../components/Todos/TodoForms';

@handleForms
@reactMixin.decorate(History)
export default class TodoCreateRoute extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddFeature = this.handleAddFeature.bind(this);
    this.listenForEnter = this.listenForEnter.bind(this);
    this.state = {
      shakeBtn: false,
      formError: '',
      formSuccess: '',
      features: ["feature"]
    }
  }

  render() {
    let values = this.props.inputState.values;
    let errors = this.props.inputState.errors;

    //Get values of however many features.
    let features =  _.map(values, (value, key, object) => {
      if (key.match(/(feature)\w+/g)) {
        return value
      }
    });
    //gets rid of undefined and empty feature string values
    features = _.compact(features);


    //Establishes todo inputs to use in the form, including indeterminate amount of features
    let inputsToUse = [
      "title",
      "monthlyPrice",
      "desc",
      this.state.features,
      "setupPrice",
      "maxProjects",
      "maxItems",
      "freeTrialDays",
      "currAvail",
      "displayOnMainSite"
    ];
    //flatten array to seamlessly include features
    inputsToUse = [].concat.apply([], inputsToUse);

    return (
      <div className={styles.wrapper}>
        <Helmet
          title="Create New Todo"
          meta={[
              {"name": "description", "content": "Create New Todo"}
          ]}
        />

        <h1 className={styles.title}>Add a New Todo</h1>
        <div className={styles.grid}>
          <div className={styles.column}>
            <TodoForms
              buttonText="Add Todo"
              inputsToUse={inputsToUse}
              inputState={this.props.inputState}
              formError={this.state.formError}
              formSuccess={this.state.formSuccess}
              shakeBtn={this.state.shakeBtn}
              handleChange={this.props.handleChange}
              handleSubmit={this.handleSubmit}
              handleAddFeature={this.handleAddFeature} />
          </div>
          <div className={styles.column}>
            <TodoCard todo={values} features={features}  />
          </div>
        </div>
      </div>
    );
  }

  handleAddFeature(e) {
    let features = this.state.features.slice();
    features.push("feature");
    this.setState({
      features: features
    });

    //prevent scrolling on click
    e.preventDefault();
  }

  componentDidMount() {
    window.onkeydown = this.listenForEnter;
  }

  listenForEnter(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
      this.handleAddFeature(e);
    }
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();

    //don't submit if there's errors showing
    //underscore method to ensure all errors are empty strings
    let errorValues = _.values(errors);
    if (! _.every(errorValues, function(str){ return str === ''; })) {
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

    const {title, monthlyPrice, setupPrice, desc, maxProjects, maxItems, freeTrialDays, currAvail, displayOnMainSite} = values;

    //Get values of however many features.
    let features =  _.map(values, (value, key, object) => {
      if (key.match(/(feature)\w+/g)) {
        return value
      }
    });
    //gets rid of undefined and empty feature string values
    features = _.compact(features);

    //Don't submit if required fields aren't filled out
    let requiredValues = [title, monthlyPrice];
    if (_.some(requiredValues, function(str){ return str == undefined; })) {
      this.setState({
        formError: "Please fill out title and monthly price",
        shakeBtn: true
      });
      window.setTimeout(() => {
        this.setState({
          shakeBtn: false
        });
      }, 3000);
      return false;
    }

    Meteor.call('Todo.create', {
      title: title,
      monthlyPrice: parseInt(monthlyPrice),
      setupPrice: parseInt(setupPrice),
      desc: desc,
      features: features,
      maxItems: parseInt(maxItems),
      maxProjects: parseInt(maxProjects),
      freeTrialDays: parseInt(freeTrialDays),
      currAvail: !!currAvail,
      displayOnMainSite: !!displayOnMainSite
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
          formSuccess: "Success! Todo Created!"
        });
        window.setTimeout(() => {
          this.history.pushState(null, `/todos`);
        }, 1000);
      }
    });
  }
}
