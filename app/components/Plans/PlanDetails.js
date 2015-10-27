import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import styles from './planDetails.css';

export default class SinglePlan extends Component {
  static propTypes = {
    plan: PropTypes.object
  }

  render() {
    const { plan } = this.props;
    console.log('hi')

    const { _id, createdAt, updatedAt, createdBy, title, desc, monthlyPrice, setupPrice,
              maxProjects, maxItems, freeTrialDays, teamsUsingItCount, currAvail, displayOnMainSite,
              isDeleted } = plan;

    return (
        <ul className={styles.listGroup}>
          <li>Plan ID: {_id}</li>
          <li>There are {teamsUsingItCount} teams on this plan</li>
          <li>Created: {moment({createdAt}).format('MMMM DD, YYYY')}</li>
          <li>Updated: {moment({updatedAt}).format('MMMM DD, YYYY')}</li>
          <li>Setup price: {setupPrice}</li>
          <li>Max Projects: {maxProjects}</li>
          <li>Max Items: {maxItems}</li>
          <li>Free Trial Days: {freeTrialDays}</li>
          <li>Currently Available? {currAvail ? 'True' : 'False'}</li>
          <li>Display on Main Site? {displayOnMainSite ? 'True' : 'False'}</li>
          <li>Is Deleted? {isDeleted ? 'True' : 'False'}</li>
        </ul>
    );
  }
}
