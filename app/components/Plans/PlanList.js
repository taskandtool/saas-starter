import React, { PropTypes } from 'react';
import moment from 'moment';
import {Link} from 'react-router';
import PlanItem from './PlanItem.js';

import styles from './planList.css';

export default class PlanList extends React.Component {
  static propTypes = {
    plans: PropTypes.array
  }

  render() {
    let createPlanButton = <Link to='/super-global-dashboard/plan/add'><button className={styles.btn}>Create new plan</button></Link>;

    if (!this.props.plans) return createPlanButton;

    let plans = this.props.plans.map((plan) => {
      return (
          <PlanItem key={plan._id} plan={plan} makeClickable={true} />
      );
    })

    return (
      <div className={styles.wrapper}>
        <div className={styles.holder} >
          <h1 className={styles.title}>{plans.length} Plans</h1>
          {createPlanButton}
        </div>
        <div className={styles.container} >
          {plans}
        </div>
      </div>
    );
  }
}
