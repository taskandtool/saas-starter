import React, { Component, PropTypes } from 'react';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import {handleForms} from '../../components/Forms/FormDecorator';
import md5 from 'blueimp-md5';
import styles from './editProfile.css';
import InputStacked from '../../components/Forms/InputStacked';
import UserCard from '../../components/Users/UserCard';
import EditUserImages from '../../components/Users/EditUserImages';

@handleForms
@reactMixin.decorate(ReactMeteorData)
@reactMixin.decorate(History)
export default class EditProfileRoute extends React.Component {
  static propTypes = {
    params: PropTypes.object
  }

  constructor() {
    super();
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSetProfilePic = this.handleSetProfilePic.bind(this);

    this.state = {
      emailFormSuccess: "",
      emailFormError: "",
      profileFormSuccess: "",
      profileFormError: "",
      passwordFormSuccess: "",
      passwordFormError: "",
      showSpinner: false,
      uploadingMsg: "Upload a new profile image:"
    };
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

    const values = this.props.inputState.values;
    const errors = this.props.inputState.errors;

    //for the user card
    const user = this.data.user;
    const createdAt = user.createdAt;
    const email = user.emails && user.emails[0].address ? user.emails[0].address : 'None';

    //for editing user's other images
    const otherImages = user.profile.images.map((image, i) => {
      return (
        <img key={i} src={image} className={styles.imageList} onClick={() => this.handleSetProfilePic(image)} width="100px" />
      );
    })

    return (
      <div className="wrapper">
        <h1 className="title">Edit Profile</h1>

        <div className={styles.grid}>
          <div className={styles.column}>

            <div className={styles.card}>
              <UserCard
                  _id={user._id}
                  name={values.name}
                  avatar={user.profile.avatar}
                  role={values.role}
                  bio={values.bio}
                  createdAt={user.createdAt}
                  email={email}
                  makeClickable={true}
                  />
            </div>

            <form ref="form" className={styles.form}>
              <h6 className="subtitle">Change Password</h6>
              <fieldset>

                <InputStacked
                  type="password"
                  name="oldPassword"
                  handleChange={this.props.handleChange}
                  value={values.oldPassword}
                  errorMsg={errors.oldPassword}
                  validateBy="password"
                  label="Current Password"
                  required="true"  />

                <InputStacked
                  type="password"
                  name="newPassword"
                  handleChange={this.props.handleChange}
                  value={values.newPassword}
                  errorMsg={errors.newPassword}
                  validateBy="password"
                  label="New Password"
                  required="true"  />

              </fieldset>
            </form>
            <div className={styles.error}>{this.state.passwordFormError}</div>
            <div className={styles.success}>{this.state.passwordFormSuccess}</div>
            <button type="submit" className={styles.btn} onClick={() => this.handlePasswordSubmit(event, errors, values)}>
              Change Password
            </button>

            <form ref="form" className={styles.form}>
              <h6 className="subtitle">Change Email Address</h6>
              <fieldset>
                <InputStacked
                  type="email"
                  name="email"
                  handleChange={this.props.handleChange}
                  value={values.email}
                  errorMsg={errors.email}
                  validateBy="email"
                  label="Email Address"
                  required="true"
                  />
              </fieldset>
            </form>
            <div className={styles.error}>{this.state.emailFormError}</div>
            <div className={styles.success}>{this.state.emailFormSuccess}</div>
            <button type="submit" className={styles.btn} onClick={() => this.handleEmailSubmit(event, errors, values)}>
              Change email
            </button>
          </div>

          <div className={styles.column}>
            <form ref="form" className={styles.form}>
              <h6 className="subtitle">Update Info</h6>
              <fieldset>
                <InputStacked
                  type="text"
                  name="name"
                  handleChange={this.props.handleChange}
                  value={values.name}
                  errorMsg={errors.name}
                  validateBy="required"
                  label="Name"
                  required="true"
                  />

                <InputStacked
                  type="text"
                  name="bio"
                  handleChange={this.props.handleChange}
                  value={values.bio}
                  errorMsg={errors.bio}
                  validateBy="required"
                  label="Short Bio"
                  required="true"
                  />

                <InputStacked
                  type="text"
                  name="role"
                  handleChange={this.props.handleChange}
                  value={values.role}
                  errorMsg={errors.role}
                  validateBy="required"
                  label="Role / Position"
                  required="true"
                  />

              </fieldset>
            </form>
            <div className={styles.error}>{this.state.profileFormError}</div>
            <div className={styles.success}>{this.state.profileFormSuccess}</div>
            <button type="submit" className={styles.btnProfile} onClick={() => this.handleProfileSubmit(event, errors, values)}>
              Update Profile
            </button>

            <EditUserImages
              ref="editUserImages"
              otherImages={otherImages}
              handleUpload={this.handleUpload}
              uploadingMsg={this.uploadingMsg}
              showSpinner={this.state.showSpinner}
              />

          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const user = this.data.user;
    const email = user.emails && user.emails[0].address ? user.emails[0].address : 'None';
    const data = {
      name: user.profile.name,
      bio: user.profile.bio,
      role: user.profile.role,
      email: email
    }

    this.props.setDefaultValues(data);
  }

  handlePasswordSubmit(event, errors, values, userId) {
    event.preventDefault();
    const {oldPassword, newPassword} = values;

    if (errors.oldPassword || errors.newPassword) {
      return false;
    }
    Accounts.changePassword(oldPassword, newPassword, (error) => {
      if (error) {
        this.setState({
          passwordFormError: error.reason
        });
      } else {
        this.setState ({
          passwordFormError: "",
          passwordFormSuccess: "Success! Your password has been changed."
        });
      }
    });
  }

  handleEmailSubmit(event, errors, values) {
    event.preventDefault();
    const {email} = values;

    if (errors.email) {
      return false;
    }

    Meteor.call('User.updateEmail', Meteor.user()._id, {"emails": {address : email, verified: false}}, (error,result) => {
      if (error) {
        this.setState({
          emailFormError: error.reason
        });
      } else {
        this.setState({
          emailFormError: "",
          emailFormSuccess: "Success! Your profile has been updated."
        });
      }
    });
  }

  handleProfileSubmit(event, errors, values) {
    event.preventDefault();
    const {name, bio, role} = values;

    if (errors.name || errors.bio || errors.role) {
      return false;
    }

    Meteor.call('User.updateProfile', Meteor.user()._id, {"profile.name": name, "profile.role": role, "profile.bio": bio}, (error,result) => {
      if (error) {
        this.setState({
          profileFormError: error.reason
        });
      } else {
        this.setState({
          profileFormError: "",
          profileFormSuccess: "Success! Your profile has been updated."
        });
      }
    });
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

    uploader.send(this.refs.editUserImages.refs.imageUpload.refs.fileInput.files[0], (error, downloadUrl) => {
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
