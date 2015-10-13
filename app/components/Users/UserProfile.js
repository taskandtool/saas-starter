import React, { PropTypes } from 'react';
import moment from 'moment';
import UserCard from './UserCard.js';
import styles from './userProfile.css';


export default class UserProfile extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    handleUpload: React.PropTypes.func.isRequired
  }

  displayOtherImages(otherImages) {
    if (otherImages.length > 1) {
      return (
        <h3>Click an image below to set a different profile image</h3>
      );
    } else {
      return ''
    }
  }

  render() {
    const { user } = this.props;
    if (!user) return null;
    let createdAt = user.createdAt;
    let email = user.emails && user.emails[0].address ? user.emails[0].address : 'None';

    let otherImages = user.profile.images.map((image, i) => {
      return (
        <img key={i} src={image} onClick={() => this.props.handleSetProfilePic(image)} width="100px" />
      );
    })

    let displayOtherImages = this.displayOtherImages(otherImages);

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Hi, {user.profile.name}</h1>
        <div className={styles.column}>
          {displayOtherImages}
          {otherImages}
          <div>Joined: {moment({createdAt}).format('MMMM DD, YYYY')}</div>
          <div>Name: {user.profile.name}</div>
          <div>Email: {user.emails && user.emails[0].address ? user.emails[0].address : 'No email'}</div>
          <form id="upload">
            <div>
              <div>{this.props.uploadingMsg}</div>
              <div className={(this.props.showSpinner) ? styles.spinner : ''}></div>
              <input type="file" ref="fileInput" onChange={this.props.handleUpload} />
            </div>
          </form>
        </div>
        <UserCard user={user}
                  name={user.profile.name}
                  avatar={user.profile.avatar}
                  createdAt={user.createdAt}
                  email={email} />
      </div>
    );
  }
}
