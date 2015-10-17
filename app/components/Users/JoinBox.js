import React, {propTypes} from 'react';
import {handleForms} from '../Forms/FormDecorator';
import InputStacked from '../Forms/InputStacked';
import md5 from 'blueimp-md5';
import {History, Link} from 'react-router';
import reactMixin from 'react-mixin';
import SocialAuth from './SocialAuth';

import styles from './joinSignin.css'

@handleForms
@reactMixin.decorate(History)
export default class JoinComponent extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    let values = this.props.formState.values;
    let errors = this.props.formState.errors;
    return (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Get Started!</h2>

          <SocialAuth type="Join" />

          <form className={styles.form} onSubmit={() => this.handleSubmit(event, errors, values)} >
            <h6 className={styles.subtitle}>- Or -</h6>
            <fieldset>

              <InputStacked
                type="email"
                name="email"
                handleChange={this.props.handleChange}
                value={values.email}
                errorMsg={errors.email}
                validateBy="email"
                label="Email Address"
                required="true"  />

              <InputStacked
                type="password"
                name="password"
                handleChange={this.props.handleChange}
                value={values.password}
                errorMsg={errors.password}
                validateBy="password"
                label="Password"
                required="true"  />

              <InputStacked
                type="password"
                name="confirm"
                handleChange={this.props.handleChange}
                value={values.confirm}
                errorMsg={errors.confirm}
                validateBy="confirmPassword"
                label="Confirm Password"
                required="true"  />

              <div className="pure-controls">
                <button className={styles.btn} type="submit">
                  Join with Email
                </button>
              </div>
            </fieldset>
          </form>
          <Link to="/signin" className={styles.links}>
            Already have an account? Login.
          </Link>
        </div>
    );
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();

    const {email, password, confim} = values;

    Accounts.createUser({
      email: email,
      password: password,
      profile: {
        name: email.substring(0, email.indexOf('@')),
        avatar: "http://www.gravatar.com/avatar/" + md5(email.trim().toLowerCase()) + "?s=50&d=mm", //actual image picked by user to display
        images: ["http://www.gravatar.com/avatar/" + md5(email.trim().toLowerCase()) + "?s=50&d=mm"] //collection of images in users account
      }
    }, (error) => {
      if (error) {
        console.log(error.reason)
        return;
      }
    });
    this.history.pushState(null, `/`);
  }
}
