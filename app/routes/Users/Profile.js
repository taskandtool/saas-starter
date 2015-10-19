import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import reactMixin from 'react-mixin';
import {Users} from '../../schemas';
import EditUserProfile from '../../components/Users/EditUserProfile';
import UserCard from '../../components/Users/UserCard';
import styles from './profile.css';

@reactMixin.decorate(ReactMeteorData)
export default class UserProfileRoute extends Component {
  static propTypes = {
    params: PropTypes.object
  }

  constructor() {
    super();
    this.state = {
      errors: {},
      uploadingMsg: "Upload a new profile image:",
      showSpinner: false
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSetProfilePic = this.handleSetProfilePic.bind(this);
  }

  getMeteorData() {
    let handle = Meteor.subscribe("users");
    return {
      loading: !handle.ready(),
      user: Meteor.users.findOne(this.props.params.id)
    };
  }

  render() {
    if (this.data.loading) {
      return (
        <div>Loading</div>
      );
    }

    const user = this.data.user;
    const createdAt = user.createdAt;
    const email = user.emails && user.emails[0].address ? user.emails[0].address : 'None';
    const otherImages = user.profile.images.map((image, i) => {
      return (
        <img key={i} src={image} className={styles.imageList} onClick={() => this.props.handleSetProfilePic(image)} width="100px" />
      );
    })

    let canEdit = false;
    if (Meteor.user()){
      canEdit = this.data.user._id == Meteor.user()._id
    }

    return (
      <div className="wrapper">
        <h1 className="title">{user.profile.name}</h1>
        <div className={styles.grid}>
          <div className={styles.column}>
            <UserCard
              user={user}
              name={user.profile.name}
              avatar={user.profile.avatar}
              createdAt={user.createdAt}
              email={email}
               />
           </div>
           <div className={styles.column}>
             <h1>More details</h1>
             <p>ie. Member of these teams:</p>
           </div>
         </div>

          {canEdit ?
            <EditUserProfile
              ref="EditUserProfile"
              otherImages={otherImages}
              handleUpload={this.handleUpload}
              uploadingMsg={this.uploadingMsg}
              showSpinner={this.state.showSpinner}
              email={email}
              name={user.profile.name}
              handleEmailChanged={this.handleEmailChanged}
              handleNameChanged={this.handleNameChanged}
              ref="userOwnsProfile" />
            :
            null
          }

      </div>
    );
  }

  handleEmailChanged = (e) => {
    Meteor.call('User.updateEmail', Meteor.user()._id, {"emails": {address : e.target.value, verified: false}});
  }

  handleNameChanged = (e) => {
    Meteor.call('User.updateProfile', Meteor.user()._id, {"profile.name": e.target.value});
  }

  handleSetProfilePic(image) {
    Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": image }});
  }

  handleUpload() {
    this.setState({
      uploadingMsg: "Uploading...",
      showSpinner: true
    });
    const uploader = new Slingshot.Upload("userImages");

    uploader.send(this.refs.EditUserProfile.refs.ImageUpload.refs.fileInput.files[0], (error, downloadUrl) => {
      if (error) {
        console.error('Error uploading', error);
        this.setState({
          uploadingMsg: "Sorry, there was an error. Please try again later",
          showSpinner: false
        });
      } else {
        Meteor.call('storeUserProfileImage', downloadUrl);
        this.setState({
          uploadingMsg: "Success!",
          showSpinner: false
        });
      }
    });
  }
}
