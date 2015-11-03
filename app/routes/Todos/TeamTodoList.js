import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import {Todos} from '../../schemas';
import TodoList from '../../components/Todos/TodoList';
import Spinner from '../../components/Spinner/Spinner';
import styles from './list.css';
import {handleForms} from '../../components/Forms/FormDecorator';
import Helmet from 'react-helmet';
import TodoForms from '../../components/Todos/TodoForms';
import TeamCard from '../../components/Teams/TeamCard.js';

@handleForms
@reactMixin.decorate(ReactMeteorData)
export default class TeamTodoListRoute extends Component {

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
    let handle
    let belongsToTeam = false
    //See if user has a role on the team
    let roles = Meteor.user().roles;
    let team
    for (team in roles) {
      if (team === this.props.params.teamId) {
        belongsToTeam = true;
        break;
      }
    }

    //Subscribe to either all user or team todos.... or just ones not labeled isPrivate
    if (belongsToTeam) {
      handle = Meteor.subscribe("todos.auth", null, this.props.params.teamId);
    } else {
      handle = Meteor.subscribe("todos.public", null, this.props.params.teamId);
    }

    return {
      todos: Todos.find({}, {sort: {createdAt: -1}}).fetch(),
      loading: !handle.ready(),
      belongsToTeam: belongsToTeam
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

    //grabbing this from subscription in app.js
    const {name, _id} = this.props.team

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
        <div className={styles.grid}>
          <div className={styles.column}>

            {this.data.belongsToUser || this.data.belongsToTeam ?
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
              <TodoList todos={todos} />
            : null }
          </div>
          <div className={styles.cardColumn}>
            <TeamCard
              team={this.props.team}
              linkTo={`/team/${_id}`} />
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
    const teamId = this.props.params.teamId || 'belongstouser';

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
      isPrivate: true,
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
