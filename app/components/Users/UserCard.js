import React, { PropTypes, Component } from 'react';
import moment from 'moment';
import Mailto from 'react-mailto';
import reactMixin from 'react-mixin';
import {History} from 'react-router';
import styles from './userCard.css';

@reactMixin.decorate(History)
export default class UserProfile extends Component {
  static propTypes = {
    makeClickable: PropTypes.bool,
    name: PropTypes.string,
    email: PropTypes.string,
  }

  render() {
    const createdAt = this.props.createdAt;

    return (
      <div className="cardShadow" onClick={this.props.makeClickable ? () => this.history.pushState(null, `/user/${this.props._id}`) : ''}>
        <div className={styles.imgWrapper}>
          <img src="https://unsplash.it/500/150/?random" className={styles.bannerImg} />
          <img src={this.props.avatar} className={styles.avatar} />
        </div>
        <div className={styles.info} >
          <div className={styles.middle}>
            <h2 className={styles.name}>{this.props.name}</h2>
            {this.props.role ? <div className={styles.role}>{this.props.role}</div> : null }
          </div>
          {this.props.bio ?
            <p className={styles.items}><span className={styles.icon}><i className="fa fa-comment"></i></span>
              <em>{this.props.bio}</em>
            </p>
            : null
          }
          <p className={styles.items}><span className={styles.icon}><i className="fa fa-user"></i></span>
            Joined {moment({createdAt}).format('MMMM DD, YYYY')}
          </p>
          {this.props.email !== "None@none.com" ?
            <p className={styles.items}><span className={styles.icon}><i className="fa fa-envelope"></i></span>
               <Mailto email={this.props.email} obfuscate={true}>Email {this.props.name}</Mailto>
            </p>
            : null
          }
        </div>
      </div>
    );
  }
}
