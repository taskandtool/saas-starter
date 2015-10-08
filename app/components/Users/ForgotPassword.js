import React from 'react';
import {Link} from 'react-router';
import InputStacked from '../Forms/InputStacked';

export default class ForgotPassword extends React.Component {

  render() {
    return (
      <div className="page auth">
        <div className="content-scrollable">
          <div className="wrapper-auth">
            <h1 className="title-auth">Forgot Password?</h1>
            <p className="subtitle-auth" >
              Enter your email and we'll send you an option to reset it.
            </p>

            <form onSubmit={ this.props.onSubmit }>
              <div>{this.props.successMessage}</div>

              <InputStacked
                errorMsg={!! this.props.errors.email}
                type="email"
                name="email"
                label="Your Email"
                iconClass="icon-email" />

              <button type="submit" className="btn-primary">
                Send me an email to reset my password
              </button>
            </form>
          </div>
          <Link to="/join" className="link-auth-alt">
            Need an account? Join Now.
          </Link>
        </div>
      </div>
    )
  }
}
