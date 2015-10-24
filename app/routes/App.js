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
    })
    //this makes the sidebar's css = display:none when closed.
    //shouldn't be necessary as the transform animation should work,
    //but glitches on ipad's safari w/out it.
    if (this.state.showSidebar) {
      window.setTimeout(() => {
        this.setState({
          initialLoad: true
        })
      }, 500);
    }
  }

  getMeteorData() {
    return {
      user: Meteor.user()
    };
  }

  render() {
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
              back={this.props.routes[1].back || null} />

            {this.props.children}

            <Footer />
          </div>
        </div>
      </div>
    );
  }
}
