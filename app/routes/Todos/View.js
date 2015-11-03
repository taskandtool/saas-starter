import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import {Todos} from '../../schemas';
import Spinner from '../../components/Spinner/Spinner';
import TodoCard from '../../components/Todos/TodoCard.js';
import EditTodo from '../../components/Todos/EditTodo.js';
import styles from './view.css';
import {Link} from 'react-router';

@reactMixin.decorate(ReactMeteorData)
export default class TodoViewRoute extends Component {

  static propTypes = {
    params: PropTypes.object,
    query: PropTypes.object
  }

  getMeteorData() {
    let handle = Meteor.subscribe("todos");
    return {
      todo: Todos.findOne(this.props.params.id),
      loading: !handle.ready()
    };
  }

  render() {
    if (this.data.loading) {
      return (<div className={styles.wrapper}><Spinner /></div>);
    }

    const todo = this.data.todo;
    if (!todo) {
      return (
        <div className={styles.wrapper}>No todo found at this address</div>
      );
    }

    const {title, createdBy} = todo;

    //Edit params?
    const { query } = this.props.location
    const edit = query && query.edit == "true"

    //Does user own todo?
    let isUser = false;
    if (Meteor.user()) {
      isUser = createdBy == Meteor.user()._id
    }

    //Wants to edit and owns todo
    if (edit && isUser) {
      return (
        <EditTodo todo={todo} />
      )
    }

    //Wants to edit but doesn't own todo
    if (edit) {
      return (
        <div className={styles.wrapper}>You don't have permission to edit {title} todo.</div>
      )
    }

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.grid}>
          <div className={styles.column}>
            <TodoCard todo={todo} />
          </div>
          <div className={styles.column}>
            <h3 className={styles.subtitle}>More details</h3>
            <TodoDetails todo={todo} />
            {isUser ?
             <Link to={`/todo/${this.props.params.id}`} query={{ edit: true }}  >
               <button className={styles.btn}>Edit Todo</button>
             </Link>
             : null }
          </div>
        </div>
      </div>
    );
  }
}
