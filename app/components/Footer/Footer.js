import React from 'react';
import {Link, History} from 'react-router';
import styles from './footer.css';
import reactMixin from 'react-mixin';

@reactMixin.decorate(History)
export default class Footer extends React.Component {

  render() {
    return (
      <div className={styles.footer}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <Link to='/' className={styles.link}>Example link to home</Link>
          </div>
          <div className={styles.column}>
            <Link to='https://github.com/taskandtool/saas-starter' className={styles.link}>Github</Link>
          </div>
          <div className={styles.column}>
            <p>Email me</p>
          </div>
        </div>
      </div>

    );
  }
}
