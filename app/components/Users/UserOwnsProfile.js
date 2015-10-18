import React, { PropTypes } from 'react';
import styles from './userOwnsProfile.css';


export default class UserProfile extends React.Component {
  static propTypes = {
    handleUpload: React.PropTypes.func.isRequired,
    uploadingMsg: React.PropTypes.string
  }

  constructor() {
    super();
    this.displayOtherImageMsg = this.displayOtherImageMsg.bind(this);
  }

  displayOtherImageMsg(otherImages) {
    if (otherImages.length > 1) {
      return (
        //display other profile images message only if there's more than one profile image
        <h5>Click an image below to set a different profile image</h5>
      );
    } else {
      return ''
    }
  }

  render() {
    return (
        <div>
          {this.displayOtherImageMsg(this.props.otherImages)}
          {this.props.otherImages}
          <form id="upload">
            <div>
              <h5>{this.props.uploadingMsg}</h5>
              <div className={(this.props.showSpinner) ? styles.spinner : ''}></div>
              <div className={styles.button}>
                <span>Upload New Image</span>
                <input type="file" className={styles.upload} ref="fileInput" onChange={this.props.handleUpload} />
              </div>
            </div>
          </form>
        </div>
    );
  }
}
