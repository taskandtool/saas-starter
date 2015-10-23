import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import {Plans} from '../../schemas';
import PlanList from '../../components/Plans/PlanList';
import Spinner from '../../components/Utils/Spinner';

@reactMixin.decorate(ReactMeteorData)
export default class PlanListRoute extends Component {

  getMeteorData() {
    let handle = Meteor.subscribe("plans");
    return {
      plans: Plans.find({}, {sort: {createdAt: -1}}).fetch(),
      loading: !handle.ready()
    };
  }

  render() {
    if (this.data.loading) {
      return (<div className="wrapper"><Spinner /></div>);
    }

    return (
      <PlanList plans={this.data.plans} />
    );
  }
}
