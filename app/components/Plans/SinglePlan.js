import React, { PropTypes } from 'react';
import moment from 'moment';
import PlanItem from './PlanItem.js';

import styles from './singlePlan.css';

export default class SinglePlan extends React.Component {
  static propTypes = {
    plan: PropTypes.object
  }

  onCheckedChanged = (e) => {
    Meteor.call('Plan.update', this.props.plan._id, {[e.target.name]: e.target.checked});
  }

  render() {
    const { plan } = this.props;

    if (!plan) return null;

    const { _id, createdAt, updatedAt, createdBy, title, desc, monthlyPrice, setupPrice,
              maxProjects, maxItems, freeTrialDays, teamsUsingItCount, currAvail, custom,
              isDeleted } = plan;

    return (
      <div className={styles.wrapper}>
        <PlanItem plan={plan} />
        <div className={styles.otherFields}>
          <h3 className={styles.subTitle}>More details</h3>
          <ul className={styles.listGroup}>
            <li>Plan ID: {_id}</li>
            <li>Number of Teams on this Plan: {teamsUsingItCount}</li>
          </ul>
          <h3 className={styles.subTitle}>Editable</h3>
          <ul className={styles.listGroup}>
            <li>Currently Available to Teams: {currAvail ? 'yes' : 'no'} <input type="checkbox" checked={!!currAvail} name='currAvail' onChange={this.onCheckedChanged}/></li>
            <li>Custom Plan? (not public): {custom ? 'yes' : 'no'} <input type="checkbox" checked={!!custom} name='custom' onChange={this.onCheckedChanged}/></li>
            <li>isDeleted (soft delete accessible for Super Admins): {isDeleted ? 'yes' : 'no'} <input type="checkbox" checked={!!isDeleted} name='isDeleted' onChange={this.onCheckedChanged}/></li>
          </ul>
        </div>
      </div>
    );
  }
}
