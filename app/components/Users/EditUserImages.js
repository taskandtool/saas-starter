import React, { PropTypes } from 'react';
import ImageUpload from '../Utils/ImageUpload';

export default class EditUserImages extends React.Component {
  static propTypes = {
    handleUpload: React.PropTypes.func.isRequired,
    uploadingMsg: React.PropTypes.string
  }

  constructor() {
    super();
  }

  render() {
    return (
        <div>
          {this.props.otherImages.length > 1 ?  <h5>Click an image below to set a different profile image</h5> : null}
          {this.props.otherImages}

          <ImageUpload
            ref="imageUpload"
            uploadingMsg={this.props.uploadingMsg}
            showSpinner={this.props.showSpinner}
            handleUpload={this.props.handleUpload}
           />

        </div>
    );
  }
}
