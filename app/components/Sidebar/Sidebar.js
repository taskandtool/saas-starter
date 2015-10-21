import React from 'react';
import {Link, History} from 'react-router';
import reactMixin from 'react-mixin';
import styles from './sidebar.css';

@reactMixin.decorate(History)
export default class Sidebar extends React.Component {
  constructor() {
    super();
    this.handleBrandClick = this.handleBrandClick.bind(this);
  }

  render() {
    const user = this.props.user;
    let content;

    if (user) {
      content = (
          <ul className={styles.sidebarList}>
            <li className={styles.item}>
              <Link to={`/user/${user._id}`} className={styles.link} activeClassName={styles.active} >{user.profile.name}'s Widgets</Link>
            </li>
            <li className={styles.item}>
              <Link to="/super-global-dashboard" className={styles.link} activeClassName={styles.active}>Dashboard</Link>
            </li>
          </ul>
      );
    } else {
      content = (
            <ul className={styles.sidebarList}>
              <li className={styles.item}><Link to="/" className={styles.link} activeClassName={styles.active}>Browse</Link></li>
              <li className={styles.item}><Link to="/join" className={styles.link} activeClassName={styles.active}>Get Started</Link></li>
            </ul>
      );
    }

    return (
      <div className={styles.sidebar}>
          <span className={styles.heading}>
            <i className="fa fa-bars" onClick={this.props.handleMenuClick}></i>
            <span className={styles.menu} onClick={this.handleBrandClick}> BRAND NAME</span>
          </span>
        <ul className={styles.sidebarList}>
          <li className={styles.item}><Link to="/plans" className={styles.link} activeClassName={styles.active}>Plans</Link></li>
          <li className={styles.item}><Link to="/users" className={styles.link} activeClassName={styles.active}>Users</Link></li>

        </ul>
        { content }
      </div>
    );
  }

  handleBrandClick() {
    this.history.pushState(null, `/`);
  }
}
