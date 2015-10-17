import React, { Component, PropTypes } from 'react';
import reactMixin from 'react-mixin';
import {Users} from '../../collections';
import UserProfile from '../../components/Users/UserProfile';

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

  handleSetProfilePic(image) {
    Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": image }});
  }

  handleUpload() {
    this.setState({
      uploadingMsg: "Uploading...",
      showSpinner: true
    });
    const uploader = new Slingshot.Upload("userImages");
    uploader.send(React.findDOMNode(this.refs.userProfile.refs.fileInput).files[0], (error, downloadUrl) => {
      if (error) {
        console.error('Error uploading', error);
        this.setState({
          uploadingMsg: "Sorry, there was an error. Please try again later",
          showSpinner: false
        });
      }
      else {
        Meteor.call('storeUserProfileImage', downloadUrl);
        this.setState({
          uploadingMsg: "Success!",
          showSpinner: false
        });
      }
    });
  }

  render() {

    if (this.data.loading) {
      return (
        <div>Loading</div>
      );
    }

    let ownsProfile = this.data.user._id == Meteor.user()._id

    return (
      <UserProfile handleSetProfilePic={this.handleSetProfilePic}
                  ref="userProfile"
                  user={this.data.user}
                  handleUpload={this.handleUpload}
                  uploadingMsg={this.state.uploadingMsg}
                  showSpinner={this.state.showSpinner}
                  ownsProfile={ownsProfile} />
    );
  }
}
