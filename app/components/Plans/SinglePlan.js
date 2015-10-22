import React, { PropTypes } from 'react';
import moment from 'moment';
import PlanCard from './PlanCard.js';
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
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.subTitle}>More details</h3>
            <ul className={styles.listGroup}>
              <li>Plan ID: {_id}</li>
              <li>There are {teamsUsingItCount} teams on this plan</li>
            </ul>
            <h3 className={styles.subTitle}>Things you can edit:</h3>
            <ul className={styles.listGroup}>
              <li>
                <input type="checkbox"
                        checked={!!currAvail}
                        name='currAvail'
                        onChange={this.onCheckedChanged}/> Currently Available to Teams?
              </li>
              <li>
                <input type="checkbox"
                        checked={!!custom}
                        name='custom'
                        onChange={this.onCheckedChanged}/> Custom Plan?
              </li>
              <li>
                <input type="checkbox"
                  checked={!!isDeleted}
                  name='isDeleted'
                  onChange={this.onCheckedChanged}/> Is Soft-Deleted?
              </li>
            </ul>
          </div>
          <PlanCard plan={plan} />
        </div>
      </div>
    );
  }
}
