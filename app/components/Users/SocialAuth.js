import React, {propTypes} from 'react';
import {History} from 'react-router';
import reactMixin from 'react-mixin';

import styles from './SocialAuth.css'

@reactMixin.decorate(History)
export default class SocialAuth extends React.Component {
  constructor() {
    super();
    this.handleGoogle = this.handleGoogle.bind(this);
    this.handleTwitter = this.handleTwitter.bind(this);
    this.handleFacebook = this.handleFacebook.bind(this);
  }

  render() {
    return (
        <div>
          <button className={styles.btn} type="button" onClick={this.handleFacebook} >{this.props.type} with Facebook <i className="fa fa-facebook fa-lg"></i></button><br />
          <button className={styles.btn} type="button" onClick={this.handleGoogle} >{this.props.type} with Google <i className="fa fa-google fa-lg"></i></button><br />
          <button className={styles.btn} type="button" onClick={this.handleTwitter} >{this.props.type} with Twitter <i className="fa fa-twitter fa-lg"></i></button>
        </div>
    );
  }

  handleFacebook() {
    Meteor.loginWithFacebook ({
        requestPermissions: ['email']
      }, (error) => {
        if (error) {
          this.setState({
            errors: { 'facebook': error.reason }
          });
        return;
      }
    });
    this.history.pushState(null, `/`);
  }

  handleGoogle() {
    Meteor.loginWithGoogle({
      requestPermissions: ['email']
    }, (error) => {
      if (error) {
        this.setState({
          errors: { 'google': error.reason }
        });
        return;
      }
    });
    this.history.pushState(null, `/`);
  }

  handleTwitter() {
    Meteor.loginWithTwitter((error) => {
      if (error) {
        this.setState({
          errors: { 'twitter': error.reason }
        });
        return;
      }
    });
    this.history.pushState(null, `/`);
  }
}
