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
          <div>
            <h5>{this.props.uploadingMsg}</h5>
            {this.props.showSpinner ? <Spinner /> : null}
            <div className={styles.button}>
              <div className={styles.container}>
                <span className={styles.btnText}>Add Another Image</span>
              </div>
              <input type="file" className={styles.upload} ref="fileInput" onChange={this.props.handleUpload} />
            </div>
          </div>
    );
  }
}
