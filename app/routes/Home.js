import React, {Component} from 'react';
import Mailto from 'react-mailto';
import styles from './home.css';
import Icon from '../components/Icons/Icon';
import {Link} from 'react-router';

export default class Home extends Component {

  render() {
    return (
      <div>
        <div className={styles.section1}>
          <div className={styles.heroGrid}>
            <div className={styles.heroColumn}>
              <h1 className={styles.white}>Starter SaaS App Code</h1>
              <h3 className={styles.white}>Prototype your next SaaS app fast</h3>
              <Link to="/docs"><button className={styles.primary}>Docs</button></Link>
              <a href="https://github.com/taskandtool/saas-starter"><button className={styles.primary}>Github</button></a>
            </div>
          </div>
        </div>
        <div className={styles.section2}>
          <h2 className={styles.title}>Why Use It</h2>
          <div className={styles.listGrid}>
            <div className={styles.listColumn}>
              <span className={styles.icon}><Icon size="1em" icon="check" /></span>
              <h4>Get a running start</h4>
              <p>Replace the todos part of the app with your actual app, but keep user auth & permissions, image uploads, dashboards, etc. </p>
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
          <h2 className={styles.title}>Will it meet my needs?</h2>
          <div className={styles.listGrid}>
            <div className={styles.listColumn}>
              <h4>What's in the box:</h4>
              <ul className={styles.listUl}>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>User Accounts with social/pass logins and avatars</li>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>Form Validation</li>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>Starter schemas for Users, Plans & Teams/Orgs</li>
                <li className={styles.list}><span className={styles.iconList}><Icon size="1em" icon="check" /> </span>Stripe integration (in progress)</li>
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
          <h2 className={styles.title}>Take it for a spin</h2>
          <div className={styles.listGrid}>
            <div className={styles.listColumn}>
              <span className={styles.iconBlue}><i className="fa fa-clone"></i></span>
              <h4>This is the exact app you get on Github</h4>
              <p>Deployed on meteor's free dev servers. This is essentially a placeholder for your sales page.</p>
            </div>
            <div className={styles.listColumn}>
              <span className={styles.iconBlue}><i className="fa fa-user"></i></span>
              <h4>Try logging in</h4>
              <p>Experience the form validations, the gravatar fetching, profile editing, etc. Then make a team and invite another user and manage their roles. </p>
            </div>
            <div className={styles.listColumn}>
              <span className={styles.iconBlue}><i className="fa fa-lock"></i></span>
              <h4>Login as super admin</h4>
              <p>With these creds: login: super@admin.com, pass: apple1. Please don't change the creds for this user
              on this public demo site. The only difference with this guy is he can see a link in the sidebar to a global
              dashboard, see all plans (even ones not labeled 'displayOnMainSite'), and create new plans.</p>
            </div>
            <div className={styles.listColumn}>
              <span className={styles.iconBlue}><i className="fa fa-share-square-o"></i></span>
              <h4>See it on mobile</h4>
              <p>Because it works there too. Make a change on your phone and see how fast it updates on your computer. Lock and unlock your todos to see how permissions work.</p>
            </div>
          </div>
        </div>

        <div className={styles.section2}>
          <h2 className={styles.title}>More...</h2>
          <div className={styles.listGrid}>
            <div className={styles.listColumn}>
              <span className={styles.iconBlue}><i className="fa fa-clone"></i></span>
              <h4>Very open to feedback</h4>
              <p>Please shoot me an email or submit a pull request. Would love anything to make this project better.</p>
            </div>
            <div className={styles.listColumn}>
              <span className={styles.iconBlue}><i className="fa fa-user"></i></span>
              <h4>Specific areas to improve</h4>
              <p>I'd like SSR to work. I messed with it a bit, but haven't got it working. Also, google's oauth is causing
              some trouble. FB and twitter work fine but I've had no luck with google. I also think a component that allows
              users to invite people from their gmail contact list would be great.</p>
            </div>
            <div className={styles.listColumn}>
              <span className={styles.iconBlue}><i className="fa fa-lock"></i></span>
              <h4>Current status</h4>
              <p>This is a learning project for me in both react and meteor. I've just started freelancing a few months back and I'm currently looking for more work. =) Please shoot
              me an email below if you'd like to get in touch. I can prototype your next SaaS app quickly.</p>
            </div>
            <div className={styles.listColumn}>
              <span className={styles.iconBlue}><i className="fa fa-share-square-o"></i></span>
              <h4>General idea</h4>
              <p>The todo portion of the app will be replaced by your actual app. However, instead of writing the team/users/payments/dashboards from scratch, you have a base to start from. </p>
            </div>
          </div>
          <p><em>Last thing - reset password option fake generates an email in your console that you can only see when you run locally at the moment. No real email is sent. While the token pass reset works, you'll have to finish setting up email with Meteor and Mailgun/Mandrill or something of the like.</em></p>
          <br/>
          <div className={styles.center}>
            <h3>Take it for a spin!</h3>
            <Link to="/join"><button className={styles.primary}>Sign up now</button></Link>
          </div>
        </div>

        <div className={styles.section3}>
          <div className={styles.heroGrid}>
            <div className={styles.heroColumn}>
              <h2>Want to launch fast?</h2>
              <Mailto email="walsh.gavin@gmail.com" obfuscate={true}><button className={styles.primary}>Shoot me an email</button></Mailto>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
