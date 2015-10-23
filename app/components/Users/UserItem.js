import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import Mailto from 'react-mailto';
import reactMixin from 'react-mixin';
import {History} from 'react-router';
import styles from './userItem.css';
import Icon from '../Icons/Icon';

@reactMixin.decorate(History)
export default class UserItem extends Component {
  static propTypes = {
    makeClickable: PropTypes.bool,
    name: PropTypes.string,
    email: PropTypes.string,
  }

  render() {
    const createdAt = this.props.createdAt;

    return (
      <div className={styles.shadow} onClick={this.props.makeClickable ? () => this.history.pushState(null, `/user/${this.props._id}`) : ''}>
        <div className={styles.wrapper}>
            <img src={this.props.avatar} className={styles.avatar} />

          <div className={styles.info}>
            <p className={styles.name}>{this.props.name}</p>
            <p className={styles.items}>Joined {moment({createdAt}).format('MMMM DD, YYYY')}</p>
          </div>
        </div>
      </div>
    );
  }
}
