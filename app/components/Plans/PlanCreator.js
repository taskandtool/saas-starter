//import '../../styles/global.styl';
//import styles from './styles.styl';

import React, { PropTypes } from 'react';
import InputStacked from '../Forms/InputStacked';

//import CSSModules from 'react-css-modules';

//@CSSModules(styles)
export default class PlanCreator extends React.Component {

  constructor() {
    super();
    this.state = {errors: {}};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    const title = event.target.title.value;
    const monthlyPrice = Number(event.target.monthlyPrice.value);
    const setupPrice = Number(event.target.setupPrice.value);
    const desc = event.target.desc.value;
    const maxProjects = Number(event.target.maxProjects.value);
    const maxItems = Number(event.target.maxItems.value);
    const freeTrialDays = Number(event.target.freeTrialDays.value);
    const currAvail = !!event.target.currAvail.checked;
    const custom = !!event.target.custom.checked;

    const errors = {};

    if (! title) {
      errors.title = 'Title required';
    }

    if (! monthlyPrice ) {
      errors.monthlyPrice = 'Monthly Price required';
    }

    this.setState({
      errors: errors
    });

    if (! _.isEmpty(errors)) {
      // Form errors found, do not create user
      return;
    }

    Meteor.call('Plan.create', {
      title: title,
      monthlyPrice: monthlyPrice,
      setupPrice: setupPrice,
      desc: desc,
      maxItems: maxItems,
      maxProjects: maxProjects,
      freeTrialDays: freeTrialDays,
      currAvail: currAvail,
      custom: custom
    }, (error) => {
      if (error) {
        this.setState({
          errors: { 'none': error.reason }
        });

        return;
      }

      // this.transitionTo('/'); waiting for decorator support reactrouter
    });
  }


  render() {

    return (
      <div styleName="wrapper">
        <form onSubmit={ this.onSubmit }>

          <InputStacked
            errorMsg={!!this.state.errors.title}
            type="text"
            name="title"
            label="Plan Title"
            iconClass="icon-email" />

          <InputStacked
            errorMsg={!!this.state.errors.monthlyPrice}
            type="number"
            name="monthlyPrice"
            label="Monthly Price"
            iconClass="icon-lock" />

          <InputStacked
            type="number"
            name="setupPrice"
            label="Setup Price"
            iconClass="icon-lock" />

          <InputStacked
            type="text"
            name="desc"
            label="Description"
            iconClass="icon-lock" />

          <InputStacked
            type="number"
            name="maxProjects"
            label="Max Projects (0 for unlimited)"
            iconClass="icon-lock" />

          <InputStacked
            type="number"
            name="maxItems"
            label="Max Items (0 for unlimited)"
            iconClass="icon-lock" />

          <InputStacked
            type="number"
            name="freeTrialDays"
            label="Free Trial Days"
            iconClass="icon-lock" />

          <InputStacked
            type="checkbox"
            name="currAvail"
            label="Currently Available?"
            iconClass="icon-lock" />

          <InputStacked
            type="checkbox"
            name="custom"
            label="Custom Plan?"
            iconClass="icon-lock" />

          <button type="submit" className="btn-primary">
            Create Plan
          </button>
        </form>
      </div>
    );
  }
}
