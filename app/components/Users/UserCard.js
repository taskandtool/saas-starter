import React, { PropTypes } from 'react';
import moment from 'moment';
import Mailto from 'react-mailto';
import reactMixin from 'react-mixin';
import {History} from 'react-router';
import styles from './userCard.css';

@reactMixin.decorate(History)
export default class UserProfile extends React.Component {
  static propTypes = {
  }

  render() {
    const createdAt = this.props.createdAt;

    return (
      <div className={styles.column} onClick={this.props.makeClickable ? () => this.history.pushState(null, `/user/${this.props._id}`) : ''}>
        <div className={styles.wrapper}>
          <div className={styles.imgWrapper}>
            <img src="https://unsplash.it/500/150/?random" className={styles.bannerImg} />
            <img src={this.props.avatar} className={styles.avatar} />
          </div>
          <div className={styles.info} >
            <h2 className={styles.name}>{this.props.name}</h2>
            <div className={styles.role}>Developer</div>
            <p className={styles.items}><span className={styles.icon}><i className="fa fa-user"></i></span>
              Joined {moment({createdAt}).format('MMMM DD, YYYY')}
            </p>
            <p className={styles.items}><span className={styles.icon}><i className="fa fa-envelope"></i></span>
              <Mailto email={this.props.email} obfuscate={true}>Email {this.props.name}</Mailto>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
