import React from 'react';
import {Link} from 'react-router';
import InputStacked from '../Forms/InputStacked';

export default class ResetPassword extends React.Component {

  render() {
    return (
      <div className="page auth">
        <div className="content-scrollable">
          <div className="wrapper-auth">
            <h1 className="title-auth">Reset your password</h1>
            <p className="subtitle-auth" >
              Reset your password
            </p>

            <form onSubmit={ this.props.onSubmit }>

              <InputStacked
                errorMsg={!!this.props.errors.password}
                type="password"
                name="password"
                label="Password"
                iconClass="icon-lock" />

              <InputStacked
                errorMsg={!!this.props.errors.confirm}
                type="password"
                name="confirm"
                label="Confirm Password"
                iconClass="icon-lock" />

              <button type="submit" className="btn-primary">
                Reset my password
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
