import React, { PropTypes } from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import styles from './planItem.css';

export default class PlanList extends React.Component {
  static propTypes = {
  }

  render() {
    if (!this.props.plan) return null;

    let plan = this.props.plan;

    return (
      <div key={plan._id} className={styles.column}>
        <h2 className={styles.planTitle}>{plan.title}</h2>
        <p className={styles.date}>Created: {moment(plan.createdAt).format('MMMM DD, YYYY')}</p>
        <p className={styles.date}>Updated: {moment(plan.createdAt).format('MMMM DD, YYYY')}</p>
        <p className={styles.features}>{plan.desc}</p>
        <p className={styles.features}>${plan.monthlyPrice} /MO</p>
        <p className={styles.features}>Setup Fee: ${plan.setupPrice}</p>
        <p className={styles.features}>Max Projects: {plan.maxProjects}</p>
        <p className={styles.features}>Max Items: {plan.maxItems}</p>
        <p className={styles.features}>Free Trial Days: {plan.freeTrialDays}</p>
        <Link to={`/plan/${plan._id}`}><button>See Details</button></Link>
      </div>
    );
  }
}
