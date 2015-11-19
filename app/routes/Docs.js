import React, {Component} from 'react';
import styles from './home.css';
import {Link} from 'react-router';

export default class Docs extends Component {

  render() {
    return (
      <div>
        <div className={styles.section1}>
          <div className={styles.heroGrid}>
            <div className={styles.heroColumn}>
              <h1 className={styles.white}>Docs</h1>
              <a href="https://github.com/taskandtool/saas-starter"><button className={styles.primary}>Github</button></a>
            </div>
          </div>
        </div>
        <div className={styles.section2}>
          <h2 className={styles.title}>Getting Started</h2>
          <p>
          git clone git@github.com:taskandtool/saas-starter.git<br/>
          npm install<br/>
          add keys to devel.json in /settings folder for social auth/stripe purposes.<br/>
          type 'node dev.js' in your console to start it up.<br/>
          Note: you should already have node/npm and meteor installed or it won't work.
          </p>
          <p>
          to deploy read:  https://github.com/jedwards1211/meteor-webpack-react (what this project is based on)<br/>
          but generally to deploy to meteor.com:<br/>
          change your project name in projectName.js<br/>
          then in your console: node deploy.js meteor.com<br/>
          If that doesn't work, you may need to run this once first: <br/>
          in your console: node prod.js<br/>
          Then: cd meteor_core<br/>
          Then: meteor deploy your-project-name.meteor.com
          </p>
        </div>

        <div className={styles.section2}>
          <h2 className={styles.title}>Forms</h2>
          <p>
          Check out the forms component in app/components/forms.
          </p>
          <p>
          The decorator is typically called on the route component.
          It handles form validation and error message state of individual inputs.
          It also can set default values for inputs.
          </p>
          <p>
          Input stacked handles the displaying of actual inputs.
          </p>
          <p>
          The component groups around each collection hold the form inputs. You define them once in
          app/collections/team(or users, plans, todos, etc), then call them whenever you want in a route
          component.
          </p>
        </div>
      </div>
    );
  }
}
