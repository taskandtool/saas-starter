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
      featureCount: 1,
      features: [<InputStacked
                key="1"
                type="text"
                name="1"
                label="Feature"
                value={this.props.formState.values['1']}
                errorMsg={this.props.formState.errors['1']}
                handleChange={this.props.handleChange}
                />]
    }
  }

  render() {
    let values = this.props.formState.values;
    let errors = this.props.formState.errors;


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
          <div className={styles.column}>
            <PlanCard plan={values} />
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
              name={count}
              label={"Feature"}
              value={this.props.formState.values[count]}
              errorMsg={this.props.formState.errors[count]}
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

    const {title, monthlyPrice, features, setupPrice, desc, maxProjects, maxItems, freeTrialDays, currAvail, custom} = values;

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
