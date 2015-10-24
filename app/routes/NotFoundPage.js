import React, {Component} from 'react';
import Mailto from 'react-mailto';
import styles from './home.css';
import Icon from '../components/Icons/Icon';

export default class NotFoundPage extends Component {

  render() {
    return (
      <div>
        <div className={styles.section1}>
          <div className={styles.heroGrid}>
            <div className={styles.heroColumn}>
              <h1 className={styles.white}>404 - Page Not Found</h1>
              <a href="/"><button className={styles.primary}>Back to the main site</button></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
