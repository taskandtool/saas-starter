//import styles from './styles.styl';

import React, { PropTypes } from 'react';
import moment from 'moment';
//import CSSModules from 'react-css-modules';

//@CSSModules(styles)
export default class UserProfile extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    handleUpload: React.PropTypes.func.isRequired
  }

  render() {
    const { user } = this.props;
    if (!user) return null;
    const { _id, createdAt } = user;

    let otherImages = user.profile.images.map((image, i) => {
      return (
        <img key={i} src={image} onClick={() => this.props.handleSetProfilePic(image)} width="100px" />
      );
    })

    return (
      <div styleName="wrapper">
        <img src={user.profile.avatar} width="100px" />
        <form id="upload">
          <p>
            <p>{this.props.uploadingMsg}</p>
            <input type="file" ref="fileInput" onChange={this.props.handleUpload} />
          </p>
        </form>
        <p>Click an image below to set a different profile image</p>
        {otherImages}
        <ul>
          <li>Joined: {moment({createdAt}).format('MMMM DD, YYYY')}</li>
          <li>Name: {user.profile.name}</li>
          <li>Email: {user.emails && user.emails[0].address ? user.emails[0].address : 'No email'}</li>
        </ul>
      </div>
    );
  }
}
