import React from 'react';
import styles from './inputStacked.css';

export default class InputStacked extends React.Component {
  propTypes: {
    errorMsg: React.PropTypes.string,
    label: React.PropTypes.string,
    iconClass: React.PropTypes.string,
    type: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    handleBlur: React.PropTypes.func,
    handleChange: React.PropTypes.func,
  }

  static defaultProps = {
    type: 'text'
  };

  constructor() {
    super();
  }

  render() {
    let style;
    if (this.props.errorMsg) {
      style = styles.messageError;
    }
    if (this.props.errorMsg === 'Success!') {
      style = styles.messageSuccess;
    }

    return (
      <div>
        <label htmlFor={ this.props.name } title={ this.props.label }>
          {this.props.label} <span className={style}>- { this.props.errorMsg }</span>
        </label>
        <input
          className={styles.input}
          type={ this.props.type }
          name={ this.props.name }
          onChange={this.props.handleChange}
          value={this.props.value}
          placeholder={ this.props.label }
          data-validateby={this.props.validateBy}
          required={this.props.required}
          />
      </div>
    );
  }
}
