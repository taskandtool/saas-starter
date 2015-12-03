import React, { Component } from 'react';
import styles from './button.css';

export default class Button extends Component {

  render() {
    return (
      <button
        className={
          this.props.btnShake && this.props.primary ? styles.buttonShakePrimary :
          this.props.btnShake ? styles.buttonShake :
          this.props.primary ? styles.buttonPrimary :
          styles.button
        }
        onClick={this.props.onClick} >

        {this.props.children}
      </button>
    );
  }
}
