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
          <h4 className="subtitle">Set a different image</h4>
          {this.props.otherImages.length > 1 ?  <p>Click an image below to swap images.</p> : null}
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
