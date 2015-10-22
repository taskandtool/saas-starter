import React, {Component} from 'react';
import Mailto from 'react-mailto';
import styles from './home.css';
import Icon from '../components/Icons/Icon';

export default class Home extends Component {

  render() {
    return (
      <div>
        <div className={styles.section1}>
          <div className={styles.heroGrid}>
            <div className={styles.heroColumn}>
              <h1 className={styles.white}>Starter SaaS App Code</h1>
              <h3 className={styles.white}>Build your next SaaS app fast</h3>
              <a href="https://github.com/taskandtool/saas-starter"><button className={styles.primary}>See it on Github</button></a>
            </div>
          </div>
        </div>
        <div className={styles.section2}>
          <h2 className="title">Why Use It</h2>
          <div className={styles.listGrid}>
            <div className={styles.listColumn}>
              <span className={styles.icon}><Icon size="1em" icon="check" /></span>
              <h4>Get a running start</h4>
              <p>Clone and deploy the app in 5 minutes. Iterate from there to make a product people love.</p>
            </div>
            <div className={styles.listColumn}>
              <span className={styles.icon}><Icon size="1em" icon="check" /></span>
              <h4>Great Tech Stack</h4>
              <p>Meteor, MongoDB and React gives dependable performance, optimistic UI and fast iterations.</p>
            </div>
            <div className={styles.listColumn}>
              <span className={styles.icon}><Icon size="1em" icon="check" /></span>
              <h4>Go Native Quickly</h4>
              <p>Between React Native and Meteor's Cordova support, you have options when you want to build your mobile app.</p>
            </div>
            <div className={styles.listColumn}>
              <span className={styles.icon}><Icon size="1em" icon="check" /></span>
              <h4>Open source, MIT licence</h4>
              <p>Do whatever you want with the code and benefit from the ecosystem of the many React and Meteor packages</p>
            </div>
          </div>
        </div>

        <div className={styles.section2}>
          <h2 className="title">Will it meet my needs?</h2>
          <div className={styles.listGrid}>
            <div className={styles.listColumn}>
              <h4>What's in the box:</h4>
              <ul className={styles.listUl}>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>User Accounts with social/pass logins and avatars</li>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>Form Validation</li>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>Starter schemas for Users, Plans & Teams/Orgs</li>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>Stripe integration</li>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>AWS S3 integration for images/media uploads</li>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>Dashboard</li>
              </ul>
            </div>
            <div className={styles.listColumn}>
              <h4>Opinions this starter app makes:</h4>
              <ul className={styles.listUl}>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>User accounts are always free, teams/orgs pay</li>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>Users can belong to many teams</li>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>People in orgs want to manage User roles</li>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>Teams want dashboards to manage things</li>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>You use stripe to get paid</li>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>You want a global dashboard to manage things</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.section2}>
          <h2 className="title">Take it for a spin</h2>
          <div className={styles.listGrid}>
            <div className={styles.listColumn}>
              <span className={styles.iconBlue}><i className="fa fa-clone"></i></span>
              <h4>This is the exact app you get on Github</h4>
              <p>...so this is essentially a placeholder for your sales page.</p>
            </div>
            <div className={styles.listColumn}>
              <span className={styles.iconBlue}><i className="fa fa-user"></i></span>
              <h4>Try logging in</h4>
              <p>Experience the form validations, the gravatar fetching, profile editing, etc. </p>
            </div>
            <div className={styles.listColumn}>
              <span className={styles.iconBlue}><i className="fa fa-lock"></i></span>
              <h4>Login as super admin (soon)</h4>
              <p>With these creds: </p>
            </div>
            <div className={styles.listColumn}>
              <span className={styles.iconBlue}><i className="fa fa-share-square-o"></i></span>
              <h4>Invite team members (soon)</h4>
              <p>To experience the signup flow</p>
            </div>
          </div>
        </div>

        <div className={styles.section3}>
          <div className={styles.heroGrid}>
            <div className={styles.heroColumn}>
              <h2 className={styles.white}>Need help with your app?</h2>
              <span className={styles.icon}><i className="fa fa-envelope"></i></span>
              <Mailto email="walsh.gavin@gmail.com" obfuscate={true}><button className={styles.secondary}>Shoot me an email</button></Mailto>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
