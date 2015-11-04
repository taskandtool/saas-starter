import React, {Component} from 'react';
import {Typeahead} from 'react-typeahead';
import reactMixin from 'react-mixin';
import {Users} from '../schemas';
import {History} from 'react-router';
import UserCard from '../components/Users/UserCard';
import styles from './search.css'

@reactMixin.decorate(History)
@reactMixin.decorate(ReactMeteorData)
export default class Search extends Component {
  constructor() {
    super();
    this.handleOptionSelect = this.handleOptionSelect.bind(this);
    this.displayOption = this.displayOption.bind(this);
  }

  getMeteorData() {
    let handle = Meteor.subscribe("users");
    const { query } = this.props.location;
    const id = query && query.id;
    return {
      users: Meteor.users.find({}, {sort: {createdAt: -1}}).fetch(),
      user: Meteor.users.findOne(id),
      loading: !handle.ready()
    };
  }

  render() {
    //populate typeahead
    let users = this.data.users.map((user) => {
      user.profile.id = user._id
      return user.profile
    })

    //when typehead option is selected (url query appended)
    let user = this.data.user
    let email
    if (user) {
      email = user.emails && user.emails[0].address ? user.emails[0].address : 'None@none.com';
    }

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Search</h1>
          Here's a Typeahead search of users. Some sort of elastic search would scale better. Try pressing 'a'
          to get results if you just have the users generated on startup.
          <div className={styles.grid}>
            <div className={styles.column}>
              <Typeahead
                options={users}
                filterOption="name"
                displayOption={ this.displayOption }
                maxVisible={5}
                placeholder="Search for users..."
                onOptionSelected={this.handleOptionSelect}
                className={styles.typeahead}
                customClasses={{
                  input: styles.input,
                  results: styles.results,
                  listItem: styles.listItem
                }}
              />
            </div>
            {user ?
              <div className={styles.columnCard}>
                <UserCard
                  user={user}
                  name={user.profile.name}
                  avatar={user.profile.avatar}
                  role={user.profile.role}
                  bio={user.profile.bio}
                  createdAt={user.createdAt}
                  email={email}
                  makeClickable={true} />
              </div>
              :
              null
            }
        </div>
      </div>
    );
  }

  displayOption(option) {
    return option.name
  }

  handleOptionSelect(option) {
    this.history.pushState(null, `/search?id=${option.id}`)
  }
}
