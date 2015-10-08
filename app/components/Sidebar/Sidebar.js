import React from 'react';
import {Link, History} from 'react-router';
import reactMixin from 'react-mixin';
import styles from './sidebar.css';

export default class Sidebar extends React.Component {
  constructor() {
    super();
  }

  render() {
    const user = this.props.user;
    let content;

    if (user) {
      content = (
          <ul className={styles.sidebarList}>
            <li className={styles.item}><Link to="/" className={styles.link}>{user.profile.name}'s Widgets</Link></li>
          </ul>
      );
    } else {
      content = (
            <ul className={styles.sidebarList}>
              <li className={styles.item}><Link to="/" className={styles.link}>Browse</Link></li>
              <li className={styles.item}><Link to="/join" className={styles.link}>Get Started</Link></li>
            </ul>
      );
    }

    return (
      <div className={styles.sidebar}>
          <a href="#" onClick={this.props.handleMenuClick}
                      className={styles.heading}>
            <i className="fa fa-bars"></i>
            <span className={styles.menu}> BRAND NAME</span>
          </a>
        <ul className={styles.sidebarList}>
          <li className={styles.item}><Link to="/" className={styles.link}>Home</Link></li>
          <li className={styles.item}><Link to="/plans" className={styles.link}>Plans</Link></li>
          <li className={styles.item}><Link to="/users" className={styles.link}>Users</Link></li>
        </ul>
        { content }
      </div>
    );
  }
}
