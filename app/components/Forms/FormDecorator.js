import React, { Component } from "react";

export const handleForms = ComposedComponent => class extends Component {

  constructor() {
    super();
    this.state = {
      errors: {},
      values: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.setDefaultValues = this.setDefaultValues.bind(this);
  }

  render() {
    return (
      <ComposedComponent
        inputState={this.state}
        handleChange={this.handleChange}
        setDefaultValues={this.setDefaultValues}
        {...this.props} />
    )
  }

  setDefaultValues(data) {
    //optional. Useful if editing existing docs. Ideally call on componentDidMount
    this.setState({ values: data });
  }

  //throttles errors from showing up too fast when typing.
  componentWillMount() {
    this.throttledSetErrorState = _.debounce(this.throttledSetErrorState,500);
  }

  handleChange(event) {
    let name = event.target.name;
    let value;
    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    } else if (event.target.type === 'select') {
      value = event.target.selected;
    } else {
      value = event.target.value;
    }

    //this is to merge existing value state rather than replace it with setstate.
    //can also be done with react addons or an immutability package I believe.
    let newValue = _.extend({}, this.state.values);
    newValue[name] = value;
    this.setState({ values: newValue });

    //this returns something like 'password' or 'email' or whatever you passed
    let validateType = event.target.getAttribute('data-validateby');

    if (validateType) {
      //Calls appropriate validator and passes the form input value
      let error = this[validateType](value);

      //Merges new error with existing error state
      let newError = _.extend({}, this.state.errors);
      newError[name] = error;

      this.throttledSetErrorState(newError);
    }
  }

  throttledSetErrorState(newError) {
    this.setState({ errors: newError });
  }

  //validators below
  password(value) {
    if (!value) {
      return ('Password must be at least 6 digits');
    }
    if (value.length < 6) {
      return ('Password must be at least 6 digits');
    }
    if (value.search(/[a-z]/i) < 0) {
      return ('Your password must contain at least one letter');
    }
    if (value.search(/[0-9]/) < 0) {
      return ('Your password must contain at least 1 number');
    }
    return '';
  }

  confirmPassword(value) {
      if (value !== this.state.values.password) {
        return ('Passwords must match');
      }
      return '';
  }

  required(value) {
    if (value.length < 1) {
      return ('Can\'t be blank');
    }
    return '';
  }

  isNumber(value) {
    if (isNaN(value) || !value) {
      return ('Must be a number');
    }
    return '';
  }

  email(value) {
    if (value.search(/[^\s@]+@[^\s@]+\.[^\s@]+/) < 0) {
      return ('Doesn\'t look like a valid email');
    }
    return '';
  }
};
