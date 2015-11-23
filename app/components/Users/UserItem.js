import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import Mailto from 'react-mailto';
import reactMixin from 'react-mixin';
import {History} from 'react-router';
import styles from './userItem.css';
import Icon from '../Icons/Icon';

@reactMixin.decorate(History)
export default class UserItem extends Component {
  static PropTypes = {
    clickPreview: PropTypes.bool,
    name: PropTypes.string,
    email: PropTypes.string,
  }

  static defaultProps = {
    clickPreview: false
  };

  render() {
    const createdAt = this.props.createdAt;
    return (
      <div
        className={styles.border}
        onClick={this.props.clickPreview ?
                    () => this.history.pushState(null, `/users?id=${this.props._id}`) :
                    () => this.history.pushState(null, `/user/${this.props._id}`)}>

        <div className={styles.wrapper}>
          <img src={this.props.avatar} className={styles.avatar} />

          <div className={styles.info}>
            <p className={styles.name}>{this.props.name}</p>
            <p className={styles.items}>Joined {moment({createdAt}).format('MMMM DD, YYYY')}</p>
          </div>
          <div className={styles.icon}>
            <Icon size="1.9em" icon="arrow-forward" />
          </div>
        </div>
      </div>
    );
  }
}
