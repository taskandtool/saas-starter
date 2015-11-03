import React, {Component, PropTypes} from 'react';
import Nav from '../components/Header/Nav';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import reactMixin from 'react-mixin';
import Helmet from "react-helmet";
import {Teams, Users} from '../schemas';
import Spinner from '../components/Spinner/Spinner';

import global from '../styles/global.css';
import styles from './app.css';

@reactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  static propTypes = {
    params: PropTypes.object,
    query: PropTypes.object
  }

  constructor() {
    super();
    this.handleToggleDropDown = this.handleToggleDropDown.bind(this);
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    this.state = {
      showDropDown: false,
      showSidebar: false,
      initialLoad: true
    };
  }

  getMeteorData() {
    let handle = Meteor.subscribe("teams")
    Meteor.subscribe("users");
    return {
      user: Meteor.users.findOne(this.props.params.id),
      team: Teams.findOne(this.props.params.teamId),
      loading: !handle.ready(),
    };
  }

  render() {
    if (this.data.loading) {
      return (<div><Spinner /></div>);
    }

    //Back button in nav menu works by either grabbing "back" props in Route (see index.js in /routes)
    //Or by clearing all params/queries
    const { query, pathname } = this.props.location
    const backLink =
        !_.isEmpty(query) ? pathname :
        this.props.routes[1].back ? this.props.routes[1].back :
        null

    //teamsList = teams where user has a role. Server side publish
    //userList = all users that belong to the same teams. Server side publish
    //todos = link to user/:id/todos. Say 'saving to user profile. To save to a team, choose one of your teams'
    //todos = :id/todos Should be default link when team card is clicked. Can click over to profile or team user list from there

    return (
      <div>
        <Helmet
          title="My SaaS App"
          titleTemplate="%s - TaskandTool.com"
          meta={[
              {"name": "description", "content": "SaaS App Starter Kit"}
          ]}
        />

        <Sidebar
          team={this.data.team}
          user={this.data.user}
          currentUser={Meteor.user()}
          handleToggleSidebar={this.handleToggleSidebar}
          showSidebar={this.state.showSidebar}
          initialLoad={this.state.initialLoad} />

        <div
            className={
              this.state.initialLoad ? null :
              this.state.showSidebar ? styles.darken : styles.lighten
            }
            onClick={this.state.showSidebar ? () => this.handleToggleSidebar() : null} >

          <div onClick={this.state.showDropDown ? () => this.handleToggleDropDown() : null}>

            <Nav
              user={Meteor.user()}
              showDropDown={this.state.showDropDown}
              showSidebar={this.state.showSidebar}
              handleToggleSidebar={this.handleToggleSidebar}
              handleToggleDropDown={this.handleToggleDropDown}
              name={this.props.routes[1].name}
              back={backLink} />

            <div className={styles.app}>

              {React.cloneElement(this.props.children, {
                  //Make this.props.team/user/currentUser available to all routes.
                  team: this.data.team,
                  user: this.data.user,
                  currentUser: Meteor.user()
                })
              }
            </div>
          <Footer />
          </div>

        </div>
      </div>
    );
  }

  handleToggleDropDown() {
    this.setState({showDropDown: !this.state.showDropDown})
  }

  handleToggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar,
      initialLoad: false
    });
  }
}
