import {Users} from '../collections';

// User 'model' namespace
// allows your code to read a bit nicer with a
// few convenience methods and abstracts away the db
// in case we ever switch dbs in the future

/*global User:true */

Meteor.methods({
  storeUserProfileImage: function( url ) {
    check( url, String );

    try {
      Meteor.users.update(Meteor.userId(), {$push: {"profile.images": url}});
      Meteor.users.update(Meteor.userId(), {$set: {"profile.avatar": url }});
    } catch( exception ) {
      return exception;
    }
  }
});
