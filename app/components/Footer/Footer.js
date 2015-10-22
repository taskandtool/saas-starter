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
            Made with Coffee
          </div>
        </div>
      </div>

    );
  }
}
