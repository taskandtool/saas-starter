import React from 'react';
import {Link, History} from 'react-router';
import reactMixin from 'react-mixin';
import styles from './nav.css';
import Icon from '../Icons/Icon.js';

export default class Nav extends React.Component {

  render() {
    const user = this.props.user;
    let rightSide;

    if (user) {

      rightSide = (
        <div className={styles.right}>
          <div className={styles.icon}>
            <Link to="/search" className={styles.link} activeClassName={styles.active}><Icon size="1.7em" icon="search" /></Link>
          </div>
          <div className={styles.itemHiddenOnSmall}>
            <a href="#" className={styles.link} onClick={this.props.handleToggleDropDown} >{user.profile.name} <Icon size="1.1em" icon="arrow-drop-down" /></a>
          </div>
          { this.props.showDropDown ? <div styles={{float:"left"}}><DropDown user={user} handleToggleDropDown={this.props.handleToggleDropDown} /></div> : null }
          <div className={styles.item}><a href="#" onClick={this.props.handleToggleDropDown} ><img src={user.profile.avatar} className={styles.avatar} /></a></div>

        </div>
      );

    } else {
      rightSide = (
        <div className={styles.rightLinks}>
          <div className={styles.icon}>
            <Link to="/search" className={styles.link} activeClassName={styles.active}><Icon size="1.4em" icon="search" /></Link>
          </div>
          <div className={styles.item}>
            <Link to="/signin" className={styles.link}  activeClassName="active">Login</Link>
          </div>
          <div className={styles.item}>
            <Link to="/join" className={styles.link}  activeClassName="active">Join</Link>
          </div>
        </div>
      );
    }

    return (
      <div className={styles.navbar}>
        <div className={styles.left}>
          {this.props.back ?
            <div className={styles.icon}>
              <Link to={this.props.back} className={styles.link}>
                <Icon size="2em" icon="chevron-left" color="#fff" />
              </Link>
            </div>
            :
            <div className={styles.iconClickable}>
              <Icon size="2em" icon="menu" color="#fff" onClick={this.props.handleToggleSidebar} />
            </div>
          }
          <div className={styles.item}>
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
      <div className={styles.children} onClick={this.props.handleToggleDropDown}>
        <div className={styles.itemChild}>
          <Link to={`/user/${this.props.user._id}`} className={styles.link}>
            <Icon size="1.2em" icon="person" color="#fff" /> Profile
          </Link>
        </div>
        <div className={styles.itemChild}>
          <a href="#" onClick={this.logout} className={styles.link}>
            <Icon size="1.2em" icon="arrow-back" color="#fff" /> Logout
          </a>
        </div>
      </div>
    );
  }
}
