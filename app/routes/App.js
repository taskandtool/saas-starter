import React, {Component, PropTypes} from 'react';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import reactMixin from 'react-mixin';
import Helmet from "react-helmet";
import {Teams, Users} from '../schemas';
import Spinner from '../components/Spinner/Spinner';
import Toast from '../components/Toast/Toast';

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
    this.showToast = this.showToast.bind(this);
    this.closeToast = this.closeToast.bind(this);
    this.state = {
      showDropDown: false,
      showSidebar: false,
      initialLoad: true,
      showToast: false,
      toastMsg: '',
      toastType: 'success'
    };
  }

  getMeteorData() {
    let handle = Meteor.subscribe("teams")
    Meteor.subscribe("user", this.props.params.id)
    return {
      currUser: Meteor.user(), //putting it here makes it reactive
      user: Meteor.users.findOne(this.props.params.id),
      team: Teams.findOne(this.props.params.teamId),
      loading: !handle.ready(),
    };
  }

  render() {
    if (this.data.loading) {
      return (<div><Spinner /></div>);
    }

    const {currUser, user, team} = this.data

    //Back arrow button in nav menu works by either grabbing "back" props in Route (see index.js in /routes)
    //Or by clearing all params/queries
    const { query, pathname } = this.props.location
    const backLink =
        !_.isEmpty(query) ? pathname :
        this.props.routes[1].back ? this.props.routes[1].back :
        null

    //Check permissions of current user for super-admin,
    //if user is on their own profile route,
    //or if user has roles on current team route
    let isSuperAdmin = false;
    let teamRoles = []
    let ownsProfile = false;
    if (currUser) {
      if (user) ownsProfile = currUser._id === user._id
      let permissions = currUser.permissions;
      if (permissions) {
        permissions.map((permission) => {
          if (permission.roles[0] === "super-admin") {
            isSuperAdmin = true;
          }
          if (team && permission.teamId == team._id) {
            teamRoles = permission.roles
          }
        })
      }
    }

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
          team={team}
          isSuperAdmin={isSuperAdmin}
          user={user}
          currUser={currUser}
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
              user={currUser}
              showDropDown={this.state.showDropDown}
              showSidebar={this.state.showSidebar}
              handleToggleSidebar={this.handleToggleSidebar}
              handleToggleDropDown={this.handleToggleDropDown}
              name={this.props.routes[1].name}
              back={backLink} />

            {this.state.showToast ?
              <Toast content={this.state.toastMsg}
                      closeToast={this.closeToast}
                      type={this.state.toastType} />
            : null}


            <div className={styles.app}>

              {React.cloneElement(this.props.children, {
                  //Make below props available to all routes.
                  team: team,
                  user: user,
                  currUser: currUser,
                  teamRoles: teamRoles,
                  ownsProfile: ownsProfile,
                  isSuperAdmin: isSuperAdmin,
                  showToast: this.showToast,
                })
              }
            </div>
          <Footer />
          </div>

        </div>
      </div>
    );
  }

  showToast(content, type) {
    this.setState({
      showToast: true,
      toastMsg: content,
      toastType: type
    });
    window.setTimeout(() => {
      this.closeToast()
    }, 3000);
  }

  closeToast() {
    this.setState({
      showToast: false,
      toastMsg: ''
    });
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
