import React, { PropTypes } from 'react';
import moment from 'moment';
import UserCard from './UserCard.js';
import UserOwnsProfile from './UserOwnsProfile';
import styles from './userProfile.css';


export default class UserProfile extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    handleUpload: React.PropTypes.func.isRequired
  }

  render() {
    const { user } = this.props;
    if (!user) return null;
    let createdAt = user.createdAt;
    let email = user.emails && user.emails[0].address ? user.emails[0].address : 'None';


    let otherImages = user.profile.images.map((image, i) => {
      return (
        <img key={i} src={image} className={styles.imageList} onClick={() => this.props.handleSetProfilePic(image)} width="100px" />
      );
    })

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{user.profile.name}</h1>
        <div className={styles.grid}>
          <div className={styles.column}>

            {this.props.ownsProfile ? <UserOwnsProfile otherImages={otherImages} /> : null}

            <h5>More Details</h5>
            <div>Joined: {moment({createdAt}).format('MMMM DD, YYYY')}</div>
            <div>Name: {user.profile.name}</div>
            <div>Email: {user.emails && user.emails[0].address ? user.emails[0].address : 'No email'}</div>
          </div>
          <UserCard user={user}
                    name={user.profile.name}
                    avatar={user.profile.avatar}
                    createdAt={user.createdAt}
                    email={email} />
        </div>
      </div>
    );
  }
}
