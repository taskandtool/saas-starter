import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import styles from './authLinks.css';

export default class AuthLinks extends Component {
  static PropTypes = {
    linksToUse: React.PropTypes.array
  }

  constructor() {
    super();
    this.getLinksToUse = this.getLinksToUse.bind(this);
  }

  render() {
    const links = this.getLinksToUse();

    return (
      <div>
        {links}
      </div>
    )
  }

  getLinksToUse() {
    let linksToUse = this.props.linksToUse.map((link, i) => {
      switch (link) {
        case 'join':
          return (
            <Link key={i} to="/join" className={styles.links}>
              Need an account? Join Now.
            </Link>
          );
        case 'forgot':
          return (
            <Link key={i} to="/forgot-password" className={styles.links}>
              Forgot Password?
            </Link>
          );
        case 'signin':
          return (
            <Link key={i} to="/signin" className={styles.links}>
              Already have an account? Login
            </Link>
          );
      }
    });
    return linksToUse
  }
}
