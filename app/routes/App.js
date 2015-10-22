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
    params: PropTypes.object
  }

  constructor() {
    super();
    this.handleToggleDropDown = this.handleToggleDropDown.bind(this);
    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    this.state = {
      showDropDown: false,
      showSidebar: false
    };
  }

  handleToggleDropDown() {
    this.setState({showDropDown: !this.state.showDropDown})
  }

  handleToggleSidebar() {
    this.setState({showSidebar: !this.state.showSidebar})
  }

  getMeteorData() {
    return {
      user: Meteor.user()
    };
  }

  render() {
    return (
      <div className={this.state.showSidebar ? styles.darken : null}>
        <Helmet
          title="My SaaS App"
          titleTemplate="%s - TaskandTool.com"
          meta={[
              {"name": "description", "content": "SaaS App Starter Kit"}
          ]}
        />
        { this.state.showSidebar ?
          <Sidebar
            user={this.data.user}
            handleToggleSidebar={this.handleToggleSidebar}/>
          : null

        }

        <div onClick={this.state.showSidebar ? () => this.handleToggleSidebar() : null} >
          <div onClick={this.state.showDropDown ? () => this.handleToggleDropDown() : null} >
            <Nav
              user={this.data.user}
              showDropDown={this.state.showDropDown}
              showSidebar={this.state.showSidebar}
              handleToggleSidebar={this.handleToggleSidebar}
              handleToggleDropDown={this.handleToggleDropDown}
              name={this.props.routes[1].name}
              back={this.props.routes[1].back || null} />

            {this.props.children}

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
