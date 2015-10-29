import React, { PropTypes, Component } from 'react';
import {handleForms} from '../Forms/FormDecorator';
import {History, Link} from 'react-router';
import reactMixin from 'react-mixin';
import TeamCard from './TeamCard.js';
import Helmet from 'react-helmet';
import styles from './editTeam.css';
import {Teams, Plans} from '../../schemas';
import TeamForms from './TeamForms';
import EditImages from '../Images/EditImages';


@handleForms
@reactMixin.decorate(History)
@reactMixin.decorate(ReactMeteorData)
export default class EditTeam extends Component {
  static propTypes = {
    team: React.PropTypes.object
  }

  getMeteorData() {
    //need to do this to prepopulate plan selection for teams
    let handle = Meteor.subscribe("plans");
    return {
      plans: Plans.find().fetch(),
      loading: !handle.ready()
    };
  }

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.listenForEnter = this.listenForEnter.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSetProfilePic = this.handleSetProfilePic.bind(this);

    this.state = {
      shakeBtn: false,
      formError: '',
      formSuccess: '',
      showSpinner: false,
      uploadingMsg: "Upload a new profile image:"
    }
  }

  render() {
    let values = this.props.inputState.values;
    let errors = this.props.inputState.errors;

    //Establishes team inputs, including indeterminate amount of features
    let inputsToUse = [
      "name",
      "desc",
      "planId",
      "isDeleted",
    ];

    const team = this.props.team

    //gets all profile images belonging to the team
    let otherImages = []
    if (team.images) {
      otherImages = team.images.map((image, i) => {
        return (
          <img key={i} src={image} className={styles.imageList} onClick={() => this.handleSetProfilePic(image)} width="100px" />
        );
      })
    }

    let selectedPlan
    this.data.plans.map((plan) => {
      if (plan._id == values.planId) {
         values.planName = plan.title
         selectedPlan = plan
      }
    });

    //get plans to populate option select field in forms
    let planTitle = this.data.plans.map((plan) => {
      return <option key={plan._id} value={plan._id}>{plan.title}</option>
    });

    return (
      <div className="wrapper">
        <Helmet
          title="Edit Team"
          meta={[
              {"name": "description", "content": "Edit Team"}
          ]}
        />

        <h1 className="title">Edit {this.props.team.name}</h1>
        <div className={styles.grid}>
          <div className={styles.column}>
            <TeamForms
              buttonText="Update Team"
              inputsToUse={inputsToUse}
              inputState={this.props.inputState}
              formError={this.state.formError}
              formSuccess={this.state.formSuccess}
              shakeBtn={this.state.shakeBtn}
              handleChange={this.props.handleChange}
              handleSubmit={this.handleSubmit}
              handleAddFeature={this.handleAddFeature}
              team={this.props.team}
              populate={planTitle} />
          </div>

          <div className={styles.column}>
            <TeamCard team={values} picture={team.picture}  />
          </div>

          <div className={styles.column}>

            <EditImages
              ref="editTeamImages"
              otherImages={otherImages}
              handleUpload={this.handleUpload}
              uploadingMsg={this.uploadingMsg}
              showSpinner={this.state.showSpinner} />

          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    let team = this.props.team
    const {name, desc, planId, isDeleted} = team

    let data = {
      name: name,
      desc: desc,
      planId: planId,
      isDeleted: !!isDeleted,
    }

    //sets default values in handle forms decorators
    this.props.setDefaultValues(data);

    window.onkeydown = this.listenForEnter;
  }

  listenForEnter(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
      this.handleSubmit(e);
    }
  }

  handleSubmit(event, errors, values) {
    event.preventDefault();

    const {name, desc, planId, isDeleted} = values;

    //don't submit if there's errors showing
    if (errors.name || errors.desc || errors.planId) {
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

    //Don't submit if all fields aren't filled out
    if (!name || !desc || !planId ) {
      this.setState({
        formError: "Please fill out all fields",
        shakeBtn: true
      });
      window.setTimeout(() => {
        this.setState({
          shakeBtn: false
        });
      }, 3000);
      return false;
    }

    Meteor.call('Team.update', this.props.team._id, {
      name: name,
      desc: desc,
      planId: planId,
      isDeleted: isDeleted
    }, (error) => {
      if (error) {
        this.setState({
          formError: error.reason,
          shakeBtn: true
        });
        window.setTimeout(() => {
          this.setState({
            shakeBtn: false
          });
        }, 3000);
        return;
      } else {
        this.setState({
          formError: "",
          formSuccess: "Team Successfully Changed!"
        });
        window.setTimeout(() => {
          this.history.pushState(null, `/teams`);
        }, 1000);
      }
    });
  }

  handleSetProfilePic(image) {
    Meteor.call('Team.setProfileImage', this.props.team._id, image);
  }

  handleUpload() {
    this.setState({
      uploadingMsg: "Uploading...",
      showSpinner: true
    });

    const metaContext = {teamId: this.props.team._id}
    const uploader = new Slingshot.Upload("teamImages", metaContext);

    uploader.send(this.refs.editTeamImages.refs.imageUpload.refs.fileInput.files[0], (error, downloadUrl) => {
      if (error) {
        console.error('Error uploading', error);
        this.setState({
          uploadingMsg: "Sorry, there was an error. Please try again later",
          showSpinner: false
        });
      } else {
        Meteor.call('Team.storeProfileImage', this.props.team._id, downloadUrl);
        this.setState({
          uploadingMsg: "Success!",
          showSpinner: false
        });
      }
    });
  }

}
