import {Teams, Plans, Users} from './schemas';

import './schemas/teams.js';
import './schemas/users.js';
import './schemas/plans.js';

import './publications/publications.js';

import './lib/EmailTemplates.js';
import './lib/CreateUser.js';
import './lib/ImageUploadPermissions.js';
import './lib/ImageUploads.js';

Meteor.startup(function () {

  ServiceConfiguration.configurations.upsert(
    { service: "google" },
    {
      $set: {
        clientId: Meteor.settings.googleClientID,
        loginStyle: "popup",
        secret: Meteor.settings.googleSecret
      }
    }
  );
  ServiceConfiguration.configurations.upsert(
    { service: "facebook" },
    {
      $set: {
        appId: Meteor.settings.facebookClientID,
        loginStyle: "popup",
        secret: Meteor.settings.facebookSecret
      }
    }
  );
  ServiceConfiguration.configurations.upsert(
    { service: "twitter" },
    {
      $set: {
        consumerKey: Meteor.settings.twitterClientID,
        loginStyle: "popup",
        secret: Meteor.settings.twitterSecret
      }
    }
  );
});

// smoke test that these are present
Npm.require;
Assets;
require('fs').readFile.call;

console.log('\n\nRunning on server only');
