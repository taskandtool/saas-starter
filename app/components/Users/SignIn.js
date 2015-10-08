import React from 'react';
import {Link} from 'react-router';
import InputStacked from '../Forms/InputStacked';

export default class SignIn extends React.Component {

  render() {
    return (
      <div className="page auth">
        <div className="content-scrollable">
          <div className="wrapper-auth">
            <h1 className="title-auth">Sign In.</h1>
            <p className="subtitle-auth" >
              Sign in
            </p>

            <form onSubmit={ this.props.onSubmit }>

              <InputStacked
                errorMsg={!! this.props.errors.email}
                type="email"
                name="email"
                label="Your Email"
                iconClass="icon-email" />

              <InputStacked errorMsg={!! this.props.errors.password}
                type="password"
                name="password"
                label="Password"
                iconClass="icon-lock" />

              <button type="submit" className="btn-primary">
                Sign in
              </button>
            </form>
          </div>
          <Link to="/join" className="link-auth-alt">
            Need an account? Join Now.
          </Link>
          <Link to="/forgot-password" className="link-auth-alt">
            Forgot Password?
          </Link>
        </div>
      </div>
    )
  }
}
