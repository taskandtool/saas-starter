import React, { PropTypes } from 'react';
import moment from 'moment';
import reactMixin from 'react-mixin';
import {History} from 'react-router';

import styles from './planCard.css';

@reactMixin.decorate(History)
export default class PlanCard extends React.Component {
  static propTypes = {
  }

  render() {
    if (!this.props.plan) return null;

    let plan = this.props.plan;

    return (
      <div key={plan._id}
        className="cardShadow"
        onClick={this.props.makeClickable ? () => this.history.pushState(null, `/plan/${plan._id}`) : ''} >

        <div className={styles.header}>
          <h3 className={styles.planTitle}>{plan.title}</h3>
          <h1 className={styles.money}>${plan.monthlyPrice} <span className={styles.mo}>/MO</span></h1>
        </div>
        <div className={styles.info}>
          <p className={styles.features}>{plan.desc}</p>
          <p className={styles.features}>FEATURES:</p>
          <p className={styles.features}>{plan.feature}</p>
        </div>
      </div>
    );
  }
}
