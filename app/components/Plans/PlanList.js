import React, { PropTypes } from 'react';
import moment from 'moment';
import {Link} from 'react-router';
import PlanCard from './PlanCard.js';
import styles from './planList.css';

export default class PlanList extends React.Component {
  static propTypes = {
    plans: PropTypes.array
  }

  render() {
    if (!this.props.plans) {
      let plans;
    }

    let plans = this.props.plans.map((plan) => {
      return (
        <div key={plan._id} className={styles.column} >
          <PlanCard plan={plan} makeClickable={true} />
        </div>
      );
    })

    return (
      <div className="wrapper">
        <h1 className="title">{plans.length} Plans</h1>
        <Link to='/super-global-dashboard/plan/add'>
          <button className={styles.btn}>Create new plan</button>
        </Link>
        <div className={styles.container} >
          {plans}
        </div>
      </div>
    );
  }
}
