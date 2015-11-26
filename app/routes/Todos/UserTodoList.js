import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import {Todos} from '../../schemas';
import TodoList from '../../components/Todos/TodoList';
import Spinner from '../../components/Spinner/Spinner';
import styles from './list.css';
import {handleForms} from '../../components/Forms/FormDecorator';
import Helmet from 'react-helmet';
import TodoForms from '../../components/Todos/TodoForms';
import UserItem from '../../components/Users/UserItem.js';

@handleForms
@reactMixin.decorate(ReactMeteorData)
export default class UserTodoListRoute extends Component {

  static propTypes = {
    params: PropTypes.object,
    user: PropTypes.object,
    currUser: PropTypes.object,
    ownsProfile: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.listenForEnter = this.listenForEnter.bind(this);
    this.state = {
      shakeBtn: false,
      formError: '',
      formSuccess: ''
    }
  }

  getMeteorData() {
    let handle

    //Subscribe to todos labeled isPrivate?
    if (this.props.ownsProfile) {
      handle = Meteor.subscribe("todos.auth", this.props.params.id);
    } else {
      handle = Meteor.subscribe("todos.public", this.props.params.id);
    }

    return {
      todos: Todos.find({}, {sort: {createdAt: -1}}).fetch(),
      loading: !handle.ready()
    };
  }

  render() {
    //list of todos
    let todos = this.data.todos;

    //todo form setup
    let values = this.props.inputState.values;
    let errors = this.props.inputState.errors;
    let inputsToUse = [
      "text"
    ];

    const {user, ownsProfile} = this.props;
    const {_id, createdAt} = user;
    const {name, avatar} = user.profile;

    return (
      <div className={styles.wrapper}>

        <Helmet
          title="Todos"
          meta={[
              {"name": "description", "content": "Todos"}
          ]}
        />

        <h1 className={styles.title}>{name}'s Todos</h1>
        <h3 className={styles.subtitle}>{todos.length} Todos</h3>
        <p>Your todos. But you should create a team to make team todos and
        see how managing and inviting users works. Also visit this exact URL on your phone or a a different browser
        (while not logged in) to see how clicking the Lock icon instantly makes your todo public or private without
        refreshing.</p>
        <p>Essentially the todos will be replaced by your actual app. They're just here for a quick demo of privacy
        settings and team invites. The managing of users, teams, payments and plans and overall intent is to
        help you build your actual app faster.</p>
        <div className={styles.grid}>
          <div className={styles.column}>

            {this.props.ownsProfile ?
              <TodoForms
                buttonText="Add Todo"
                inputsToUse={inputsToUse}
                inputState={this.props.inputState}
                formError={this.state.formError}
                formSuccess={this.state.formSuccess}
                shakeBtn={this.state.shakeBtn}
                handleChange={this.props.handleChange}
                handleSubmit={this.handleSubmit} />
            : null }

            {todos ?
              <TodoList todos={todos} canEdit={ownsProfile} />
            : null }
          </div>
          <div className={styles.cardColumn}>
            <UserItem
              name={name}
              avatar={avatar}
              createdAt={createdAt}
              _id={_id} />
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.onkeydown = this.listenForEnter;
  }

  listenForEnter(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
      this.handleSubmit(e, this.props.inputState.errors, this.props.inputState.values);
    }
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();

    //don't submit if there's errors showing
    //underscore method to ensure all errors are empty strings
    let errorValues = _.values(errors);
    if (! _.every(errorValues, function(str){ return str === ''; })) {
      this.setState({
        shakeBtn: true
      });
      window.setTimeout(() => {
        this.setState({
          shakeBtn: false
        });
      }, 3000);
      return false;
    }

    const {text} = values;

    //Don't submit if required fields aren't filled out
    let requiredValues = [text];
    if (_.some(requiredValues, function(str){ return str == undefined || str == ''; })) {
      this.setState({
        shakeBtn: true
      });
      window.setTimeout(() => {
        this.setState({
          shakeBtn: false
        });
      }, 3000);
      return false;
    }

    Meteor.call('Todo.create', {
      text: text,
      isCompleted: false,
      isDeleted: false,
      isPrivate: true,
      teamId: ''
    }, (error) => {
      if (error) {
        this.setState({
          formError: error.reason,
          shakeBtn: true
        });
        window.setTimeout(() => {
          this.setState({
            shakeBtn: false
          });
        }, 1000);
        return;
      } else {
        //resets form
        this.props.setDefaultValues({
          text: '',
          isCompleted: false,
          isDeleted: false
        });
      }
    });
  }

}
