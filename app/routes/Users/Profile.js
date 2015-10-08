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
      uploadingMsg: "Upload a new profile image"
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
    this.setState({uploadingMsg: "Uploading"})
    const uploader = new Slingshot.Upload("userImages");
    uploader.send(React.findDOMNode(this.refs.userProfile.refs.fileInput).files[0], (error, downloadUrl) => {
      if (error) {
        console.error('Error uploading', error);
        this.setState({uploadingMsg: "Sorry, there was an error. Please try again later"});
      }
      else {
        Meteor.call('storeUserProfileImage', downloadUrl);
        this.setState({uploadingMsg: "Success!"});
      }
    });
  }

  render() {

    if (this.data.loading) {
      return (
        <p>Loading</p>
      );
    }

    return (
      <UserProfile handleSetProfilePic={this.handleSetProfilePic}
                  ref="userProfile"
                  user={this.data.user}
                  handleUpload={this.handleUpload}
                  uploadingMsg={this.state.uploadingMsg} />
    );
  }
}
