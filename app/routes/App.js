import React, {Component, CSSTransitionGroup} from 'react';
import Nav from '../components/Header/Nav';
import Sidebar from '../components/Sidebar/Sidebar';
import reactMixin from 'react-mixin';
import Helmet from "react-helmet";

import global from '../styles/global.css';
import styles from './app.css';


@reactMixin.decorate(ReactMeteorData)
export default class App extends Component {
  constructor() {
    super();
    this.dropdownClick = this.dropdownClick.bind(this);
    this.showSidebarClick = this.showSidebarClick.bind(this);
    this.state = {
      showDropDown: false,
      showSidebar: false
    };
  }

  dropdownClick() {
    this.setState({showDropDown: !this.state.showDropDown})
  }

  showSidebarClick() {
    this.setState({showSidebar: !this.state.showSidebar})
  }

  getMeteorData() {
    return {
      user: Meteor.user()
    };
  }

  render() {

    return (
      <div className={styles.app}>
        <Helmet
          title="My SaaS App"
          titleTemplate="%s - TaskandTool.com"
          meta={[
              {"name": "description", "content": "SaaS App Starter Kit"}
          ]}
        />
        <Nav user={this.data.user}
            showDropDown={this.state.showDropDown}
            showSidebar={this.state.showSidebar}
            handleMenuClick={this.showSidebarClick}
            handleDropDownClick={this.dropdownClick}  />
        { this.state.showSidebar ?
          <div>
            <Sidebar user={this.data.user}
                      handleMenuClick={this.showSidebarClick}/>
            <div className={styles.sidebarShowing} >{this.props.children}</div>
          </div>
        : this.props.children }
      </div>
    );
  }
}
