import React, { PropTypes } from 'react';
import {handleForms} from '../../components/Forms/FormDecorator';
import {History, Link} from 'react-router';
import reactMixin from 'react-mixin';
import PlanCard from '../../components/Plans/PlanCard.js';
import Helmet from 'react-helmet';
import styles from './create.css';
import {Plans} from '../../schemas';
import InputStacked from '../../components/Forms/InputStacked';

@handleForms
@reactMixin.decorate(History)
export default class PlanCreateRoute extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddFeature = this.handleAddFeature.bind(this);
    this.listenForClose = this.listenForClose.bind(this);
    this.state = {
      shakeBtn: false,
      featureCount: 1,
      formError: '',
      formSuccess: '',
      features: [<InputStacked
                key="1"
                type="text"
                name="feature1"
                label="Feature"
                value={this.props.formState.values['feature1']}
                handleChange={this.props.handleChange}
                />]
    }
  }

  render() {
    let values = this.props.formState.values;
    let errors = this.props.formState.errors;

    //Get values of however many features. Not bothering getting
    //errors because we're not validating feature field.
    let features =  _.map(values, (value, key, object) => {
      if (key.match(/(feature)\w+/g)) {
        return value
      }
    });

    //gets rid of undefined and empty feature strings
    features = _.compact(features);

    return (
      <div className="wrapper">
        <Helmet
          title="Create New Plan"
          meta={[
              {"name": "description", "content": "Create New Plan"}
          ]}
        />

        <h1 className="title">Add a New Plan</h1>
        <div className={styles.grid}>
          <div className={styles.column}>
            <form id="form" className={styles.form}>
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
                type="text"
                name="desc"
                label="Description"
                value={values.desc}
                errorMsg={errors.desc}
                handleChange={this.props.handleChange}
                />

              {this.state.features}

              <a href="#" className={styles.btnFeatures} onClick={this.handleAddFeature}>Add another feature</a>

              <h3 className="subtitle">More settings</h3>
              <hr />

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
                name="displayOnMainSite"
                label="Display On Main Site?"
                value={values.displayOnMainSite}
                errorMsg={errors.displayOnMainSite}
                handleChange={this.props.handleChange}
                required={false}
                validateBy={null}
                />

            </form>

            <div className={styles.error}>{this.state.formError}</div>
            <div className={styles.success}>{this.state.formSuccess}</div>

            <button
              type="submit"
              className={this.state.shakeBtn ? styles.btnShake : styles.btn}
              onClick={() => this.handleSubmit(event, errors, values, features)} >
              Create Plan
            </button>
          </div>
          <div className={styles.column}>
            <PlanCard plan={values} features={features} />
          </div>
        </div>
      </div>
    );
  }

  handleAddFeature(e) {
    let features = this.state.features.slice();
    let count = this.state.featureCount + 1;

    features.push(<InputStacked
              key={count}
              type="text"
              name={"feature" + count}
              label={"Feature"}
              value={this.props.formState.values[count]}
              handleChange={this.props.handleChange}
              />);

    this.setState({
      featureCount: this.state.featureCount + 1,
      features: features
    });

    //prevent scrolling
    e.preventDefault();
  }

  componentDidMount() {
    window.onkeydown = this.listenForClose;
  }

  listenForClose(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
      this.handleAddFeature(e);
    }
  }

  handleSubmit(event, errors, values, features) {
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

    let requiredValues = [title, monthlyPrice];
    console.log(requiredValues);
    if (_.some(requiredValues, function(str){ return str == undefined; })) {
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

    Meteor.call('Plan.create', {
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
          formError: "Missing Required Fields",
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
          formSuccess: "Success! Plan Created!"
        });
        window.setTimeout(() => {
          this.history.pushState(null, `/plans`);
        }, 1000);
      }
    });
  }
}
