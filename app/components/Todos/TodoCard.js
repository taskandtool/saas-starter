import React, { PropTypes } from 'react';
import moment from 'moment';
import reactMixin from 'react-mixin';
import {History} from 'react-router';
import Icon from '../Icons/Icon.js';
import styles from './todoCard.css';

@reactMixin.decorate(History)
export default class TodoCard extends React.Component {
  static PropTypes = {
    todo: PropTypes.object
  }

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }

  render() {
    if (!this.props.todo) return null;

    let todo = this.props.todo;

    return (
      <div key={todo._id} className={styles.border} >
        <div className={styles.completed}>{todo.text}</div>
        <div className={styles.right}>
          <div className={styles.item}>
            {todo.isCompleted ?
              <Icon size="1.2em" icon="check" color='green' onClick={this.handleClick} /> :
              <Icon size="1.2em" icon="check" color='#ddd' onClick={this.handleClick} />
            }
          </div>
          <div className={styles.item}>
            {todo.isDeleted ?
              <Icon size="1.2em" icon="delete" color='red' onClick={this.handleDeleteClick} /> :
              <Icon size="1.2em" icon="delete" color='#ddd' onClick={this.handleDeleteClick} />
            }
          </div>
        </div>
      </div>
    );
  }

  handleDeleteClick() {
    Meteor.call('Todos.update', this.props.todo._id, {isDeleted: !this.props.todo.isDeleted});
  }

  handleClick() {
    Meteor.call('Todos.update', this.props.todo._id, {isCompleted: !this.props.todo.isCompleted});
  }
}
