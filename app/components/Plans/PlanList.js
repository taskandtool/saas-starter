import React, { PropTypes } from 'react';
import PlanCard from './PlanCard.js';

export default class PlanList extends React.Component {
  static propTypes = {
    plans: PropTypes.array.isRequired
  }

  render() {
    let plans = this.props.plans.map((plan) => {
      return (
        <div key={plan._id} className={this.props.cardStyle} >
          <PlanCard plan={plan} makeClickable={this.props.makeClickable} />
        </div>
      );
    })

    return (
      <div>
        {plans}
      </div>
    );
  }
}
