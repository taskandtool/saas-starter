import React, {Component} from 'react';
import styles from './home.css';

export default class Home extends Component {

  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Home</h1>
        <p>This could be a sales page or demo page</p>

      </div>
    );
  }
}
