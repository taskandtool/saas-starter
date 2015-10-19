import React, { PropTypes } from 'react';
import styles from './imageUpload.css';
import Spinner from './Spinner';

export default class EditUserProfile extends React.Component {
  static propTypes = {
    handleUpload: React.PropTypes.func.isRequired,
    uploadingMsg: React.PropTypes.string,
    showSpinner: React.PropTypes.bool
  }

  constructor() {
    super();
  }

  render() {
    return (
        <form id="upload">
          <div>
            <h5>{this.props.uploadingMsg}</h5>
            {this.props.showSpinner ? <Spinner /> : null}
            <div className={styles.button}>
              <span>Upload New Image</span>
              <input type="file" className={styles.upload} ref="fileInput" onChange={this.props.handleUpload} />
            </div>
          </div>
        </form>
    );
  }
}
