import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import {Todos} from '../../schemas';
import TodoList from '../../components/Todos/TodoList';
import Spinner from '../../components/Spinner/Spinner';
import styles from './list.css';
import {handleForms} from '../../components/Forms/FormDecorator';
import {History, Link} from 'react-router';
import Helmet from 'react-helmet';
import TodoForms from '../../components/Todos/TodoForms';

@handleForms
@reactMixin.decorate(History)
@reactMixin.decorate(ReactMeteorData)
export default class TodoListRoute extends Component {

  static propTypes = {
    params: PropTypes.object
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
    let handle = Meteor.subscribe("todos", this.props.params.id);
    return {
      todos: Todos.find({}, {sort: {createdAt: -1}}).fetch(),
      loading: !handle.ready()
    };
  }

  render() {
    let todos = this.data.todos;
    let values = this.props.inputState.values;
    let errors = this.props.inputState.errors;

    let inputsToUse = [
      "text"
    ];

console.log(Meteor.call('User.checkIfAuthorized'));

    return (
      <div className={styles.wrapper}>

        <Helmet
          title="Todos"
          meta={[
              {"name": "description", "content": "Todos"}
          ]}
        />

        <h1 className={styles.title}>{todos.length} Todos</h1>
        <div className={styles.grid}>

          <TodoForms
            buttonText="Add Todo"
            inputsToUse={inputsToUse}
            inputState={this.props.inputState}
            formError={this.state.formError}
            formSuccess={this.state.formSuccess}
            shakeBtn={this.state.shakeBtn}
            handleChange={this.props.handleChange}
            handleSubmit={this.handleSubmit} />

          {todos ?
            <TodoList todos={todos} />
          : null }
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
    const teamId = this.props.params.id;

    //Don't submit if required fields aren't filled out
    let requiredValues = [text];
    if (_.some(requiredValues, function(str){ return str == undefined; })) {
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
      teamId: teamId
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
