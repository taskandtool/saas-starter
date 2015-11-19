import React, {Component, PropTypes} from 'react';
import reactMixin from 'react-mixin';
import {Users} from '../../schemas';
import UserCard from '../../components/Users/UserCard';
import Spinner from '../../components/Spinner/Spinner';
import UserList from '../../components/Users/UserList';
import styles from './list.css';


@reactMixin.decorate(ReactMeteorData)
export default class UserListRoute extends Component {
  static PropTypes = {
    query: PropTypes.object
  }

  constructor() {
    super();
    this.state = {
      userLimit: 1
    }
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  getMeteorData() {
    let handle = Meteor.subscribe("users", this.state.userLimit);
    return {
      users: Meteor.users.find().fetch(),
      loading: !handle.ready()
    };
  }

  render() {
    if (this.data.loading) {
      return (<div className={styles.wrapper}><Spinner /></div>);
    }

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{this.data.users.length} Users</h1>
        <h3 className={styles.subtitle}>Pagination example. Needs work to append
        users instead of refreshing whole list</h3>
        <div className={styles.grid}>
          <div className={styles.list} >
            <UserList users={this.data.users} />
          </div>
        </div>
        <button onClick={this.handleLoadMore} className={styles.btn} >Load more</button>
      </div>
    )
  }

  handleLoadMore() {
    this.setState({userLimit: this.state.userLimit + 2})
  }
}
