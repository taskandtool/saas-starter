import React, { PropTypes } from 'react';
import moment from 'moment';
import reactMixin from 'react-mixin';
import {History} from 'react-router';

import styles from './planItem.css';

@reactMixin.decorate(History)
export default class PlanList extends React.Component {
  static propTypes = {
  }

  render() {
    if (!this.props.plan) return null;

    let plan = this.props.plan;

    return (
      <div key={plan._id} className={styles.column} onClick={this.props.makeClickable ? () => this.history.pushState(null, `/plan/${plan._id}`) : ''}>
        <img src="https://unsplash.it/500/150/?random" className={styles.bannerImg} />
        <div className={styles.info}>
          <h2 className={styles.planTitle}>{plan.title}</h2>
          <p className={styles.date}>Created: {moment(plan.createdAt).format('MMMM DD, YYYY')}</p>
          <p className={styles.date}>Updated: {moment(plan.createdAt).format('MMMM DD, YYYY')}</p>
          <p className={styles.features}>{plan.desc}</p>
          <p className={styles.features}>${plan.monthlyPrice} /MO</p>
          <p className={styles.features}>Setup Fee: ${plan.setupPrice}</p>
          <p className={styles.features}>Max Projects: {plan.maxProjects}</p>
          <p className={styles.features}>Max Items: {plan.maxItems}</p>
          <p className={styles.features}>Free Trial Days: {plan.freeTrialDays}</p>
        </div>
      </div>
    );
  }
}
