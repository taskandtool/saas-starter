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

    //Find out if feature props are given (ie. when creating plan)
    let feats;
    if (this.props.features) {
      feats = this.props.features
    } else if (plan.features) {
      feats = plan.features
    }

    let featureList;
    //if there are features then display them.
    if (feats) {
      featureList = feats.map((feature, i) => {
        return (
          <p key={i} className={styles.features}><Icon size="1.2em" icon="check" color='green' />{feature}</p>
        );
      })
    }

    return (
      <div key={plan._id}
        className={styles.cardShadow}
        onClick={this.props.makeClickable ? () => this.history.pushState(null, `/plan/${plan._id}`) : ''} >

        <div className={styles.header}>
          <h3 className={styles.planTitle}>{plan.title}</h3>
          <h1 className={styles.money}>${plan.monthlyPrice} <span className={styles.mo}>/MO</span></h1>
        </div>
        <div className={styles.info}>
          <p className={styles.desc}><em>{plan.desc}</em></p>
          <p className={styles.feature}>FEATURES</p>
          {featureList}
        </div>
      </div>
    );
  }
}
