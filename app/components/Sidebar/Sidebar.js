import React from 'react';
import {Link, History} from 'react-router';
import reactMixin from 'react-mixin';
import styles from './sidebar.css';
import Icon from '../Icons/Icon';


@reactMixin.decorate(History)
export default class Sidebar extends React.Component {
  constructor() {
    super();
    this.handleBrandClick = this.handleBrandClick.bind(this);
    this.listenForClose = this.listenForClose.bind(this);
  }

  render() {
    const user = this.props.user;
    let content;

    if (user) {
      content = (
          <ul className={styles.sidebarList} onClick={this.props.handleToggleSidebar}>
            <li className={styles.item}>
              <Link to={`/user/${user._id}`} className={styles.link} activeClassName={styles.active} >{user.profile.name}'s Profile</Link>
            </li>
            <li className={styles.item}>
              <Link to="/super-global-dashboard" className={styles.link} activeClassName={styles.active}>Dashboard</Link>
            </li>
          </ul>
      );
    } else {
      content = (
            <ul className={styles.sidebarList} onClick={this.props.handleToggleSidebar}>
              <li className={styles.item}><Link to="/join" className={styles.link} activeClassName={styles.active}>Get Started</Link></li>
            </ul>
      );
    }



    return (
        <div className={styles.sidebar}>
            <span className={styles.heading} onClick={this.props.handleToggleSidebar}>
              <span className={styles.menu} onClick={this.handleBrandClick}> STARTER APP</span>
            </span>
            <span className={styles.close}>
              <Icon size="2em" icon="close" color="#fff" onClick={this.props.handleToggleSidebar} />
            </span>
          <ul className={styles.sidebarList} onClick={this.props.handleToggleSidebar}>
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

  listenForClose(e) {
    e = e || window.event;
    if (!this.props.showSidebar && (e.key === 'Escape' || e.keyCode === 27)) {
      this.props.handleToggleSidebar();
    }
  }

  componentDidMount() {
    window.onkeydown = this.listenForClose;
  }
}
