import React from 'react';
import {Link, History} from 'react-router';
import reactMixin from 'react-mixin';
import styles from './nav.css';


export default class Nav extends React.Component {
  render() {
    const user = this.props.user;
    let rightSide;
    let style = {
      marginLeft: '7.4em'
    }

    if (user) {

      rightSide = (
        <ul className={styles.navbarListRight}>
          <li className={styles.item}>
            <a href="#" onClick={this.props.handleDropDownClick} className={styles.link} ><i className="fa fa-ellipsis-v"></i></a>
          </li>
          { this.props.showDropDown ? <DropDown /> : null }
          <li className={styles.item}><a href="#" onClick={this.props.handleDropDownClick} ><img src={user.profile.avatar} className={styles.avatar} /></a></li>

        </ul>
      );

    } else {
      rightSide = (
        <ul className={styles.navbarListRight}>
          <li className={styles.divider}></li>
          <li className={styles.item}><Link to="/signin" className={styles.link}>Sign in</Link></li>
          <li className={styles.item}><Link to="/join" className={styles.link}>Join</Link></li>
        </ul>
      );
    }

    return (
      <div className={styles.navbar}>
        <ul className={styles.navbarList}>
          <li className={styles.item}>
            <a href="#" onClick={this.props.handleMenuClick}
                        className={styles.link}>
              <i className="fa fa-bars"></i>
              <span className={styles.menu}> Menu</span>
            </a>
          </li>
          <li className={styles.divider}></li>
          <li className={styles.itemHiddenOnSmall}>
            <Link to="/" style={(this.props.showSidebar) ? style : {}} className={styles.link}>
              Home
            </Link>
          </li>
          <li className={styles.itemHiddenOnSmall}><Link to="/plans" className={styles.link}>Plans</Link></li>
          <li className={styles.itemHiddenOnSmall}><Link to="/users" className={styles.link}>Users</Link></li>
        </ul>
        { rightSide }
      </div>

    );
  }
}

@reactMixin.decorate(History)
class DropDown extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout() {
    Meteor.logout();
    this.history.pushState(null, `/`);
  }

  render() {
    return (
      <ul className={styles.children}>
        <li className={styles.item}><a href="#" className={styles.link}><i className="fa fa-user"></i> Profile</a></li>
        <li className={styles.item}><a href="#" onClick={this.logout} className={styles.link}><i className="fa fa-sign-out"></i> Logout</a></li>
      </ul>
    );
  }
}
