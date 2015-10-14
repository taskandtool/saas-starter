import React, {Component} from 'react';
import DailyActiveUsers from '../components/Dashboard/DailyActiveUsers.js';
import styles from './dashboard.css';

export default class Dashboard extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Dashboard</h1>
        <h3>Daily Active Users</h3>
        <DailyActiveUsers/>
        <h3>Total Users</h3>
        Chart
      </div>
    );
  }
}
