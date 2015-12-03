import React, { Component } from 'react';
import styles from './toast.css';

export default class Toast extends Component {

  constructor() {
    super();
    this.setHTML = this.setHTML.bind(this);
  }
  render() {
    return (
      <div className={styles.toastContainer}>
        <div
          className={this.props.type == 'success' ?
                      styles.success :
                      this.props.type == 'error' ?
                      styles.error :
                      styles.toast}
          onClick={this.props.closeToast}
          dangerouslySetInnerHTML={this.setHTML()}>
        </div>
      </div>
    );
  }

  setHTML() {
    return {__html: this.props.content}
  }
}
