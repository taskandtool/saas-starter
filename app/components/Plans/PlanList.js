import React, { PropTypes } from 'react';
import moment from 'moment';
import {Link} from 'react-router';

import styles from './planList.css';

export default class PlanList extends React.Component {
  static propTypes = {
    plans: PropTypes.array
  }

  render() {

    let plans = this.props.plans.map((plan) => {
      let formattedCreatedAt = moment(plan.createdAt).format('MMMM DD, YYYY')
      return (
        <tr key={plan._id}>
          <td><Link to={`/plan/${plan._id}`}>{plan._id}</Link></td>
          <td>{moment(plan.createdAt).format('MMMM DD, YYYY')}</td>
          <td>{plan.createdBy}</td>
          <td>{plan.title}</td>
          <td>{plan.monthlyPrice}</td>
          <td>{plan.setupPrice}</td>
        </tr>
      );
    })

    //if (!plan) return null;

    //const { _id, createdAt, createdBy, title, monthlyPrice, setupPrice } = plan;

    return (
      <div className={styles.wrapper}>
        <h1>Plan list - {this.props.plans.length} Total</h1>
        <Link to='/super-global-dashboard/plan/add'>Create ndew plan</Link>
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Created At</th>
              <th>Created By</th>
              <th>Title</th>
              <th>Monthly Price</th>
              <th>Setup Price</th>
            </tr>
          </thead>
          {plans}
        </table>
      </div>
    );
  }
}
