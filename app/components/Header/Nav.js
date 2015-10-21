import React from 'react';
import {Link, History} from 'react-router';
import reactMixin from 'react-mixin';
import styles from './nav.css';
import Icon from '../Icons/Icon.js';

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
          { this.props.showDropDown ? <div styles={{float:"left"}}><DropDown user={user} handleDropDownClick={this.props.handleDropDownClick} /></div> : null }

          <li className={styles.item}><a href="#" onClick={this.props.handleDropDownClick} ><img src={user.profile.avatar} className={styles.avatar} /></a></li>
          <li className={styles.iconHiddenOnSmall}>
            <Link to="/search" className={styles.link} activeClassName={styles.active}><Icon size="1.7em" icon="search" /></Link>
          </li>
        </ul>
      );

    } else {
      rightSide = (
        <ul className={styles.navbarListRight}>
          <li className={styles.icon}>
            <Link to="/search" className={styles.link} activeClassName="active"><Icon size="1.7em" icon="search" /></Link>
          </li>
          <li className={styles.item}><Link to="/signin" className={styles.link}  activeClassName="active">Sign in</Link></li>
          <li className={styles.item}><Link to="/join" className={styles.link}  activeClassName="active">Join</Link></li>
        </ul>
      );
    }

    return (
      <div className={styles.navbar}>
        <ul className={styles.navbarList}>
          {this.props.back ?
            <li className={styles.icon} style={(this.props.showSidebar) ? style : {}}>
              <Link to={this.props.back} className={styles.link}>
                <Icon size="2em" icon="chevron-left" color="#fff" />
              </Link>
            </li>
            :
            <li className={styles.icon}>
              <a href="#" onClick={this.props.handleMenuClick}
                          className={styles.link}>
                <Icon size="2em" icon="menu" color="#fff" />
              </a>
            </li>
          }
          <li className={styles.item} style={(this.props.showSidebar && !this.props.back) ? style : {}}>
            {this.props.name}
          </li>
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
      <ul className={styles.children} onClick={this.props.handleDropDownClick}>
        <li className={styles.itemChild}><Link to={`/user/${this.props.user._id}`} className={styles.link}><Icon size="1.2em" icon="person" color="#fff" /> Profile</Link></li>
        <li className={styles.itemChild}><a href="#" onClick={this.logout} className={styles.link}><Icon size="1.2em" icon="arrow-back" color="#fff" /> Logout</a></li>
      </ul>
    );
  }
}
