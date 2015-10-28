import React, { Component, PropTypes } from 'react';
import {History} from 'react-router';
import reactMixin from 'react-mixin';
import {handleForms} from '../Forms/FormDecorator';
import styles from './editProfile.css';
import UserCard from './UserCard';
import EditUserImages from './EditUserImages';
import UserForms from './UserForms.js';

@handleForms
@reactMixin.decorate(History)
export default class EditProfileRoute extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
    email: React.PropTypes.string
  }

  constructor() {
    super();
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSetProfilePic = this.handleSetProfilePic.bind(this);
    this.handleRolesSubmit = this.handleRolesSubmit.bind(this);

    //this handles state.. but isn't a top-level component/route. Not normally what I'd do... but it's called if
    //params edit=true is on the profile route. The only other option is including all this form state on
    //the profile route, but then it's loaded even if the user isn't editing. I think this is the lesser of 2 evils
    //Could potentially just make this it's own route, alternatively.

    this.state = {
      emailFormSuccess: "",
      emailFormError: "",
      profileFormSuccess: "",
      profileFormError: "",
      passwordFormSuccess: "",
      passwordFormError: "",
      rolesFormSuccess: "",
      rolesFormError: "",
      showSpinner: false,
      uploadingMsg: "Upload a new profile image:"
    };
  }

  render() {
    //Laying out inputs of all 4 separate forms
    const profileInputs = ["name", "title", "bio"];
    const emailInput = ["email"];
    const resetPasswordInput = ["oldPassword", "password"];
    const rolesInput = ["role", "team"];


    //individual input values/errors from form decorator
    const values = this.props.inputState.values;
    const errors = this.props.inputState.errors;

    //for the user card. Email doesn't display as it's obfuscated
    //so no need to tie it to editing values.
    const user = this.props.user;
    const email = this.props.email;

    //for displaying user's images and changing main profile pic
    let otherImages = []
    if (user.profile.images) {
      otherImages = user.profile.images.map((image, i) => {
        return (
          <img key={i} src={image} className={styles.imageList} onClick={() => this.handleSetProfilePic(image)} width="100px" />
        );
      })
    }


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
                title={values.title}
                bio={values.bio}
                createdAt={user.createdAt}
                email={email}
                makeClickable={true} />

            </div>
          </div>
          <div className={styles.column}>
            <h4 className="subtitle">Update Info</h4>

            <UserForms
              buttonText="Update Profile"
              inputsToUse={profileInputs}
              inputState={this.props.inputState}
              formError={this.state.profileFormError}
              formSuccess={this.state.profileFormSuccess}
              shakeBtn={this.state.shakeBtn}
              handleChange={this.props.handleChange}
              handleSubmit={this.handleProfileSubmit} />

          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.column}>

            <EditUserImages
              ref="editUserImages"
              otherImages={otherImages}
              handleUpload={this.handleUpload}
              uploadingMsg={this.uploadingMsg}
              showSpinner={this.state.showSpinner} />

          </div>
          <div className={styles.column}>
            <h4 className="subtitle">Change Email Address</h4>

            <UserForms
              buttonText="Change Email"
              inputsToUse={emailInput}
              inputState={this.props.inputState}
              formError={this.state.emailFormError}
              formSuccess={this.state.emailFormSuccess}
              shakeBtn={this.state.shakeBtn}
              handleChange={this.props.handleChange}
              handleSubmit={this.handleEmailSubmit} />

          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h4 className="subtitle">Change Password</h4>

            <UserForms
              buttonText="Change Password"
              inputsToUse={resetPasswordInput}
              inputState={this.props.inputState}
              formError={this.state.passwordFormError}
              formSuccess={this.state.passwordFormSuccess}
              shakeBtn={this.state.shakeBtn}
              handleChange={this.props.handleChange}
              handleSubmit={this.handlePasswordSubmit} />

          </div>

          <div className={styles.column}>
            <h4 className="subtitle">Change Roles</h4>

            <UserForms
              buttonText="Change Roles"
              inputsToUse={rolesInput}
              inputState={this.props.inputState}
              formError={this.state.rolesFormError}
              formSuccess={this.state.rolesFormSuccess}
              shakeBtn={this.state.shakeBtn}
              handleChange={this.props.handleChange}
              handleSubmit={this.handleRolesSubmit} />


          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const user = this.props.user;
    const email = this.props.email;
    const data = {
      name: user.profile.name,
      bio: user.profile.bio,
      title: user.profile.title,
      email: email
    }
    //sets default values in handle forms decorators
    this.props.setDefaultValues(data);
  }

  handleRolesSubmit(event, errors, values) {
    event.preventDefault();
    const {role, team} = values;

    if (errors.role || errors.team) {
      this.setState({
        shakeBtn: true
      });
      window.setTimeout(() => {
        this.setState({
          shakeBtn: false
        });
      }, 3000);
      return false;
    }
    Meteor.call('User.addRoles', this.props.user._id, role, team, (error,result) => {
      if (error) {
        this.setState({
          emailRolesError: error.reason
        });
      } else {
        this.setState({
          emailRolesError: "",
          emailRolesSuccess: "Success! Your profile has been updated."
        });
      }
    });
  }

  handlePasswordSubmit(event, errors, values, userId) {
    event.preventDefault();
    const {oldPassword, password} = values;

    if (errors.oldPassword || errors.password) {
      this.setState({
        shakeBtn: true
      });
      window.setTimeout(() => {
        this.setState({
          shakeBtn: false
        });
      }, 3000);
      return false;
    }

    Accounts.changePassword(oldPassword, password, (error) => {
      if (error) {
        //If there's no existing password set (like when user signed up with facebook/twitter), hard set the password
        if (error.reason == 'User has no password set') {
          Meteor.call('User.setPasswordIfDoesNotExsit', Meteor.user()._id, password);
        } else {
          this.setState({
            passwordFormError: error.reason
          });
        }
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
    const {name, bio, title} = values;

    if (errors.name || errors.bio || errors.title) {
      return false;
    }

    Meteor.call('User.updateProfile', Meteor.user()._id, {
      "profile.name": name,
      "profile.title": title,
      "profile.bio": bio
    }, (error,result) => {
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
