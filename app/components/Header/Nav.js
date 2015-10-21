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
        <div className={styles.right}>
          <div className={styles.icon}>
            <Link to="/search" className={styles.link} activeClassName={styles.active}><Icon size="1.7em" icon="search" /></Link>
          </div>
          <div className={styles.itemHiddenOnSmall}>
            <Link to="/search" className={styles.link} activeClassName={styles.active}>{user.profile.name}</Link>
          </div>
          { this.props.showDropDown ? <div styles={{float:"left"}}><DropDown user={user} handleDropDownClick={this.props.handleDropDownClick} /></div> : null }
          <div className={styles.item}><a href="#" onClick={this.props.handleDropDownClick} ><img src={user.profile.avatar} className={styles.avatar} /></a></div>

        </div>
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
        <div className={styles.left}>
          {this.props.back ?
            <div className={styles.icon} style={(this.props.showSidebar) ? style : {}}>
              <Link to={this.props.back} className={styles.link}>
                <Icon size="2em" icon="chevron-left" color="#fff" />
              </Link>
            </div>
            :
            <div className={styles.icon}>
              <a href="#" onClick={this.props.handleMenuClick}
                          className={styles.link}>
                <Icon size="2em" icon="menu" color="#fff" />
              </a>
            </div>
          }
          <div className={styles.item} style={(this.props.showSidebar && !this.props.back) ? style : {}}>
            {this.props.name}
          </div>
        </div>
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
      <div className={styles.children} onClick={this.props.handleDropDownClick}>
        <div className={styles.itemChild}><Link to={`/user/${this.props.user._id}`} className={styles.link}><Icon size="1.2em" icon="person" color="#fff" /> Profile</Link></div>
        <div className={styles.itemChild}><a href="#" onClick={this.logout} className={styles.link}><Icon size="1.2em" icon="arrow-back" color="#fff" /> Logout</a></div>
      </div>
    );
  }
}
