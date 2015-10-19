import React, { PropTypes } from 'react';
import styles from './editUserProfile.css';
import ImageUpload from '../Utils/ImageUpload';


export default class EditUserProfile extends React.Component {
  static propTypes = {
    handleUpload: React.PropTypes.func.isRequired,
    uploadingMsg: React.PropTypes.string
  }

  constructor() {
    super();
  }

  render() {
    return (
        <div className={styles.grid}>
          <div className={styles.column}>
            {this.props.otherImages.length > 1 ?  <h5>Click an image below to set a different profile image</h5> : null}
            {this.props.otherImages}

            <ImageUpload
              ref="ImageUpload"
              uploadingMsg={this.props.uploadingMsg}
              showSpinner={this.props.showSpinner}
              handleUpload={this.props.handleUpload}
             />
           </div>
           <div className={styles.column}>
            <input type="text" name="emails" value={this.props.email} onChange={this.props.handleEmailChanged}/>
            <input type="text" name="name" value={this.props.name} onChange={this.props.handleNameChanged}/>
          </div>
        </div>
    );
  }
}
