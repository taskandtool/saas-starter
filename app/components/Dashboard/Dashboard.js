import React, {Component} from 'react';
import styles from './dashboard.css';

export default class Home extends Component {

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Dashboard</h1>
        <h3>Daily Active Users</h3>
        Chart
        <h3>Total Users</h3>
        Chart
      </div>
    );
  }
}
