import React, { PropTypes } from 'react';
import moment from 'moment';
import reactMixin from 'react-mixin';
import {History} from 'react-router';
import Icon from '../Icons/Icon.js';
import styles from './planCard.css';

@reactMixin.decorate(History)
export default class PlanCard extends React.Component {
  static propTypes = {
  }

  render() {
    if (!this.props.plan) return null;

    let plan = this.props.plan;

    let features

    // let features = plan.features.map((feature, i) => {
    //   return (
    //     <p className={styles.features}>{plan[i]}</p>
    //   );
    // });

    return (
      <div key={plan._id}
        className="cardShadow"
        onClick={this.props.makeClickable ? () => this.history.pushState(null, `/plan/${plan._id}`) : ''} >

        <div className={styles.header}>
          <h3 className={styles.planTitle}>{plan.title}</h3>
          <h1 className={styles.money}>${plan.monthlyPrice} <span className={styles.mo}>/MO</span></h1>
        </div>
        <div className={styles.info}>
          <p className={styles.desc}><em>{plan.desc}</em></p>
          <p className={styles.feature}>FEATURES</p>
          <p className={styles.features}><Icon size="1.2em" icon="check" color='green' />{plan['1']}</p>
          <p className={styles.features}>{plan['2']}</p>
          <p className={styles.features}>{plan['3']}</p>
          <p className={styles.features}>{plan['4']}</p>
          <p className={styles.features}>{plan['5']}</p>
          <p className={styles.features}>{plan['6']}</p>
          <p className={styles.features}>{plan['7']}</p>
          <p className={styles.features}>{plan['8']}</p>
          <p className={styles.features}>{plan['9']}</p>

        </div>
      </div>
    );
  }
}
