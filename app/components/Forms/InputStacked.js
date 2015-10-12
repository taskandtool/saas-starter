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
    type: 'text',
    showError: true
  };

  constructor() {
    super();
  }

  render() {
    let style;
    let message;
    if (this.props.errorMsg) {
      style = styles.messageError;
      message = {__html: '- ' + this.props.errorMsg};
    }
    if (this.props.errorMsg === 'Success!') {
      style = styles.messageSuccess;
      message = {__html: ' <i class="fa fa-check"></i>'};
    }

  if (!this.props.showError) {
    message = {__html: ''};
  }

    return (
      <div>
        <label htmlFor={ this.props.name } title={ this.props.label }>
          {this.props.label} <span className={style} dangerouslySetInnerHTML={message} />
        </label>
        <input
          className={styles.input}
          type={this.props.type}
          name={this.props.name}
          onChange={this.props.handleChange}
          value={this.props.value}
          placeholder={this.props.label}
          data-validateby={this.props.validateBy}
          required={this.props.required}
          />
      </div>
    );
  }
}
