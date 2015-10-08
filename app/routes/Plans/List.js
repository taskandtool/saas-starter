import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import {Plans} from '../../collections';
import PlanList from '../../components/Plans/PlanList';

@reactMixin.decorate(ReactMeteorData)
export default class PlanListRoute extends Component {

  getMeteorData() {
    let handle = Meteor.subscribe("plans");
    return {
      plans: Plans.find().fetch(),
      loading: !handle.ready()
    };
  }

  render() {
    if (this.data.loading) {
      return (<p>'loading'</p>);
    }

    return (
      <PlanList plans={this.data.plans} />
    );
  }
}
