import React, { Component } from "react";

export var handleForms = ComposedComponent => class extends Component {
  static displayName = "handleForms"

  constructor() {
    super();
    this.state = {
      errors: {},
      values: {},
      success: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <ComposedComponent
        formState={this.state}
        handleChange={this.handleChange} />
    )
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

    //this is to merge state rather than replace it with setstate.
    //can also be done with react addons or an immutability package I believe.
    let newValue = _.extend({}, this.state.values);
    newValue[name] = value;
    this.setState({ values: newValue });

    let validateType = event.target.getAttribute('data-validateby'); //this returns something like 'password' or 'email' or whatever you passed
    if (validateType) {
      let error = this[validateType](value); //Calls appropriate validator and passes the form input value

      let newError = _.extend({}, this.state.errors);
      newError[name] = error; //Merges new error with existing error state

      if (!error) {
        newError = _.omit(newError, name); //Makes existing error state null.
        let newSuccessState = _.extend({}, this.state.success);
        newSuccessState[name] = true;
        this.setState({ success: newSuccessState});
      }

      this.throttledSetErrorState(newError);
    }
  }

  throttledSetErrorState(newError) { //so errors don't appear instantly and annoy users
    this.setState({ errors: newError });
  }

  //validators below
  password(value) {
    if (value.length < 6) {
      return ('Password must be at least 6 digits');
    }
    if (value.search(/[a-z]/i) < 0) {
      return ('Your password must contain at least one letter');
    }
    if (value.search(/[0-9]/) < 0) {
      return ('Your password must contain at least 1 number');
    }
    return null;
  }

  confirmPassword(value) {
      if (value !== this.state.values.password) {
        return ('Passwords must match');
      }
      return null;
  }

  required(value) {
    if (value.length < 1) {
      return ('Can\'t be blank');
    }
    return null;
  }

  isNumber(value) {
    if (isNaN(value) || !value) {
      return ('Must be a number');
    }
    return null;
  }

  email(value) {
    if (value.search(/[^\s@]+@[^\s@]+\.[^\s@]+/) < 0) {
      return ('Doesn\'t look like a valid email');
    }
    return null;
  }
};
