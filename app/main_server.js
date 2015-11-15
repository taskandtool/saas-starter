import {Teams, Plans, Users, Todos} from './schemas';

import './schemas/teams.js';
import './schemas/users.js';
import './schemas/plans.js';
import './schemas/todos.js';

import './publications/publications.js';

import './lib/EmailTemplates.js';
import './lib/CreateUser.js';
import './lib/ImageUploadPermissions.js';
import './lib/ImageUploads.js';

//Create fixtures on first time app is launched
import {createUsers} from './fixtures.js';
if (!Users.find().fetch().length) {
  createUsers();
}

Meteor.startup(function () {
  //Setup stripe keys
  var stripeKey = Meteor.settings.public.testPublishableKey;
  //Stripe.setPublishableKey( stripeKey );
  //sets up keys for social logins
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
