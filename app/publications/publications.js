import {Plans, Users} from '../collections';

Meteor.publish('plans', function() {
  return Plans.find();
  //if (isAdmin(this.userId)) {
  //  return Plans.find();
  //} else {
  //  return Plans.find({isDeleted: false});
  //}
});

 Meteor.publish('users', function() {
   return Meteor.users.find();
 });

 //Meteor.publish('myTeams', function(user) {
   // return Teams.find({flagged: false, user: user});
 //});
// Meteor.subscribe('myTeams', 'bob-smith');
