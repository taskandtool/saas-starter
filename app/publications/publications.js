import {Plans, Users, Teams} from '../schemas';

Meteor.publish('plans', function() {
  return Plans.find();
  //if (isAdmin(this.userId)) {
  //  return Plans.find();
  //} else {
  //  return Plans.find({isDeleted: false});
  //}
});

Meteor.publish('teams', function() {
  return Teams.find();
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

Meteor.publish(null, function (){
  return Meteor.roles.find({})
})
