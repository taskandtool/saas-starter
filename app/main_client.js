import React from 'react';
import {Routes} from './routes';

import './schemas/teams.js';
import './schemas/users.js';
import './schemas/plans.js';
import './schemas/todos.js';

import './lib/ImageUploadPermissions.js';

Meteor.startup(function() {
  Stripe.setPublishableKey(Meteor.settings.testPublishableKey);
});
