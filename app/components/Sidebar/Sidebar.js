import React, {PropTypes, Component} from 'react';
import {Link, History} from 'react-router';
import reactMixin from 'react-mixin';
import styles from './sidebar.css';
import Icon from '../Icons/Icon';


@reactMixin.decorate(History)
export default class Sidebar extends Component {

  static PropTypes = {
    user: PropTypes.object,
    team: PropTypes.object
  }

  constructor() {
    super();
    this.handleBrandClick = this.handleBrandClick.bind(this);
    this.listenForClose = this.listenForClose.bind(this);
  }

  render() {
    const user = Meteor.user();
    let content;

    //display link to global dashboard if superAdmin
    let isSuperAdmin = false;
    if (this.props.currentUser) {
      let permissions = this.props.currentUser.permissions;
      if (permissions) {
        permissions.map((permission) => {
          if (permission.roles[0] === "super-admin") {
            isSuperAdmin = true;
          }
        })
      }
    }

    if (user) {
      content = (
          <ul className={styles.sidebarList} onClick={this.props.handleToggleSidebar}>
            <li className={styles.item}>
              <Link to={`/user/${user._id}/todos`} className={styles.link} activeClassName={styles.active} >My Todos</Link>
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


    let superAdminContent = (
          <ul className={styles.sidebarList} onClick={this.props.handleToggleSidebar}>
            <hr className={styles.globalDashItem}/>
            <li className={styles.globalDashItem}>
              <Link to="/super-global-dashboard" className={styles.link} activeClassName={styles.active}>Global Dashboard</Link>
            </li>
          </ul>
    )


    return (
        <div className={this.props.showSidebar ? styles.sidebar : styles.sidebarClose} style={this.props.initialLoad ? {display: 'none'} : null}>
          <span className={styles.heading} onClick={this.props.handleToggleSidebar}>
            <span className={styles.menu} onClick={this.handleBrandClick}> STARTER APP</span>
          </span>
          <span className={styles.close}>
            <Icon size="2em" icon="close" color="#fff" onClick={this.props.handleToggleSidebar} />
          </span>
          { content }
          <ul className={styles.sidebarList} onClick={this.props.handleToggleSidebar}>
            <li className={styles.item}>
              <Link to="/teams" className={styles.link} activeClassName={styles.active}>Teams</Link>
            </li>
            <li className={styles.item}>
              <Link to="/plans" className={styles.link} activeClassName={styles.active}>Plans</Link>
            </li>
            <li className={styles.item}>
              <Link to="/users" className={styles.link} activeClassName={styles.active}>Users</Link>
            </li>
          </ul>
          { isSuperAdmin ? superAdminContent : null }
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
