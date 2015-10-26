import React, {Component, CSSTransitionGroup, PropTypes} from 'react';
import Nav from '../components/Header/Nav';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Sidebar/Sidebar';
import reactMixin from 'react-mixin';
import Helmet from "react-helmet";

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

  handleToggleDropDown() {
    this.setState({showDropDown: !this.state.showDropDown})
  }

  handleToggleSidebar() {
    this.setState({
      showSidebar: !this.state.showSidebar,
      initialLoad: false
    });
  }

  getMeteorData() {
    return {
      user: Meteor.user()
    };
  }

  render() {

    //Back button in menu works by either grabbing "back" props in Route (see index.js in routes)
    //Or by clearing all params/queries
    const { query, pathname } = this.props.location
    const backLink =
        Object.keys(query).length > 0 ? pathname :
        this.props.routes[1].back ? this.props.routes[1].back :
        null


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
          user={this.data.user}
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
              user={this.data.user}
              showDropDown={this.state.showDropDown}
              showSidebar={this.state.showSidebar}
              handleToggleSidebar={this.handleToggleSidebar}
              handleToggleDropDown={this.handleToggleDropDown}
              name={this.props.routes[1].name}
              back={backLink} />

            <div className={styles.app}>
              {this.props.children}
            </div>
          <Footer />
          </div>

        </div>
      </div>
    );
  }
}
