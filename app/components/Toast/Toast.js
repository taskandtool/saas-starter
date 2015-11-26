import React, { Component } from 'react';
import styles from './toast.css';

export default class Toast extends Component {

  render() {
    return (
      <div className={styles.toastContainer}>
        <div
          className={this.props.type == 'success' ?
                      styles.success :
                      this.props.type == 'error' ?
                      styles.error :
                      styles.toast}
          onClick={this.props.closeToast}>
          {this.props.content}
        </div>
      </div>
    );
  }
}
