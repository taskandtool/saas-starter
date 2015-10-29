import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import {Plans} from '../../schemas';
import PlanList from '../../components/Plans/PlanList';
import Spinner from '../../components/Spinner/Spinner';
import styles from './list.css';
import {Link} from 'react-router';

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
    let plans = this.data.plans;

    return (
      <div className="wrapper">
        <h1 className="title">{plans.length} Plans</h1>
        <div className={styles.grid}>
          <Link to='/super-global-dashboard/plan/add'>
            <button className={styles.btn}>Create new plan</button>
          </Link>
          {plans ?
            <PlanList plans={plans} cardStyle={styles.column} makeClickable={true} />
          : null }
        </div>
      </div>
    );
  }
}
